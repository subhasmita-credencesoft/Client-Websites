export interface GalleryImage {
  id: string;
  title: string;
  category: 'Rooms' | 'Pool' | 'Dining' | 'Resort Grounds' | 'Nearby';
  src: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export const GALLERY_DATA: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Twilight Aerial View of Swimming Pool & Cottages',
    category: 'Pool',
    src: '/images/hero/hero-drone-night.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'Drone Aerial Sunset View of Tarangan Resort Nagaon',
    category: 'Resort Grounds',
    src: '/images/facilities/drone-sunset-aerial.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-3',
    title: 'Crystal Clear Azure Swimming Pool & Sun Pergola',
    category: 'Pool',
    src: '/images/facilities/pool-day.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-4',
    title: 'Deluxe AC Cottage "हेमंत" Bedroom with King Bed',
    category: 'Rooms',
    src: '/images/rooms/deluxe-ac-cottage-1.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-5',
    title: 'Authentic Surmai Rava Fry with Fresh Coconut Chutney',
    category: 'Dining',
    src: '/images/dining/surmai-rava-fry.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-6',
    title: 'Deluxe Pool View Cottage Porch & Traditional Swing (झोपाळा)',
    category: 'Rooms',
    src: '/images/rooms/deluxe-pool-view-1.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-7',
    title: 'Fresh Pomfret (Paplet) Masala Fry Platter',
    category: 'Dining',
    src: '/images/dining/pomfret-fry-plate.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-8',
    title: 'Manicured Lawn with Lotus Pond & Water Feature',
    category: 'Resort Grounds',
    src: '/images/facilities/lawn-lotus-pond.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-9',
    title: 'Grand Konkani Fish Thali with Solkadhi & Rice',
    category: 'Dining',
    src: '/images/dining/konkani-fish-thali.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-10',
    title: 'Executive Family Suite with Dual King Bed Comfort',
    category: 'Rooms',
    src: '/images/rooms/executive-family-1.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-11',
    title: 'Authentic Maharashtrian Veg Thali with Hot Bhakris',
    category: 'Dining',
    src: '/images/dining/veg-thali.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-12',
    title: 'Tarangan Resort Front Reception & Welcoming Facade',
    category: 'Resort Grounds',
    src: '/images/facilities/reception-front.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-13',
    title: 'Swimming Pool with Water Fountain & Fairy Lights',
    category: 'Pool',
    src: '/images/facilities/pool-pergola.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-14',
    title: 'Deluxe Cottage Attached Washroom with Bajaj Geyser',
    category: 'Rooms',
    src: '/images/rooms/deluxe-ac-cottage-bath.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-15',
    title: 'Heritage Warrior Garden Sculpture on Central Lawn',
    category: 'Resort Grounds',
    src: '/images/facilities/lawn-statue-warrior.jpg',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-16',
    title: 'Premium Garden Cottage "शिशिर" Interior Bedding',
    category: 'Rooms',
    src: '/images/rooms/premium-garden-1.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-17',
    title: 'Traditional Wooden Swing on Veranda ("झोपाळा")',
    category: 'Resort Grounds',
    src: '/images/hero/hero-cottage-row.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-18',
    title: 'Embroidered Tarangan Resort Luxury Towels',
    category: 'Rooms',
    src: '/images/rooms/cottage-towels.jpg',
    aspectRatio: 'landscape',
  },
];
