import { RoomCategory } from '@/types';
import { SITE } from './site';

export const ROOMS: RoomCategory[] = [
  {
    id: 'room-8462',
    slug: 'premium-room',
    name: 'Premium Room',
    subtitle: 'Premium Room features a private bathroom, TV, work desk, electric kettle, wardrobe, and complimentary toiletries, offering a comfortable and relaxing stay',
    overview:
      'Premium Room features a private bathroom, TV, work desk, electric kettle, wardrobe and complimentary toiletries for a comfortable, relaxing stay.',
    idealFor: 'Business & leisure travelers',
    beds: 'King Size Bed',
    size: '11 rooms',
    capacity: '2 guests',
    price: 1905,
    priceUnit: 'per night',
    amenities: ['Wi-Fi', 'Free Parking', 'Room Service'],
    perks: [],
    image: 'https://bookonelocal.in/cdn/2026-08-14-111850905-Luxury room.jpg',
    gallery: [
      {
        id: 'premium-1',
        src: 'https://bookonelocal.in/cdn/2026-08-14-111850905-Luxury room.jpg',
        alt: 'Premium Room main bedroom with double bed at Baibhab Resorts',
        span: 'main',
      },
      {
        id: 'premium-2',
        src: 'https://bookonelocal.in/cdn/2026-08-14-111850905-Luxury room.jpg',
        alt: 'Premium Room bed with fresh linen at Baibhab Resorts',
      },
      {
        id: 'premium-3',
        src: '/premiumroom.png',
        alt: 'Premium Room work desk and TV at Baibhab Resorts',
      },
      {
        id: 'premium-4',
        src: '/premiumroom1.png',
        alt: 'Premium Room private bathroom at Baibhab Resorts',
      },
      {
        id: 'premium-5',
        src: 'https://bookonelocal.in/cdn/2026-08-14-111850905-Luxury room.jpg',
        alt: 'Premium Room living area at Baibhab Resorts',
      },
    ],
    ctaLabel: 'Book Premium Room',
    ctaHref: SITE.bookingEngine,
  },
  {
    id: 'room-8463',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    subtitle: 'Deluxe Room offers a spacious and comfortable stay with a private bathroom, TV, work desk, electric kettle, wardrobe and complimentary toiletries',
    overview:
      'Deluxe Room offers a spacious, comfortable stay with a private bathroom, TV, work desk, electric kettle, wardrobe and complimentary toiletries.',
    idealFor: 'Business & leisure travelers',
    beds: ' Double Bed',
    size: '13 rooms',
    capacity: '2 guests',
    price: 1805,
    priceUnit: 'per night',
    amenities: ['Wi-Fi', 'Free Parking', 'Room Service'],
    perks: [],
    image: '/deluxeroom.png',
    gallery: [
      {
        id: 'suite-1',
        src: 'https://bookonelocal.in/cdn/2026-08-14-101445196-deluxeroom.jpg',
        alt: 'Deluxe Room spacious bedroom with double bed at Baibhab Resorts',
        span: 'main',
      },
      {
        id: 'suite-2',
        src: '/deluxeroom.png',
        alt: 'Deluxe Room bed with swan towel art at Baibhab Resorts',
      },
      {
        id: 'suite-3',
        src: '/deluxeroom3.png',
        alt: 'Deluxe Room work desk and seating at Baibhab Resorts',
      },
      {
        id: 'suite-4',
        src: '/deluxeroom2.png',
        alt: 'Deluxe Room private bathroom at Baibhab Resorts',
      },
      {
        id: 'suite-5',
        src: '/deluxeroom.png',
        alt: 'Deluxe Room wardrobe and amenities at Baibhab Resorts',
      },
      {
        id: 'suite-6',
        src: '/deluxeroom2.png',
        alt: 'Deluxe Room lounge corner at Baibhab Resorts',
      },
    ],
    ctaLabel: 'Book Deluxe Room',
    ctaHref: SITE.bookingEngine,
  },
];

export const getRoomBySlug = (slug: string): RoomCategory | undefined =>
  ROOMS.find((room) => room.slug === slug);

export const getRoomPreviews = (): RoomCategory[] => ROOMS;
