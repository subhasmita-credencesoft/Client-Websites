import { RoomCategory } from '@/types';
import { SITE } from './site';

export const ROOMS: RoomCategory[] = [
  {
    id: 'room-8462',
    slug: 'premium-room',
    name: 'Premium Room',
    subtitle: 'Comfortable stay with private bathroom & work desk',
    overview:
      'Premium Room features a private bathroom, TV, work desk, electric kettle, wardrobe, slippers, and complimentary toiletries, offering a comfortable and relaxing stay.',
    idealFor: 'Business & leisure travelers',
    beds: 'Twin / double bed',
    size: '17 rooms',
    capacity: '2\u20134 guests',
    price: 2500,
    priceUnit: 'per night',
    amenities: ['Wi-Fi', 'Free Parking', 'Room Service'],
    perks: [],
    image: '/newedit/Luxury room.avif',
    gallery: [
      {
        id: 'premium-1',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062607808-DSC_0088.JPG',
        alt: 'Premium Room',
        span: 'main',
      },
      {
        id: 'premium-2',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062616242-DSC_0034.JPG',
        alt: 'Premium Room',
      },
      {
        id: 'premium-3',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062623438-DSC_0091.JPG',
        alt: 'Premium Room',
      },
      {
        id: 'premium-4',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062643221-DSC_0080.JPG',
        alt: 'Premium Room',
      },
      {
        id: 'premium-5',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062650183-DSC_0070.JPG',
        alt: 'Premium Room',
      },
    ],
    ctaLabel: 'Book Premium Room',
    ctaHref: SITE.bookingEngine,
  },
  {
    id: 'room-8463',
    slug: 'suite-room',
    name: 'Suite Room',
    subtitle: 'Spacious stay with private bathroom & work desk',
    overview:
      'Suite Room offers a spacious and comfortable stay with a private bathroom, TV, work desk, electric kettle, wardrobe, slippers, and complimentary toiletries.',
    idealFor: 'Business & leisure travelers',
    beds: 'Twin / double bed',
    size: '8 rooms',
    capacity: '2\u20134 guests',
    price: 2500,
    priceUnit: 'per night',
    amenities: ['Wi-Fi', 'Free Parking', 'Room Service'],
    perks: [],
    image: '/newedit/Warm Hotel Bedroom with Swan Towel Art.avif',
    gallery: [
      {
        id: 'suite-1',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062459107-DSC_0108.JPG',
        alt: 'Suite Room',
        span: 'main',
      },
      {
        id: 'suite-2',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062504123-DSC_0117.JPG',
        alt: 'Suite Room',
      },
      {
        id: 'suite-3',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062511816-DSC_9995.JPG',
        alt: 'Suite Room',
      },
      {
        id: 'suite-4',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062516743-DSC_9980.JPG',
        alt: 'Suite Room',
      },
      {
        id: 'suite-5',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062525662-DSC_9984.JPG',
        alt: 'Suite Room',
      },
      {
        id: 'suite-6',
        src: 'https://bookonelocal.in/cdn/2026-02-09-062546906-DSC_0119.JPG',
        alt: 'Suite Room',
      },
    ],
    ctaLabel: 'Book Suite Room',
    ctaHref: SITE.bookingEngine,
  },
];

export const getRoomBySlug = (slug: string): RoomCategory | undefined =>
  ROOMS.find((room) => room.slug === slug);

export const getRoomPreviews = (): RoomCategory[] => ROOMS;
