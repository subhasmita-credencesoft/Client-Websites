import type { NearbyPlace } from '@/types';

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    name: 'Hirni Fall',
    distance: '',
    category: 'nature',
    image: '/nearbyimage/hirnifall.png',
    featured: true,
    description: 'A breathtaking cascade hidden in the lush forests of Jharkhand. Hotels near Hirni Water Falls — stay at Hotel K2, Chakradharpur.',
  },
  {
    name: 'Secret Water Fall',
    distance: '',
    category: 'nature',
    image: '/nearbyimage/secretwaterfall.png',
    featured: true,
    description: 'An untouched gem surrounded by pristine wilderness. Explore from Hotel K2, the best hotel in Chakradharpur.',
  },
  {
    name: 'Railway Station',
    distance: '0.5 km',
    category: 'transport',
    image: '/nearbyimage/railwaystation.png',
    description: 'Chakradharpur Railway Station — just a short walk from Hotel K2. Best hotel near Chakradharpur Railway Station.',
  },
  {
    name: 'Ranchi Airport',
    distance: '110 km',
    category: 'transport',
    image: '/nearbyimage/ranchiairport.png',
    description: 'Ranchi Airport — well connected to major cities. Hotel K2 is the best place to stay in Chakradharpur.',
  },
  {
    name: 'Mahadevsal Temple',
    distance: '',
    category: 'landmark',
    image: '/nearbyimage/mahadevsal.png',
    description: 'Ancient temple with spiritual significance. Hotels near temples in Chakradharpur — Hotel K2.',
  },
  {
    name: 'Kera Mandir',
    distance: '',
    category: 'landmark',
    image: '/nearbyimage/keratemple.png',
    description: 'A serene place of worship. Hotel near Kera Mandir, Chakradharpur — Hotel K2.',
  },
  {
    name: 'Nakti Dam',
    distance: '',
    category: 'nature',
    image: '/nearbyimage/naktidam.png',
    description: 'Scenic reservoir surrounded by hills. Explore Nakti Dam from Hotel K2, the best hotel in Chakradharpur.',
  },
  {
    name: 'DRM Office',
    distance: '0.6 km',
    category: 'landmark',
    image: '/nearbyimage/drmoffice.png',
    description: 'Important administrative landmark near Hotel K2. Hotel near DRM Office, Chakradharpur.',
  },
  {
    name: 'Etwari Bazar',
    distance: '',
    category: 'market',
    image: '/nearbyimage/itwariimage.png',
    description: 'Vibrant local market for shopping. Hotel in Etwari Bazar, Chakradharpur — Hotel K2.',
  },
  {
    name: 'Wine Shop',
    distance: '',
    category: 'market',
    image: '/nearbyimage/wineshop.png',
    description: 'Premium selections available nearby. Hotel near Etwari Bazar market — Hotel K2.',
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  transport: 'Getting Here',
  landmark: 'Heritage & Culture',
  nature: 'Natural Wonders',
  market: 'Local Markets',
};
