import type { Room, RoomAmenity } from '@/types';

const BOOKING_URL = 'https://bookone.io/Hotel-K2-Chakradharpur?bookingEngine=true';
const CDN = 'https://bookonelocal.in/cdn';

const AMENITIES: RoomAmenity[] = [
  { icon: `${CDN}/2021-06-22-103047106-ac.png`, label: 'Air-Condition' },
  { icon: `${CDN}/2021-06-22-103115784-wifi.png`, label: 'Wifi' },
  { icon: `${CDN}/2021-06-22-103307110-roomservice.png`, label: 'Room Service' },
  { icon: `${CDN}/2021-06-22-103611168-flattv.png`, label: 'Flat TV' },
  { icon: `${CDN}/2021-06-22-103813263-24hrsservice.png`, label: '24 Hours Room Service' },
  { icon: `${CDN}/2021-11-27-045437766-3260813.png`, label: 'Geyser' },
];

/**
 * Static room catalogue, mirrored from the live availability API
 * (https://api.thehotelmate.co/api/thm/checkAvailability/3626).
 *
 * Slugs are the slugified API room names so `useRoom(slug)` matches the rooms
 * returned by `fetchRooms()` — this keeps the exported room pages, the homepage
 * grid, and the sitemap in sync with live inventory.
 */
export const ROOMS: Room[] = [
  {
    slug: 'four-bed-suite-room',
    name: 'Four Bed Suite Room',
    summary: 'Spacious suite with four comfortable beds, ideal for families or groups.',
    description:
      'Spacious suite with four comfortable beds, ideal for families or groups, offering a relaxing stay with ample space.',
    occupancy: '2–4 Guests',
    image: `${CDN}/2026-08-29-054939153-4a.jpg`,
    gallery: [
      `${CDN}/2026-08-29-054939153-4a.jpg`,
      `${CDN}/2026-08-29-054947144-4c.jpg`,
    ],
    amenities: AMENITIES,
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 8847,
    price: 2150,
    currency: 'INR',
    availableRooms: 2,
  },
  {
    slug: 'double-bed-standard-room',
    name: 'Double Bed Standard Room',
    summary: 'Comfortable room with a double bed, suitable for couples or two guests.',
    description:
      'Comfortable room with a double bed, suitable for couples or two guests, offering essential facilities for a pleasant stay.',
    occupancy: '2–4 Guests',
    image: `${CDN}/2026-08-29-053059366-b1.jpg`,
    gallery: [
      `${CDN}/2026-08-29-053059366-b1.jpg`,
      `${CDN}/2026-08-29-053106077-b2.jpg`,
    ],
    amenities: AMENITIES,
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 8848,
    price: 999,
    currency: 'INR',
    availableRooms: 2,
  },
  {
    slug: 'double-bed-classic-room',
    name: 'Double Bed Classic Room',
    summary: 'Cozy classic room with a comfortable double bed, designed for couples.',
    description:
      'Cozy classic room with a comfortable double bed, designed for couples seeking a simple, relaxing, and convenient stay.',
    occupancy: '2–4 Guests',
    image: `${CDN}/2026-08-29-053026515-a1.jpg`,
    gallery: [
      `${CDN}/2026-08-29-053026515-a1.jpg`,
      `${CDN}/2026-08-29-053034344-a2.jpg`,
    ],
    amenities: AMENITIES,
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 8849,
    price: 1260,
    currency: 'INR',
    availableRooms: 5,
  },
  {
    slug: 'double-bed-premium-room',
    name: 'Double Bed Premium Room',
    summary: 'Spacious premium room with a double bed and modern facilities.',
    description:
      'Spacious premium room with a comfortable double bed, offering a pleasant stay with modern facilities and extra comfort.',
    occupancy: '2–4 Guests',
    image: `${CDN}/2026-08-29-052912835-dbp1.jpg`,
    gallery: [
      `${CDN}/2026-08-29-052912835-dbp1.jpg`,
      `${CDN}/2026-08-29-052919707-sdp3.jpg`,
      `${CDN}/2026-08-29-052928172-sdp2.jpg`,
    ],
    amenities: AMENITIES,
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 8850,
    price: 1650,
    currency: 'INR',
    availableRooms: 6,
  },
  {
    slug: 'single-bed-premium-room',
    name: 'Single Bed Premium Room',
    summary: 'Comfortable premium room with a single bed, ideal for solo travelers.',
    description:
      'Comfortable premium room with a single bed, ideal for solo travelers seeking privacy, convenience, and a relaxing stay.',
    occupancy: '2–4 Guests',
    image: `${CDN}/2026-08-29-055002514-cc3.jpg`,
    gallery: [
      `${CDN}/2026-08-29-055002514-cc3.jpg`,
      `${CDN}/2026-08-29-055017395-c1.jpg`,
      `${CDN}/2026-08-29-055025185-cc1.jpg`,
    ],
    amenities: AMENITIES,
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 8851,
    price: 1199,
    currency: 'INR',
    availableRooms: 1,
  },
  {
    slug: 'triple-bed-premium-room',
    name: 'Triple Bed Premium Room',
    summary: 'Spacious premium room with three beds, suitable for families or groups.',
    description:
      'Spacious premium room with three comfortable beds, suitable for families or groups seeking convenience, comfort, and a pleasant stay.',
    occupancy: '2–4 Guests',
    image: `${CDN}/2026-08-29-052712583-tp3.jpg`,
    gallery: [
      `${CDN}/2026-08-29-052712583-tp3.jpg`,
      `${CDN}/2026-08-29-052719850-tp1.jpg`,
      `${CDN}/2026-08-29-052732403-tp2.jpg`,
    ],
    amenities: AMENITIES,
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 8852,
    price: 2150,
    currency: 'INR',
    availableRooms: 1,
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}

export function getRoomByApiId(apiRoomId: number): Room | undefined {
  return ROOMS.find((room) => room.apiRoomId === apiRoomId);
}
