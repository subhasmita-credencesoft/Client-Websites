import type { Metadata } from 'next';
import AmenitiesListView from '@/features/amenities/AmenitiesListView';

export const metadata: Metadata = {
  title: 'Resort Amenities',
  description:
    'Explore amenities at Malhar Baug Resort, Alibaug — swimming pool, garden lawns, indoor & outdoor games, rain dance, BBQ area, free WiFi, parking and 24-hour room service.',
  alternates: { canonical: '/amenities/' },
};

export default function AmenitiesPage() {
  return <AmenitiesListView />;
}
