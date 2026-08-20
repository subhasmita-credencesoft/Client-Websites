import type { NearbyPlace } from '@/types';

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    name: 'Hirni Fall',
    distance: '',
    category: 'nature',
    image: '/nearbyimage/hirnifall.png',
    featured: true,
    description: 'A breathtaking cascade hidden in the lush forests of Jharkhand.',
  },
  {
    name: 'Secret Water Fall',
    distance: '',
    category: 'nature',
    image: '/nearbyimage/secretwaterfall.png',
    featured: true,
    description: 'An untouched gem surrounded by pristine wilderness.',
  },
  {
    name: 'Railway Station',
    distance: '0.5 km',
    category: 'transport',
    image: '/nearbyimage/railwaystation.png',
    description: 'Just a short walk from the hotel.',
  },
  {
    name: 'Ranchi Airport',
    distance: '110 km',
    category: 'transport',
    image: '/nearbyimage/ranchiairport.png',
    description: 'Well connected to major cities.',
  },
  {
    name: 'Mahadevsal Temple',
    distance: '',
    category: 'landmark',
    image: '/nearbyimage/mahadevsal.png',
    description: 'Ancient temple with spiritual significance.',
  },
  {
    name: 'Kera Mandir',
    distance: '',
    category: 'landmark',
    image: '/nearbyimage/keratemple.png',
    description: 'A serene place of worship.',
  },
  {
    name: 'Nakti Dam',
    distance: '',
    category: 'nature',
    image: '/nearbyimage/naktidam.png',
    description: 'Scenic reservoir surrounded by hills.',
  },
  {
    name: 'DRM Office',
    distance: '0.6 km',
    category: 'landmark',
    image: '/nearbyimage/drmoffice.png',
    description: 'Important administrative landmark.',
  },
  {
    name: 'Etwari Bazar',
    distance: '',
    category: 'market',
    image: '/nearbyimage/itwariimage.png',
    description: 'Vibrant local market for shopping.',
  },
  {
    name: 'Wine Shop',
    distance: '',
    category: 'market',
    image: '/nearbyimage/wineshop.png',
    description: 'Premium selections available nearby.',
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  transport: 'Getting Here',
  landmark: 'Heritage & Culture',
  nature: 'Natural Wonders',
  market: 'Local Markets',
};
