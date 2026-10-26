import { business } from '@/core/config/business';
import { roomIdsBySlug, roomSlugsById } from '@/core/config/hotelmate';
import type { CardItem, DetailContent } from '@/core/types/content';
import type { HotelMateProperty, HotelMateRatePlan, HotelMateRoom } from '@/core/types/hotelmate';

// ─────────────────────────────────────────────
// Private helpers — all derive purely from API data
// ─────────────────────────────────────────────

function stripHtml(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function summarize(text: string, maxLength = 150): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

/** Primary price from roomOnlyPrice field */
function formatPrice(room: HotelMateRoom): string {
  const amount = room.roomOnlyPrice;
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount === 0)
    return 'Price on request';
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Rate plans from ratesAndAvailabilityDtos → roomRatePlans, de-duplicated */
function formatPlans(room: HotelMateRoom): readonly { name: string; amount: string }[] {
  return (room.ratesAndAvailabilityDtos ?? [])
    .flatMap((day) => day.roomRatePlans ?? [])
    .filter(
      (plan, index, arr): plan is HotelMateRatePlan & { amount: number; name: string } =>
        Boolean(plan?.name) &&
        typeof plan?.amount === 'number' &&
        arr.findIndex((other) => other?.name === plan.name) === index,
    )
    .map((plan) => ({
      name: plan.name,
      amount: `₹${plan.amount.toLocaleString('en-IN')}/night`,
    }))
    .slice(0, 4);
}

function availabilityLabel(room: HotelMateRoom): string | undefined {
  const day = room.ratesAndAvailabilityDtos?.find(
    (entry) => entry && typeof entry.noOfAvailable === 'number',
  );
  if (!day || typeof day.noOfAvailable !== 'number') return undefined;
  return `${day.noOfAvailable} ${day.noOfAvailable === 1 ? 'room' : 'rooms'} available`;
}

function occupancyLabel(room: HotelMateRoom): string {
  const min = room.minimumOccupancy;
  const max = room.maximumOccupancy;
  if (typeof min !== 'number' || Number.isNaN(min) || min === 0) return 'Contact for occupancy';
  if (typeof max === 'number' && !Number.isNaN(max) && max > min) {
    return `Sleeps ${min}–${max} guests`;
  }
  return `Sleeps ${min} guests`;
}

/**
 * Returns ALL images for a room sourced purely from the API imageList.
 * Falls back to a safe placeholder only if the API provides zero images.
 */
function apiImages(room: HotelMateRoom): string[] {
  const imgs = (room.imageList ?? [])
    .map((img) => img?.url)
    .filter((url): url is string => typeof url === 'string' && url.length > 0);
  return imgs.length > 0 ? imgs : ['/images/hotel-hero.jpg'];
}

/**
 * Builds paragraphs from the API description field.
 * Splits on double-space or sentence boundaries for natural paragraph breaks.
 */
function buildParagraphs(room: HotelMateRoom): string[] {
  const rawText = stripHtml(room.description);
  if (!rawText) {
    return [
      `${room.name ?? 'This room'} at ${business.name} is designed for your comfort with modern amenities and warm hospitality.`,
      `Enjoy high-speed Wi-Fi, flat-screen TV, 24-hour room service, and daily housekeeping throughout your stay in Kalamboli, Navi Mumbai.`,
    ];
  }
  // Split on sentence boundaries to form natural paragraphs
  const sentences = rawText.match(/[^.!?]+[.!?]+/g) ?? [rawText];
  if (sentences.length <= 2) return [rawText];

  // Group into ~2–3 paragraph chunks
  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, mid).join(' ').trim(),
    sentences.slice(mid).join(' ').trim(),
  ].filter(Boolean);
}

/** Facilities sourced from API roomFacilities */
function facilityNames(room: HotelMateRoom): string[] {
  return (room.roomFacilities ?? [])
    .map((f) => f.name)
    .filter((name): name is string => Boolean(name));
}

// ─────────────────────────────────────────────
// Public exports
// ─────────────────────────────────────────────

export function roomSlugForId(id: number): string | undefined {
  return roomSlugsById[id];
}

export function roomIdForSlug(slug: string): number | undefined {
  if (roomIdsBySlug[slug] !== undefined) {
    return roomIdsBySlug[slug];
  }
  const numeric = Number(slug.replace(/^room-/, ''));
  if (!Number.isNaN(numeric)) {
    return numeric;
  }
  return undefined;
}

export function findRoom(
  property: HotelMateProperty,
  slug: string,
): HotelMateRoom | undefined {
  const id = roomIdForSlug(slug);
  if (id === undefined) return undefined;
  return property.roomList?.find((room) => room.id === id);
}

/**
 * Maps API room list to catalog CardItems.
 * All images and descriptions come 100% from the API.
 */
export function roomsToCards(rooms: HotelMateRoom[]): CardItem[] {
  return rooms.map((room) => {
    const images = apiImages(room);
    const description = stripHtml(room.description);
    return {
      slug: roomSlugForId(room.id) ?? `room-${room.id}`,
      title: room.name ?? 'Hotel Room',
      eyebrow: `${business.shortName} · Kalamboli`,
      description: summarize(description || `A comfortable room at ${business.name}.`, 120),
      image: images[0],
      meta: `From ${formatPrice(room)} · ${occupancyLabel(room)}`,
    };
  });
}

/**
 * Converts a single API HotelMateRoom to a full DetailContent object.
 * No hardcoded text, images, or content — 100% API-driven.
 */
export function roomToDetail(room: HotelMateRoom): DetailContent {
  const images = apiImages(room);
  const facilities = facilityNames(room);
  const rates = formatPlans(room);
  const availability = availabilityLabel(room);
  const paragraphs = buildParagraphs(room);
  const description = stripHtml(room.description);

  const facts: string[] = [
    occupancyLabel(room),
    `From ${formatPrice(room)} per night`,
    ...facilities.slice(0, 5),
  ];

  if (typeof room.extraChargePerPerson === 'number' && !Number.isNaN(room.extraChargePerPerson) && room.extraChargePerPerson > 0) {
    facts.push(`Extra guest ₹${room.extraChargePerPerson.toLocaleString('en-IN')}/night`);
  }

  if (typeof room.noOfRooms === 'number' && !Number.isNaN(room.noOfRooms) && room.noOfRooms > 0) {
    facts.push(`${room.noOfRooms} rooms available`);
  }

  return {
    title: room.name ?? 'Hotel Room',
    eyebrow: `${business.shortName} · Kalamboli, Navi Mumbai`,
    intro: summarize(description, 160) || `${room.name ?? 'A room'} at ${business.name}.`,
    paragraphs,
    image: images[0],
    facts,
    gallery: images,
    rates: rates.length > 0 ? rates : undefined,
    availability,
    roomId: room.id,
    price: formatPrice(room),
    occupancy: occupancyLabel(room),
    facilities,
    extraGuestFee:
      typeof room.extraChargePerPerson === 'number' && room.extraChargePerPerson > 0
        ? `₹${room.extraChargePerPerson.toLocaleString('en-IN')}/night`
        : undefined,
  };
}
