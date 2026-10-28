import type { Metadata } from 'next';
import NearbyClient from './NearbyClient';

export const metadata: Metadata = {
  title: 'Places to Visit Near Nagaon Beach | Alibaug Attractions',
  description:
    'Discover the best places to visit near Malhar Baug Resort — Nagaon Beach (2 km), Alibaug Beach, Kolaba Fort, Kihim Beach, Kashid Beach, Murud Janjira and top things to do in Alibaug.',
  alternates: { canonical: '/nearby/' },
};

export default function NearbyPage() {
  return <NearbyClient />;
}
