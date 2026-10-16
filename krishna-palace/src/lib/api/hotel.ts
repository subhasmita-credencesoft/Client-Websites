import { isRoomId } from '@/lib/format';
import type { Availability, PropertyInfo, RatePlan, RoomDetail, RoomOffer } from '@/types/hotel';

const AVAILABILITY_URL = 'https://api.thehotelmate.co/api/thm/checkAvailability/3625';

type Raw = Record<string, unknown>;

const asRaw = (value: unknown): Raw => (value && typeof value === 'object' ? (value as Raw) : {});
const asList = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const text = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value.trim() : fallback);

function idText(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
}

function toNumber(value: unknown): number | null {
  const n = typeof value === 'string' ? Number.parseFloat(value) : typeof value === 'number' ? value : NaN;
  return Number.isFinite(n) ? n : null;
}

const pad = (n: number) => String(n).padStart(2, '0');

function isoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function stripHtml(value: unknown): string {
  const raw = text(value);
  if (!raw) return '';
  const withoutTags = raw
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (typeof DOMParser === 'undefined') return withoutTags;
  return new DOMParser().parseFromString(withoutTags, 'text/html').body.textContent?.trim() ?? withoutTags;
}

function availabilityUrl(from: Date, to: Date, rooms = 1, persons = 1): string {
  const params = new URLSearchParams({
    fromDate: isoDate(from),
    toDate: isoDate(to),
    noOfRooms: String(rooms),
    noOfPersons: String(persons),
  });
  return `${AVAILABILITY_URL}?${params.toString()}`;
}

