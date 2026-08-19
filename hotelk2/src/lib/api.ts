import type { ApiPropertyResponse, ApiRoom } from '@/types/api';
import type { Room, RoomAmenity } from '@/types';

const API_BASE = 'https://api.thehotelmate.co/api/thm/checkAvailability';
const PROPERTY_ID = 1297;
const BOOKING_URL = 'https://bookone.io/Hotel-K2?bookingEngine=true';

export interface AvailabilityParams {
  fromDate?: string;
  toDate?: string;
  noOfRooms?: number;
  noOfPersons?: number;
}

function buildQueryString(params: AvailabilityParams): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const fromDate = params.fromDate ?? today.toISOString().split('T')[0]!;
  const toDate = params.toDate ?? tomorrow.toISOString().split('T')[0]!;
  const noOfRooms = params.noOfRooms ?? 1;
  const noOfPersons = params.noOfPersons ?? 1;

  return `fromDate=${fromDate}&toDate=${toDate}&noOfRooms=${noOfRooms}&noOfPersons=${noOfPersons}`;
}

export async function fetchProperty(params: AvailabilityParams = {}): Promise<ApiPropertyResponse> {
  const query = buildQueryString(params);
  const res = await fetch(`${API_BASE}/${PROPERTY_ID}?${query}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<ApiPropertyResponse>;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapRoom(apiRoom: ApiRoom): Room {
  const availability = apiRoom.ratesAndAvailabilityDtos?.[0];
  const price = apiRoom.roomOnlyPrice ?? availability?.roomRatePlans?.[0]?.amount ?? 0;
  const available = availability?.noOfAvailable ?? apiRoom.noOfRooms;
  const ratePlanCode = availability?.roomRatePlans?.[0]?.code;

  const amenities: RoomAmenity[] = apiRoom.roomFacilities.map((f) => ({
    icon: f.logoUrl,
    label: f.name,
  }));

  return {
    slug: slugify(apiRoom.name),
    name: apiRoom.name,
    summary: stripHtml(apiRoom.description).slice(0, 150),
    description: stripHtml(apiRoom.description),
    occupancy: `${apiRoom.minimumOccupancy}–${apiRoom.maximumOccupancy} Guests`,
    price,
    currency: 'INR',
    availableRooms: available,
    image: apiRoom.imageList?.[0]?.url ?? '',
    gallery: apiRoom.imageList.map((img) => img.url),
    amenities,
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: apiRoom.id,
    ratePlanCode,
  };
}

export async function fetchRooms(params: AvailabilityParams = {}): Promise<Room[]> {
  const property = await fetchProperty(params);
  return property.roomList.map(mapRoom);
}

export async function fetchRoomByApiId(
  apiRoomId: number,
  params: AvailabilityParams = {},
): Promise<Room | undefined> {
  const rooms = await fetchRooms(params);
  return rooms.find((r) => r.apiRoomId === apiRoomId);
}

export async function fetchPropertyForSEO() {
  const property = await fetchProperty();
  return {
    name: property.name,
    description: property.businessDescription,
    image: property.imageList?.[0]?.url,
    latitude: property.latitude,
    longitude: property.longitude,
    address: property.address,
  };
}
