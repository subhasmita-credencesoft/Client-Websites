import type { Metadata } from 'next';

import { Clock3, Search } from 'lucide-react';

import { PageIntro, PromiseSection } from '@/features/common';
import { kidsPage } from '@/features/common/data/pages';

export const metadata: Metadata = { title: kidsPage.title, description: kidsPage.description };

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