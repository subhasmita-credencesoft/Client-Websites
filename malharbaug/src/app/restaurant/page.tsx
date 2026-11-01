import type { Metadata } from 'next';
import { RestaurantView } from '@/features/dining';

export const metadata: Metadata = {
  title: 'Restaurant & Dining | Malhar Baug Resort Alibaug',
  description:
    'Savour authentic Konkan and multi-cuisine dining at the garden restaurant of Malhar Baug Resort, Alibaug — Nagaon Beach. Breakfast, lunch and dinner served daily.',
  alternates: { canonical: '/restaurant/' },
};

export default function RestaurantPage() {
  return <RestaurantView />;
}
