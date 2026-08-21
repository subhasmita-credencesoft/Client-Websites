import { RoomCategory } from '@/types';
import { SITE } from './site';

export const ROOMS: RoomCategory[] = [
  {
    id: 'room-8462',
    slug: 'premium-room',
    name: 'Premium Room',
    subtitle: 'Comfortable stay with private bathroom & work desk',
    overview:
      'Premium Room features a private bathroom, TV, work desk, electric kettle, wardrobe, slippers and complimentary toiletries for a comfortable, relaxing stay.',
    idealFor: 'Business & leisure travelers',
    beds: 'kings bed',
    size: '9 rooms',
    capacity: '2 guests',
    price: 2500,
    priceUnit: 'per night',
    amenities: ['Wi-Fi', 'Free Parking', 'Room Service'],
    perks: [],
    image: '/newedit/Luxury room.avif',
    gallery: [
      {
        id: 'premium-1',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062607808-DSC_0088.JPG',
        alt: 'Premium Room main bedroom with double bed at Baibhab Resorts',
        span: 'main',
      },
      {
        id: 'premium-2',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062616242-DSC_0034.JPG',
        alt: 'Premium Room bed with fresh linen at Baibhab Resorts',
      },
      {
        id: 'premium-3',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062623438-DSC_0091.JPG',
        alt: 'Premium Room work desk and TV at Baibhab Resorts',
      },
      {
        id: 'premium-4',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062643221-DSC_0080.JPG',
        alt: 'Premium Room private bathroom at Baibhab Resorts',
      },
      {
        id: 'premium-5',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062650183-DSC_0070.JPG',
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
    subtitle: 'Spacious stay with private bathroom & work desk',
    overview:
      'Deluxe Room offers a spacious, comfortable stay with a private bathroom, TV, work desk, electric kettle, wardrobe and complimentary toiletries.',
    idealFor: 'Business & leisure travelers',
    beds: 'Twin / double bed',
    size: '8 rooms',
    capacity: '2 guests',
    price: 2500,
    priceUnit: 'per night',
    amenities: ['Wi-Fi', 'Free Parking', 'Room Service'],
    perks: [],
    image: '/newedit/Warm Hotel Bedroom with Swan Towel Art.avif',
    gallery: [
      {
        id: 'suite-1',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062459107-DSC_0108.JPG',
        alt: 'Deluxe Room spacious bedroom with double bed at Baibhab Resorts',
        span: 'main',
      },
      {
        id: 'suite-2',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062504123-DSC_0117.JPG',
        alt: 'Deluxe Room bed with swan towel art at Baibhab Resorts',
      },
      {
        id: 'suite-3',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062511816-DSC_9995.JPG',
        alt: 'Deluxe Room work desk and seating at Baibhab Resorts',
      },
      {
        id: 'suite-4',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062516743-DSC_9980.JPG',
        alt: 'Deluxe Room private bathroom at Baibhab Resorts',
      },
      {
        id: 'suite-5',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062525662-DSC_9984.JPG',
        alt: 'Deluxe Room wardrobe and amenities at Baibhab Resorts',
      },
      {
        id: 'suite-6',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062546906-DSC_0119.JPG',
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
