import type { Room, ApiProperty, ApiImage, ContactInfo } from '@/types';
import { siteConfig } from '@/config/site';
import { formatPriceINR, formatPhone, slugify, stripHtml, encodeUrl, isoDate, sleep, toNumber } from '@/utils';
import { fallbackProperty } from './fallback-data';

export type {
  ContactInfo,
  ApiProperty,
  ApiImage,
  ApiFacility,
  ApiAvailability,
  ApiRoom,
  ApiAddress,
  ApiService,
  Room,
} from '@/types';

const API_BASE = 'https://api.thehotelmate.co/api/thm';
const PROPERTY_ID = 2970;
const FETCH_TIMEOUT_MS = process.env.NODE_ENV === 'development' ? 1200 : 2000;
const MAX_ATTEMPTS = 1;
const RETRY_DELAY_MS = 100;

export class PropertyApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PropertyApiError';
  }
}

/**
 * Old marketing URLs that must keep resolving after the site switched to live
 * API room data: legacy slug -> live slug.
 */
export const LEGACY_ROOM_SLUGS: Record<string, string> = {
  'luxury-deluxe': 'super-deluxe-room',
  'family-suite': '2-bedroom-hall-villa',
  'private-villa': '4-bedroom-hall-villa',
};

export function availabilityUrl(fromDate: string, toDate: string, noOfRooms = 1, noOfPersons = 1): string {
  const params = new URLSearchParams({
    fromDate,
    toDate,
    noOfRooms: String(noOfRooms),
    noOfPersons: String(noOfPersons),
  });
  return `${API_BASE}/checkAvailability/${PROPERTY_ID}?${params.toString()}`;
}

async function fetchJson<T>(url: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    } finally {
      clearTimeout(timer);
    }
  }

  const reason = lastError instanceof Error ? lastError.message : String(lastError);
  throw new PropertyApiError(`Unable to reach the booking API (${MAX_ATTEMPTS} attempts): ${reason}`);
}

let propertyPromise: Promise<ApiProperty> | null = null;

/**
 * Single cached fetch of the live property + room payload.
 * In production or CI, if the remote API fails or times out, it gracefully
 * falls back to the static fallback snapshot so the build never breaks.
 */
export function getProperty(): Promise<ApiProperty> {
  if (!propertyPromise) {
    const url = availabilityUrl(isoDate(0), isoDate(1));
    propertyPromise = fetchJson<ApiProperty>(url).catch((error: unknown) => {
      console.warn(
        `[PropertyService] Remote API fetch failed: ${error instanceof Error ? error.message : String(error)}. Using fallback snapshot.`
      );
      return fallbackProperty;
    });
  }
  return propertyPromise;
}

let contactPromise: Promise<ContactInfo> | null = null;

export function getContact(): Promise<ContactInfo> {
  if (!contactPromise) {
    contactPromise = getProperty()
      .then(mapContact)
      .catch((error: unknown) => {
        contactPromise = null;
        throw error;
      });
  }
  return contactPromise;
}

let roomsPromise: Promise<Room[]> | null = null;

export function getRooms(): Promise<Room[]> {
  if (!roomsPromise) {
    roomsPromise = getProperty()
      .then(mapRooms)
      .catch((error: unknown) => {
        roomsPromise = null;
        throw error;
      });
  }
  return roomsPromise;
}

export function resolveRoom(rooms: Room[], slug: string): Room | undefined {
  const direct = rooms.find((room) => room.slug === slug);
  if (direct) return direct;
  const canonicalSlug = LEGACY_ROOM_SLUGS[slug];
  return canonicalSlug ? rooms.find((room) => room.slug === canonicalSlug) : undefined;
}

export async function findRoom(slug: string): Promise<Room | undefined> {
  return resolveRoom(await getRooms(), slug);
}

export async function roomSlugs(): Promise<string[]> {
  const rooms = await getRooms();
  return rooms.map((room) => room.slug);
}

export async function legacyRoomSlugs(): Promise<string[]> {
  const rooms = await getRooms();
  const live = new Set(rooms.map((room) => room.slug));
  return Object.entries(LEGACY_ROOM_SLUGS)
    .filter(([, canonical]) => live.has(canonical))
    .map(([legacy]) => legacy);
}

function normalizeImages(list: ApiImage[] | null | undefined): string[] {
  if (!list || list.length === 0) return [];
  const urls = list.map((image) => (image?.url || '').trim()).filter(Boolean);
  const main = list.find((image) => image?.mainImage && (image.url || '').trim());
  const ordered = main ? [main.url.trim(), ...urls.filter((url) => url !== main.url.trim())] : urls;
  return Array.from(new Set(ordered.map(encodeUrl)));
}

function roomTypeLabel(name: string): string {
  if (/villa/i.test(name)) return 'Villa';
  if (/suite/i.test(name)) return 'Suite';
  return 'Room';
}

