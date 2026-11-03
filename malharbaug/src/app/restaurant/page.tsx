import type { Metadata } from 'next';
import { RestaurantView } from '@/features/dining';

export const metadata: Metadata = {
  title: 'Restaurant & Konkan Dining | Malhar Baug Resort Alibaug',
  description:
    'Savour authentic Konkan cuisine at Malhar Baug Resort, Alibaug — fresh surmai fry, pomfret thali, prawn masala, vegetarian thali and multi-cuisine meals served daily. Garden dining just 2 km from Nagaon Beach.',
  alternates: { canonical: '/restaurant/' },
  keywords: [
    'Konkan food Alibaug',
    'restaurant near Nagaon Beach',
    'fish thali Alibaug resort',
    'seafood restaurant Alibaug',
    'pomfret thali Nagaon',
    'Malhar Baug dining',
    'surmai fry Alibaug',
    'veg thali resort Alibaug',
  ],
  openGraph: {
    title: 'Restaurant & Konkan Dining | Malhar Baug Resort Alibaug',
    description:
      'Fresh surmai, pomfret thali, prawn masala and authentic Konkan meals at Malhar Baug Resort garden restaurant, Alibaug.',
    images: [{ url: '/dininghero.jpeg', width: 1200, height: 630, alt: 'Authentic Konkan dining at Malhar Baug Resort Alibaug' }],
  },
};

export default function RestaurantPage() {
  return <RestaurantView />;
}
