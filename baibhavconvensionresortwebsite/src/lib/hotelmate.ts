import { RoomCategory, GalleryImage } from '@/types';
import { SITE } from '@/data/site';

export const HOTELMATE_BASE = 'https://api.thehotelmate.co/api/thm';
export const HOTELMATE_PROPERTY_ID = 3483;

interface HotelmateImage {
  url: string;
}

interface HotelmateFacility {
  name: string;
}

interface HotelmateRoom {
  id: number;
  name: string;
  description: string;
  roomOnlyPrice: number | null;
  minimumOccupancy: number | null;
  maximumOccupancy: number | null;
  noOfRooms: number | null;
  imageList: HotelmateImage[];
  roomFacilities: HotelmateFacility[];
}

interface HotelmateAvailabilityResponse {
  id: number;
  name: string;
  roomList: HotelmateRoom[];
}

const fmtDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const mapApiRoom = (room: HotelmateRoom): RoomCategory | null => {
  const images = (room.imageList ?? [])
    .map((img) => img.url)
    .filter(Boolean)
    .map<GalleryImage>((src, i) => ({
      id: `${room.id}-img-${i}`,
      src,
      alt: room.name,
      span: i === 0 ? 'main' : 'default',
    }));

  if (images.length === 0) return null;

  const name = room.name || 'Room';
  const overview = stripHtml(room.description || '');
  const min = room.minimumOccupancy ?? 2;
  const max = room.maximumOccupancy ?? min;
  const amenities = (room.roomFacilities ?? []).map((f) => f.name).filter(Boolean);
  const price = Number(room.roomOnlyPrice) || 0;

  return {
    id: `room-${room.id}`,
    slug: slugify(name),
    name,
    subtitle: overview.split('.')[0] || 'Comfortable stay',
    overview: overview || 'Comfortable stay with modern conveniences.',
    idealFor: 'Business & leisure travelers',
    beds: max > 2 ? 'Twin / double bed' : 'Double bed',
    size: `${room.noOfRooms ?? 0} rooms`,
    capacity: `${min}\u2013${max} guests`,
    price,
    priceUnit: 'per night',
    amenities: amenities.length > 0 ? amenities : ['Wi-Fi'],
    perks: [],
    image: images[0].src,
    gallery: images,
    ctaLabel: `Book ${name}`,
    ctaHref: SITE.bookingEngine,
  };
};

let cache: RoomCategory[] | null = null;

export const buildAvailabilityUrl = (date: Date = new Date()): string => {
  const to = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    fromDate: fmtDate(date),
    toDate: fmtDate(to),
    noOfRooms: '1',
    noOfPersons: '1',
  });
  return `${HOTELMATE_BASE}/checkAvailability/${HOTELMATE_PROPERTY_ID}?${params.toString()}`;
};

export const fetchRoomsFromApi = async (): Promise<RoomCategory[] | null> => {
  if (cache) return cache;
  try {
    const res = await fetch(buildAvailabilityUrl(), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as HotelmateAvailabilityResponse;
    if (!Array.isArray(data?.roomList) || data.roomList.length === 0) return null;
    const rooms = data.roomList.map(mapApiRoom).filter((r): r is RoomCategory => r !== null);
    if (rooms.length === 0) return null;
    cache = rooms;
    return rooms;
  } catch {
    return null;
  }
};
