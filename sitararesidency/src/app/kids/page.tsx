import type { Metadata } from 'next';

import { Clock3, Search } from 'lucide-react';

import { PageIntro, PromiseSection } from '@/features/common';
import { kidsPage } from '@/features/common/data/pages';
import { business } from '@/core/config/business';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? business.website;

export const metadata: Metadata = {
  title: 'Family Stay | Hotel Sitara Residency Kalamboli Navi Mumbai',
  description: 'Family-friendly stay at Hotel Sitara Residency, Kalamboli Navi Mumbai. Comfortable rooms, amenities for families, convenient location.',
  alternates: {
    canonical: '/kids',
  },
  openGraph: {
    title: 'Family Stay | Hotel Sitara Residency Kalamboli Navi Mumbai',
    description: 'Family-friendly accommodation at Hotel Sitara Residency, Kalamboli, Navi Mumbai.',
    url: `${siteUrl}/kids`,
    type: 'website',
    siteName: business.name,
  },
};

export default function KidsPage() {
  return (
    <main>
      <PageIntro eyebrow={kidsPage.eyebrow} title={kidsPage.heading} intro={kidsPage.intro} image={kidsPage.image} />
      <PromiseSection
        eyebrow={kidsPage.promise.eyebrow}
        heading={kidsPage.promise.heading}
        description={kidsPage.promise.description}
        tiles={kidsPage.promise.tiles}
        icons={[Search, Clock3]}
      />
    </main>
  );
}