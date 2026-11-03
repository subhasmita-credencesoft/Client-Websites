import type { Metadata } from 'next';
import TravelGuideListView from '@/features/travel-guide/TravelGuideListView';

export const metadata: Metadata = {
  title: 'Alibaug Travel Guide – Things to Do, How to Reach & Itinerary',
  description:
    'Free Alibaug travel guides by Malhar Baug Resort — things to do in Alibaug, Nagaon Beach guide, how to reach from Mumbai & Pune by ferry and road, best time to visit, 2-day itinerary and local tips.',
  alternates: { canonical: '/travel-guide/' },
  keywords: [
    'alibaug travel guide',
    'things to do in alibaug',
    'how to reach alibaug from mumbai',
    'alibaug ferry from gateway of india',
    'nagaon beach guide',
    'best time to visit alibaug',
    'alibaug weekend trip',
    'alibaug 2 day itinerary',
  ],
  openGraph: {
    title: 'Alibaug Travel Guide – Things to Do, How to Reach & Itinerary',
    description:
      'Complete Alibaug travel guide — beaches, forts, water sports, Konkan food, ferry timings and 2-day itinerary by Malhar Baug Resort in Nagaon.',
    images: [{ url: '/heroimg3.jpeg', width: 1200, height: 630, alt: 'Alibaug travel guide – beaches and activities near Nagaon' }],
  },
};

export default function TravelGuidePage() {
  return <TravelGuideListView />;
}
