import { GalleryItem } from '@/types';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-rooms-1',
    src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Premium Room',
    category: 'Rooms',
  },
  {
    id: 'gal-rooms-2',
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Suite Room',
    category: 'Rooms',
  },
  {
    id: 'gal-rooms-3',
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Suite Room',
    category: 'Rooms',
  },
  {
    id: 'gal-weddings-1',
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Grand reception setup at Royal Imperial Hall',
    category: 'Weddings',
  },
  {
    id: 'gal-weddings-2',
    src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Outdoor wedding arch on the lawn',
    category: 'Weddings',
  },
  {
    id: 'gal-weddings-3',
    src: '/images/baibhabgate.avif',
    alt: 'Baibhab Conventions & Resorts entrance gate',
    category: 'Weddings',
  },
  {
    id: 'gal-corporate-1',
    src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Corporate conference in progress',
    category: 'Corporate',
  },
  {
    id: 'gal-corporate-2',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Boardroom meeting session',
    category: 'Corporate',
  },
  {
    id: 'gal-corporate-3',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Keynote presentation stage',
    category: 'Corporate',
  },
  {
    id: 'gal-dining-1',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'In-house multi-cuisine restaurant',
    category: 'Dining',
  },
  {
    id: 'gal-dining-2',
    src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Traditional Odia thali spread',
    category: 'Dining',
  },
  {
    id: 'gal-dining-3',
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Banquet buffet counters',
    category: 'Dining',
  },
  {
    id: 'gal-lawns-1',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Open-air lawn decorated for an evening event',
    category: 'Lawns',
  },
  {
    id: 'gal-lawns-2',
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Lawn celebration under the sky',
    category: 'Lawns',
  },
  {
    id: 'gal-lawns-3',
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Pool and leisure lawn',
    category: 'Lawns',
  },
];

export const GALLERY_FILTERS = ['All', 'Rooms', 'Weddings', 'Corporate', 'Dining', 'Lawns'] as const;
