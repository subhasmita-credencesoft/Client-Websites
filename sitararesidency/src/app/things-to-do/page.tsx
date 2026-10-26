import type { Metadata } from 'next';

import { ListingView } from '@/features/common';
import { sectionConfig } from '@/features/common/data/section-config';

const config = sectionConfig('things-to-do');
export const metadata: Metadata = { title: 'Things to do', description: config.intro };

export default function ThingsToDoPage() {
  return <ListingView type="things-to-do" />;
}
