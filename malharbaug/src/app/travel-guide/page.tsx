import type { Metadata } from 'next';
import TravelGuideListView from '@/features/travel-guide/TravelGuideListView';

export const metadata: Metadata = {
  title: 'Alibaug Travel Guide | Things to Do & Itinerary',
  description:
    'Free Alibaug travel guides – things to do in Alibaug, Nagaon Beach guide, Mumbai & Pune weekend trip plans, best time to visit and a 2-day itinerary by Malhar Baug Resort.',
  alternates: { canonical: '/travel-guide/' },
};

export default function TravelGuidePage() {
  return <TravelGuideListView />;
}
