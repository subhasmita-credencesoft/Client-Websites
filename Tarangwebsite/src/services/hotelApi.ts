import { Room, AmenityItem } from '@/types';
import { ApiRoom, HotelApiResponse, AvailabilityQueryParams } from '@/types/hotelApi';

// Configuration from Environment Variables with resilient defaults
export const HOTEL_API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_HOTEL_API_BASE_URL ||
    'https://api.thehotelmate.co/api/thm/checkAvailability',
  propertyId: process.env.NEXT_PUBLIC_HOTEL_PROPERTY_ID || '2668',
  bookingEngineUrl:
    process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL ||
    'https://bookone.io/Tarangan-Resort?bookingEngine=True',
};

// Date utilities for dynamic checking
export function getTodayDateString(): string {
  const now = new Date();
  return formatDateToYYYYMMDD(now);
}

export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateToYYYYMMDD(tomorrow);
}

export function formatDateToYYYYMMDD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Convert room names to URL slugs
export function slugifyRoomName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper to strip HTML tags for clean short descriptions
export function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .trim();
}

// Map facility names to UI icons
function mapFacilityToIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('wifi') || lower.includes('internet')) return 'Wifi';
  if (lower.includes('tv') || lower.includes('television')) return 'Tv';
  if (lower.includes('geyser') || lower.includes('hot water')) return 'ShowerHead';
  if (lower.includes('service') || lower.includes('dine')) return 'Coffee';
  if (lower.includes('sanitizer') || lower.includes('safe') || lower.includes('security')) return 'ShieldCheck';
  if (lower.includes('pool') || lower.includes('swim')) return 'Waves';
  if (lower.includes('air') || lower.includes('ac')) return 'Wind';
  if (lower.includes('park')) return 'Car';
  return 'Sparkles';
}

// Infer category from room name
function inferCategory(name: string): 'Cottage' | 'Deluxe' | 'Suite' | 'Family' | 'Pod' | string {
  const lower = name.toLowerCase();
  if (lower.includes('suite')) return 'Suite';
  if (lower.includes('pod')) return 'Pod';
  if (lower.includes('four bed') || lower.includes('family') || lower.includes('vista four')) return 'Family';
  if (lower.includes('mud') || lower.includes('cottage')) return 'Cottage';
  return 'Deluxe';
}

// Infer bed type from room name and occupancy
function inferBedType(name: string, maxOccupancy: number): string {
  const lower = name.toLowerCase();
  if (lower.includes('four beds') || lower.includes('4 bed')) {
    return '4 Premium Individual / Double Beds';
  }
  if (lower.includes('suite')) {
    return '1 King Size Bed + Living Lounge Sofa Bed';
  }
  if (lower.includes('pod')) {
    return '1 Queen Size Bed';
  }
  if (maxOccupancy >= 4) {
    return '2 King Size Beds';
  }
  return '1 King Size Bed + Extra Mattress on request';
}

// Helper to format and safely encode image URLs from CDN
export function formatImageUrl(url?: string | null): string {
  if (!url) return '/images/facilities/pool-day.jpg';
  const trimmed = url.trim();
  if (!trimmed) return '/images/facilities/pool-day.jpg';
  try {
    return encodeURI(decodeURI(trimmed));
  } catch {
    return trimmed;
  }
}

