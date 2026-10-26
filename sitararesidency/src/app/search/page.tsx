import type { Metadata } from 'next';

import { SearchSection } from '@/features/search';
import { searchEntries } from '@/features/search/data/search';
import { searchPage } from '@/features/common/data/pages';

export const metadata: Metadata = { title: searchPage.title, description: searchPage.description };

export default function SearchPage() {
  return <SearchSection heading={searchPage.heading} intro={searchPage.intro} entries={searchEntries} />;
}