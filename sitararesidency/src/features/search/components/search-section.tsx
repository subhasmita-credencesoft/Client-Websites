import { Search } from 'lucide-react';

import { SearchResults } from '@/features/search/components/results';
import type { SearchEntry } from '@/features/search/data/search';

export function SearchSection({
  heading,
  intro,
  entries,
}: {
  heading: string;
  intro: string;
  entries: SearchEntry[];
}) {
  return (
    <main className="bg-cream px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[900px]">
        <Search className="h-8 w-8 text-terracotta" />
        <h1 className="mt-5 sm:mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-forest">{heading}</h1>
        <p className="mt-4 sm:mt-5 max-w-lg text-sm leading-7 text-sage-muted">{intro}</p>
        <SearchResults entries={entries} />
      </div>
    </main>
  );
}