// Transform raw API room into typed frontend Room
export function transformApiRoomToRoom(apiRoom: ApiRoom): Room {
  const slug = slugifyRoomName(apiRoom.name);
  const plainDesc = stripHtml(apiRoom.description);
  const rateDto = apiRoom.ratesAndAvailabilityDtos?.[0];
  const price = apiRoom.roomOnlyPrice || rateDto?.price || 4000;
  const originalPrice = Math.round(price * 1.18);

  // Extract images and safely encode special characters/spaces
  const images = (apiRoom.imageList || [])
    .map((img) => formatImageUrl(img.url))
    .filter((url): url is string => Boolean(url && url.length > 5));

  // High quality fallback image if empty
  const finalImages = images.length > 0 ? images : ['/images/facilities/pool-day.jpg'];

  // Map facilities to amenities
  const amenities: AmenityItem[] = (apiRoom.roomFacilities || []).map((fac) => ({
    icon: mapFacilityToIcon(fac.name),
    label: fac.name,
    imageUrl: fac.imageUrl ? formatImageUrl(fac.imageUrl) : undefined,
    description: fac.description,
  }));

  // Ensure baseline amenities
  if (!amenities.some((a) => a.icon === 'Wifi')) {
    amenities.unshift({ icon: 'Wifi', label: 'Free High-Speed Wi-Fi' });
  }

  const category = inferCategory(apiRoom.name);
  const bedType = inferBedType(apiRoom.name, apiRoom.maximumOccupancy);

  // Dynamic subtitle & features
  const features = (apiRoom.roomFacilities || []).map((f) => f.name);
  if (features.length === 0) {
    features.push('Air Conditioning', 'Private Bathroom', 'High-Speed Wi-Fi', 'Room Service');
  }

  return {
    id: apiRoom.id.toString(),
    slug: slug,
    title: apiRoom.name,
    subtitle: `${category} style accommodation with ${amenities.slice(0, 3).map((a) => a.label).join(', ')}`,
    category,
    price,
    originalPrice,
    rating: 4.8,
    reviewsCount: 45 + (apiRoom.id % 30),
    sizeSqFt: apiRoom.maximumOccupancy >= 5 ? 460 : apiRoom.maximumOccupancy >= 4 ? 400 : 320,
    maxGuests: apiRoom.maximumOccupancy || 3,
    minGuests: apiRoom.minimumOccupancy || 1,
    maxAdults: Math.max(1, (apiRoom.maximumOccupancy || 3) - (apiRoom.noOfChild || 0)),
    maxChildren: apiRoom.noOfChild || 1,
    bedType,
    view: 'Garden & Nature Surroundings',
    shortDescription: plainDesc || 'Spacious and comfortable stay experience with modern amenities.',
    fullDescription: apiRoom.description || `<p>${plainDesc}</p>`,
    images: finalImages,
    features,
    amenities,
    isFeatured: true,
    inventoryCount: apiRoom.noOfRooms || 2,
    noOfAvailable: rateDto?.noOfAvailable ?? apiRoom.noOfRooms,
    ratePlans: rateDto?.roomRatePlans || [],
    rawApiData: apiRoom,
  };
}

// Fetch raw API response
export async function fetchRawAvailability(
  params?: AvailabilityQueryParams
): Promise<HotelApiResponse | null> {
  const propertyId = params?.propertyId || HOTEL_API_CONFIG.propertyId;
  const fromDate = params?.fromDate || getTodayDateString();
  const toDate = params?.toDate || getTomorrowDateString();
  const noOfRooms = params?.noOfRooms || 1;
  const noOfPersons = params?.noOfPersons || 1;

  const url = `${HOTEL_API_CONFIG.baseUrl}/${propertyId}?fromDate=${encodeURIComponent(
    fromDate
  )}&toDate=${encodeURIComponent(toDate)}&noOfRooms=${noOfRooms}&noOfPersons=${noOfPersons}`;

  try {
    const isClient = typeof window !== 'undefined';
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      ...(isClient ? { cache: 'no-store' } : {}),
    };

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      console.warn(`Hotel API returned status ${res.status} for ${url}`);
      return null;
    }

    const data: HotelApiResponse = await res.json();
    return data;
  } catch (err) {
    console.warn(`Failed to fetch from Hotel API (${url}):`, err);
    return null;
  }
}

// Main fetch function returning normalized Room[]
export async function fetchAvailableRooms(
  params?: AvailabilityQueryParams
): Promise<Room[]> {
  try {
    const data = await fetchRawAvailability(params);
    if (data && Array.isArray(data.roomList) && data.roomList.length > 0) {
      return data.roomList.map(transformApiRoomToRoom);
    }
  } catch (err) {
    console.warn('Error in fetchAvailableRooms:', err);
  }

  return [];
}

// Dynamic Booking Engine URL generator with dates and guest params
export function generateBookingEngineUrl(options?: {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  roomId?: string;
}): string {
  const baseUrl = HOTEL_API_CONFIG.bookingEngineUrl;
  const url = new URL(baseUrl);
  if (options?.checkIn) url.searchParams.set('checkIn', options.checkIn);
  if (options?.checkOut) url.searchParams.set('checkOut', options.checkOut);
  if (options?.adults) url.searchParams.set('adults', options.adults.toString());
  if (options?.children) url.searchParams.set('children', options.children.toString());
  if (options?.roomId) url.searchParams.set('room', options.roomId);
  return url.toString();
}
