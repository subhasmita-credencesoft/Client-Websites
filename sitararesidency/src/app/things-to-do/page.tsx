import type { Metadata } from 'next';

import { ListingView } from '@/features/common';
import { business } from '@/core/config/business';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? business.website;

export const metadata: Metadata = {
  title: 'Things to Do in Navi Mumbai | Hotel Sitara Residency',
  description: 'Explore attractions near Hotel Sitara Residency, Kalamboli - Panvel, Elephanta Caves, Karnala Bird Sanctuary, malls & more.',
  alternates: {
    canonical: '/things-to-do',
  },
  openGraph: {
    title: 'Things to Do in Navi Mumbai | Hotel Sitara Residency',
    description: 'Top things to do near Kalamboli, Navi Mumbai during your stay at Hotel Sitara Residency.',
    url: `${siteUrl}/things-to-do`,
    type: 'website',
    siteName: business.name,
  },
};

export default function ThingsToDoPage() {
  return <ListingView type="things-to-do" />;
}
