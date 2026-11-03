import type { Metadata } from 'next';
import AmenitiesListView from '@/features/amenities/AmenitiesListView';

export const metadata: Metadata = {
  title: 'Resort Amenities & Facilities | Malhar Baug Resort Alibaug',
  description:
    'Explore world-class amenities at Malhar Baug Resort, Alibaug — swimming pool, garden lawns, indoor & outdoor games, rain dance, BBQ area, free WiFi, parking and 24-hour room service. Just 2 km from Nagaon Beach.',
  alternates: { canonical: '/amenities/' },
  openGraph: {
    title: 'Resort Amenities & Facilities | Malhar Baug Resort Alibaug',
    description:
      'Swimming pool, lawns, rain dance, BBQ, WiFi and more — all included with your stay at Malhar Baug Resort, Nagaon, Alibaug.',
    images: [{ url: '/swimmingpool.jpeg', width: 1200, height: 630, alt: 'Swimming pool at Malhar Baug Resort Alibaug' }],
  },
};

export default function AmenitiesPage() {
  return <AmenitiesListView />;
}