async function loadProperty(signal?: AbortSignal): Promise<{ raw: Raw; gstPercent: number }> {
  const from = new Date();
  const to = new Date(from.getTime() + 24 * 60 * 60 * 1000);

  const response = await fetch(availabilityUrl(from, to), {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Availability request failed: ${response.status}`);

  const raw = asRaw(await response.json());
  const taxes = asList(raw.taxDetails) as Raw[];
  const gst = taxes.find((entry) => /gst/i.test(text(entry.name)));
  const gstPercent = toNumber(gst?.percentage) ?? 5;
  return { raw, gstPercent };
}

export function selectPrimaryPlan(plans: RatePlan[]): RatePlan | undefined {
  if (!plans.length) return undefined;

  // 1. Single Occupancy With Breakfast Plan (handling API typo 'Ocuupancy')
  const singleBreakfast = plans.find(
    (p) => /single\s*o.*cupancy\s*with\s*breakfast/i.test(p.name) && p.amount !== null,
  );
  if (singleBreakfast) return singleBreakfast;

  // 2. Any Single Occupancy plan
  const singlePlan = plans.find((p) => /single/i.test(p.name) && p.amount !== null);
  if (singlePlan) return singlePlan;

  // 3. Any Breakfast plan
  const breakfastPlan = plans.find((p) => /breakfast/i.test(p.name) && p.amount !== null);
  if (breakfastPlan) return breakfastPlan;

  // 4. Lowest priced plan
  const validPlans = plans.filter((p) => p.amount !== null && Number.isFinite(p.amount));
  if (validPlans.length) {
    return validPlans.reduce((lowest, current) =>
      current.amount! < lowest.amount! ? current : lowest,
    );
  }

  return plans[0];
}

function mapPlans(availability: Raw | null): RatePlan[] {
  if (!availability || !Array.isArray(availability.roomRatePlans)) return [];
  const rawPlans = (availability.roomRatePlans as Raw[])
    .filter((plan) => plan.active !== false)
    .map((plan) => ({
      code: text(plan.code),
      name: text(plan.name, 'Rate plan'),
      amount: toNumber(plan.amount),
      minimumOccupancy: toNumber(plan.minimumOccupancy),
      maximumOccupancy: toNumber(plan.maximumOccupancy),
      effectiveDate: text(plan.effectiveDate) || null,
      expiryDate: text(plan.expiryDate) || null,
      extraChargePerPerson: toNumber(plan.extraChargePerPerson),
      extraChargePerChild: toNumber(plan.extraChargePerChild),
      minimumStay: toNumber(plan.minimumLengthOfStay),
      maximumStay: toNumber(plan.maximumLengthOfStay),
    }));

  const primary = selectPrimaryPlan(rawPlans);
  if (!primary) return rawPlans;

  // Place primary plan (Single Occupancy With Breakfast Plan) first, then sort remaining plans by amount
  return [
    primary,
    ...rawPlans
      .filter((p) => p.code !== primary.code)
      .sort((a, b) => (a.amount ?? 0) - (b.amount ?? 0)),
  ];
}

function firstAvailability(room: Raw): Raw | null {
  const list = asList(room.ratesAndAvailabilityDtos) as Raw[];
  return list[0] ?? null;
}

function imageUrls(value: unknown): string[] {
  return (asList(value) as Raw[])
    .map((entry) => text(entry.url))
    .filter((url) => /^https?:\/\//i.test(url) || url.startsWith('/'));
}

function mapRoom(room: Raw, gstPercent: number, index: number): RoomDetail {
  const availability = firstAvailability(room);
  const images = imageUrls(room.imageList);
  const plans = mapPlans(availability);
  const primaryPlan = plans[0];

  // Published tariff: derive from Single Occupancy With Breakfast Plan / primary plan rate
  const price =
    primaryPlan?.amount ??
    toNumber(availability?.price) ??
    toNumber(room.roomOnlyPrice);

  return {
    id: idText(room.id, String(index)),
    name: text(room.name, 'Room'),
    description: stripHtml(room.description),
    images,
    image: images[0] ?? null,
    price,
    rateDetail: `+ ${gstPercent}% GST · per night`,
    gstPercent,
    available: toNumber(availability?.noOfAvailable),
    totalRooms: toNumber(availability?.totalNoRooms),
    inventory: toNumber(room.noOfRooms),
    minOccupancy: toNumber(room.minimumOccupancy),
    maxOccupancy: toNumber(room.maximumOccupancy),
    minimumStay: toNumber(room.minimumLengthOfStay),
    maximumStay: toNumber(room.maximumLengthOfStay),
    size: typeof room.size === 'string' && room.size.trim() ? room.size.trim() : null,
    plans,
  };
}

function mapProperty(raw: Raw): PropertyInfo {
  const address = asRaw(raw.address);
  const city = text(address.city) || text(address.suburb);
  const line = [text(address.streetName), city, text(address.state), text(address.postcode)]
    .filter(Boolean)
    .join(', ');

  const amenities = (asList(raw.propertyServicesList) as Raw[])
    .filter((entry) => entry.id !== null && entry.id !== undefined && text(entry.name))
    .map((entry) => text(entry.name));

  return {
    name: text(raw.name, 'Hotel Krishna Palace'),
    email: text(raw.email) || text(raw.managerEmailAddress),
    mobile: text(raw.mobile) || text(raw.managerContactNo),
    whatsapp: text(raw.whatsApp),
    gstNumber: text(raw.gstNumber),
    currency: text(raw.localCurrency, 'INR'),
    city,
    address: line,
    description: stripHtml(raw.businessDescription),
    amenities,
  };
}

function toOffer(room: RoomDetail): RoomOffer {
  return {
    id: room.id,
    name: room.name,
    description: room.description,
    image: room.image,
    images: room.images,
    price: room.price,
    rateDetail: room.rateDetail,
    available: room.available,
    totalRooms: room.totalRooms,
    maxOccupancy: room.maxOccupancy,
    plans: room.plans,
  };
}

export async function fetchAvailability(signal?: AbortSignal): Promise<Availability> {
  const { raw, gstPercent } = await loadProperty(signal);
  const rawRooms = asList(raw.roomList) as Raw[];
  const rooms = rawRooms.map((room, index) => mapRoom(room, gstPercent, index));
  if (!rooms.length) throw new Error('Availability response contained no rooms');
  return { rooms: rooms.map(toOffer), gstPercent, property: mapProperty(raw) };
}

export async function fetchRoom(id: string, signal?: AbortSignal): Promise<{ room: RoomDetail; property: PropertyInfo } | null> {
  const { raw, gstPercent } = await loadProperty(signal);
  const rawRooms = asList(raw.roomList) as Raw[];
  const index = rawRooms.findIndex((room) => idText(room.id, '') === id);
  if (index < 0) return null;
  return { room: mapRoom(rawRooms[index], gstPercent, index), property: mapProperty(raw) };
}

export async function fetchRoomIds(signal?: AbortSignal): Promise<string[]> {
  try {
    const { raw } = await loadProperty(signal);
    return (asList(raw.roomList) as Raw[])
      .map((room) => idText(room.id, ''))
      .filter(isRoomId);
  } catch {
    return [];
  }
}
