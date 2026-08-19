import type { Room } from '@/types';

const BOOKING_URL = 'https://bookone.io/Hotel-K2?bookingEngine=true';

export const ROOMS: Room[] = [
  {
    slug: 'standard-room',
    name: 'Standard Room',
    summary: 'Standard room means accommodation with basic amenities such as proper lighting, toilet with running water, ventilation and door locking system.',
    description: 'Standard room means accommodation with basic amenities such as proper lighting, toilet with running water, ventilation and door locking system.',
    occupancy: '2–4 Guests',
    image: 'https://bookonelocal.in/cdn/2023-08-29-102212548-gallery_7_1707169027.png',
    gallery: [
      'https://bookonelocal.in/cdn/2023-08-29-102212548-gallery_7_1707169027.png',
      'https://bookonelocal.in/cdn/2023-08-29-102217355-gallery_7_552185080.png',
      'https://bookonelocal.in/cdn/2023-08-29-102222235-gallery_4_2724246198.png',
      'https://bookonelocal.in/cdn/2023-08-29-102226727-gallery_7_1367733729.png',
      'https://bookonelocal.in/cdn/2023-08-29-102237749-gallery_7_636002057.png',
    ],
    amenities: [
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103047106-ac.png', label: 'Air-Condition' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103115784-wifi.png', label: 'Wifi' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103307110-roomservice.png', label: 'Room Service' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103449340-handsanitizer.png', label: 'Hand Sanitizer' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103611168-flattv.png', label: 'Flat TV' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103813263-24hrsservice.png', label: '24 Hours Room Service' },
      { icon: 'https://bookonelocal.in/cdn/2021-11-27-045437766-3260813.png', label: 'Geyser' },
    ],
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 2972,
    price: 1000,
    currency: 'INR',
    availableRooms: 3,
    ratePlanCode: 'SR-1',
  },
  {
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    summary: 'Deluxe rooms are modern decorated, can accommodate up to 2 persons, totally soundproofed and equipped with high tech comforts such as high speed internet access, USB ports, smart TV, room cleaning touch system.',
    description: 'Deluxe rooms are modern decorated, can accommodate up to 2 persons, totally soundproofed and equipped with high tech comforts such as high speed internet access, USB ports, smart TV, room cleaning touch system.',
    occupancy: '2–4 Guests',
    image: 'https://bookonelocal.in/cdn/2023-08-29-102348369-gallery_13_709575560.png',
    gallery: [
      'https://bookonelocal.in/cdn/2023-08-29-102348369-gallery_13_709575560.png',
      'https://bookonelocal.in/cdn/2023-08-29-102351913-gallery_13_2769008168.png',
      'https://bookonelocal.in/cdn/2023-08-29-102355686-gallery_14_388721208.png',
      'https://bookonelocal.in/cdn/2023-08-29-102359194-gallery_14_1202825415.png',
      'https://bookonelocal.in/cdn/2023-08-29-102403761-gallery_7_371560241.png',
    ],
    amenities: [
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103047106-ac.png', label: 'Air-Condition' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103115784-wifi.png', label: 'Wifi' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103307110-roomservice.png', label: 'Room Service' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103449340-handsanitizer.png', label: 'Hand Sanitizer' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103611168-flattv.png', label: 'Flat TV' },
      { icon: 'https://bookonelocal.in/cdn/2021-06-22-103813263-24hrsservice.png', label: '24 Hours Room Service' },
      { icon: 'https://bookonelocal.in/cdn/2021-11-27-045437766-3260813.png', label: 'Geyser' },
    ],
    bookingUrl: BOOKING_URL,
    hasDetailPage: true,
    apiRoomId: 2973,
    price: 1500,
    currency: 'INR',
    availableRooms: 5,
    ratePlanCode: 'DR-1',
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}

export function getRoomByApiId(apiRoomId: number): Room | undefined {
  return ROOMS.find((room) => room.apiRoomId === apiRoomId);
}
