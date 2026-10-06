import { Room } from '@/types';
import { siteConfig } from '@/lib/site';

const API_BASE = 'https://api.thehotelmate.co/api/thm';
const PROPERTY_ID = 2970;
const FETCH_TIMEOUT_MS = 20000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 400;

export class PropertyApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PropertyApiError';
  }
}

export interface ApiImage {
  id?: number | string | null;
  name?: string | null;
  url: string;
  description?: string | null;
  mainImage?: boolean;
}

export interface ApiFacility {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  logoUrl?: string | null;
}

export interface ApiAvailability {
  id?: number;
  date?: string;
  price?: number | string | null;
  noOfAvailable?: number | null;
}

export interface ApiRoom {
  id: number;
  name: string;
  description?: string | null;
  roomOnlyPrice?: number | string | null;
  minimumOccupancy?: number | string | null;
  maximumOccupancy?: number | string | null;
  imageList?: ApiImage[] | null;
  roomFacilities?: ApiFacility[] | null;
  ratesAndAvailabilityDtos?: ApiAvailability[] | null;
}

export interface ApiAddress {
  country?: string | null;
  postcode?: string | null;
  streetNumber?: string | null;
  streetName?: string | null;
  suburb?: string | null;
  city?: string | null;
  state?: string | null;
  locality?: string | null;
}

export interface ApiService {
  id?: number | string | null;
  name?: string | null;
}

export interface ApiProperty {
  id: number;
  name: string;
  email?: string | null;
  mobile?: string | null;
  whatsApp?: string | null;
  managerContactNo?: string | null;
  managerEmailAddress?: string | null;
  address?: ApiAddress | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  imageList?: ApiImage[] | null;
  roomList?: ApiRoom[] | null;
  propertyServicesList?: ApiService[] | null;
  minimumRoooPrice?: number | string | null;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  addressLines: string[];
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  mapEmbedUrl: string;
}

/**
 * Old marketing URLs that must keep resolving after the site switched to live
 * API room data. legacy slug -> live slug.
 */
export const LEGACY_ROOM_SLUGS: Record<string, string> = {
  'luxury-deluxe': 'super-deluxe-room',
  'family-suite': '2-bedroom-hall-villa',
  'private-villa': '4-bedroom-hall-villa',
};

const inrFormatter = new Intl.NumberFormat('en-IN');

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isoDate(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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

/** Single cached fetch of the live property + room payload for this build. */
export function getProperty(): Promise<ApiProperty> {
  if (!propertyPromise) {
    const url = availabilityUrl(isoDate(0), isoDate(1));
    propertyPromise = fetchJson<ApiProperty>(url).catch((error: unknown) => {
      propertyPromise = null;
      throw error;
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

function toNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function encodeUrl(url: string): string {
  return /\s/.test(url) ? encodeURI(url) : url;
}

function normalizeImages(list: ApiImage[] | null | undefined): string[] {
  if (!list || list.length === 0) return [];
  const urls = list.map((image) => (image?.url || '').trim()).filter(Boolean);
  const main = list.find((image) => image?.mainImage && (image.url || '').trim());
  const ordered = main ? [main.url.trim(), ...urls.filter((url) => url !== main.url.trim())] : urls;
  return Array.from(new Set(ordered.map(encodeUrl)));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
      price: priceValue !== null ? `₹${inrFormatter.format(priceValue)}/night` : 'Price on request',
      priceValue: priceValue ?? undefined,
      capacity: maxOccupancy > 0 ? `${maxOccupancy} Guests` : 'Enquire for capacity',
      image: roomImages[0],
      images: roomImages,
      amenities: finalAmenities,
      available: rates.length > 0 ? rates.some((entry) => (toNumber(entry.noOfAvailable) ?? 0) > 0) : true,
    };
  });
}

function formatPhone(raw: string): { e164: string; display: string } {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return { e164: `+${digits}`, display: `+91 ${digits.slice(2, 7)} ${digits.slice(7)}` };
  }
  if (digits.length === 10) {
    return { e164: `+91${digits}`, display: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` };
  }
  if (digits.length > 0) {
    return { e164: raw.startsWith('+') ? raw : `+${digits}`, display: raw };
  }
  return { e164: '', display: '' };
}

function mapContact(property: ApiProperty): ContactInfo {
  const address = property.address ?? {};
  const phone = formatPhone(property.mobile || property.managerContactNo || '');
  const whatsapp = formatPhone(property.whatsApp || property.mobile || property.managerContactNo || '');

  const streetAddress = [address.streetNumber, address.streetName].filter(Boolean).join(', ');
  const locality = address.suburb || address.city || address.locality || '';
  const region = address.state || '';
  const postalCode = address.postcode || '';
  const country = address.country || 'India';

  const addressLines = [
    streetAddress,
    [locality, region, postalCode, country].filter(Boolean).join(', '),
  ].filter(Boolean);

  const latitude = toNumber(property.latitude) ?? 0;
  const longitude = toNumber(property.longitude) ?? 0;

  const mapEmbedUrl =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(`${property.name} ${country}`)}&z=15&output=embed`;

  return {
    phone: phone.e164,
    phoneDisplay: phone.display,
    whatsapp: whatsapp.e164.replace(/^\+/, ''),
    whatsappDisplay: whatsapp.display,
    email: property.email || property.managerEmailAddress || '',
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