function buildDescription(name: string, amenities: string[]): string {
  if (amenities.length === 0) {
    return `${name} at ${siteConfig.name} — enquire with our team for full details, rates and availability.`;
  }
  const list = amenities.slice(0, 4).join(', ');
  return `${name} at ${siteConfig.name} comes with ${list}. Contact our team for rates and availability.`;
}

function mapRooms(property: ApiProperty): Room[] {
  const roomList = property.roomList ?? [];
  if (roomList.length === 0) {
    throw new PropertyApiError(`Booking API returned no rooms for property ${property.id}.`);
  }

  const propertyImages = normalizeImages(property.imageList);
  const propertyAmenities = (property.propertyServicesList ?? [])
    .filter((service) => service && service.id !== null && service.id !== undefined && String(service.id).trim() !== '')
    .map((service) => stripHtml(service.name || ''))
    .filter(Boolean);

  const seen = new Set<string>();

  return roomList.map((apiRoom) => {
    const name = (apiRoom.name || '').trim() || `Room ${apiRoom.id}`;
    const slugCandidate = slugify(name) || `room-${apiRoom.id}`;
    const slug = seen.has(slugCandidate) ? `${slugCandidate}-${apiRoom.id}` : slugCandidate;
    seen.add(slug);

    const images = normalizeImages(apiRoom.imageList);
    const roomImages =
      images.length > 0
        ? images
        : propertyImages.length > 0
          ? [...propertyImages]
          : ['/heroimg1.jpeg'];

    const amenities = (apiRoom.roomFacilities ?? [])
      .map((facility) => stripHtml(facility?.name || ''))
      .filter(Boolean);
    const finalAmenities = amenities.length > 0 ? amenities : propertyAmenities;

    const maxOccupancy = toNumber(apiRoom.maximumOccupancy) ?? 0;
    const rates = apiRoom.ratesAndAvailabilityDtos ?? [];
    const rate = rates.length > 0 ? toNumber(rates[0].price) : null;
    const priceValue = rate ?? toNumber(apiRoom.roomOnlyPrice);

    const description = stripHtml(apiRoom.description || '') || buildDescription(name, finalAmenities);

    return {
      id: String(apiRoom.id),
      title: name,
      slug,
      tagline: maxOccupancy > 0 ? `Sleeps up to ${maxOccupancy} guests` : roomTypeLabel(name),
      description,
      price: priceValue !== null ? `₹${formatPriceINR(priceValue)}/night` : 'Price on request',
      priceValue: priceValue ?? undefined,
      capacity: maxOccupancy > 0 ? `${maxOccupancy} Guests` : 'Enquire for capacity',
      image: roomImages[0],
      images: roomImages,
      amenities: finalAmenities,
      available: rates.length > 0 ? rates.some((entry) => (toNumber(entry.noOfAvailable) ?? 0) > 0) : true,
    };
  });
}

const OFFICIAL_CONTACT_PHONE = '+919320062613';
const OFFICIAL_CONTACT_PHONE2 = '+919987283577';
const OFFICIAL_CONTACT_WHATSAPP = '919320062613';
const OFFICIAL_CONTACT_EMAIL = 'malharvillaresort90@gmail.com';

function mapContact(property: ApiProperty): ContactInfo {
  const address = property.address ?? {};
  // Always enforce verified official contact number and email for Malhar Baug Resort
  const phone = formatPhone(OFFICIAL_CONTACT_PHONE);
  const whatsapp = formatPhone(OFFICIAL_CONTACT_WHATSAPP);

  const streetAddress = [address.streetNumber, address.streetName].filter(Boolean).join(', ') || 'H.No. 3116, Palhe, Nagaon';
  const locality = address.suburb || address.city || address.locality || 'Alibaug';
  const region = address.state || 'Maharashtra';
  const postalCode = address.postcode || '402204';
  const country = address.country || 'India';

  const addressLines = [
    streetAddress,
    [locality, region, postalCode, country].filter(Boolean).join(', '),
  ].filter(Boolean);

  const latitude = toNumber(property.latitude) || 18.6019;
  const longitude = toNumber(property.longitude) || 72.9056;

  const mapEmbedUrl =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(`${property.name || 'Malhar Baug Resort'} ${country}`)}&z=15&output=embed`;

  const phone2 = formatPhone(OFFICIAL_CONTACT_PHONE2);

  return {
    phone: phone.e164,
    phoneDisplay: phone.display,
    phone2: phone2.e164,
    phone2Display: phone2.display,
    whatsapp: whatsapp.e164.replace(/^\+/, ''),
    whatsappDisplay: whatsapp.display,
    email: OFFICIAL_CONTACT_EMAIL,
    addressLines,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: locality,
      addressRegion: region,
      postalCode,
      addressCountry: country.toLowerCase() === 'india' ? 'IN' : country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    mapEmbedUrl,
  };
}
