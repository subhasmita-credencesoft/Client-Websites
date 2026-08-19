import type { NearbyPlace } from '@/types';

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    name: 'Hirni Fall',
    distance: '',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop',
    featured: true,
    description: 'A breathtaking cascade hidden in the lush forests of Jharkhand.',
  },
  {
    name: 'Secret Water Fall',
    distance: '',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1546882588-d9bd63f85a7e?w=800&h=600&fit=crop',
    featured: true,
    description: 'An untouched gem surrounded by pristine wilderness.',
  },
  {
    name: 'Railway Station',
    distance: '0.5 km',
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&h=400&fit=crop',
    description: 'Just a short walk from the hotel.',
  },
  {
    name: 'Ranchi Airport',
    distance: '110 km',
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&h=400&fit=crop',
    description: 'Well connected to major cities.',
  },
  {
    name: 'Mahadevsal Temple',
    distance: '',
    category: 'landmark',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
    description: 'Ancient temple with spiritual significance.',
  },
  {
    name: 'Kera Mandir',
    distance: '',
    category: 'landmark',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop',
    description: 'A serene place of worship.',
  },
  {
    name: 'Nakti Dam',
    distance: '',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&h=400&fit=crop',
    description: 'Scenic reservoir surrounded by hills.',
  },
  {
    name: 'DRM Office',
    distance: '0.6 km',
    category: 'landmark',
    image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=400&fit=crop',
    description: 'Important administrative landmark.',
  },
  {
    name: 'Etwari Bazar',
    distance: '',
    category: 'market',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    description: 'Vibrant local market for shopping.',
  },
  {
    name: 'Wine Shop',
    distance: '',
    category: 'market',
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=600&h=400&fit=crop',
    description: 'Premium selections available nearby.',
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  transport: 'Getting Here',
  landmark: 'Heritage & Culture',
  nature: 'Natural Wonders',
  market: 'Local Markets',
};
