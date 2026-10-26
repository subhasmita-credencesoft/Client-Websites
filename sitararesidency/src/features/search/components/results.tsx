'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

import type { SearchEntry } from '@/features/search/data/search';
import { business } from '@/core/config/business';

export function SearchResults({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return entries.filter((entry) => [entry.title, entry.description, ...entry.keywords]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery));
  }, [entries, normalizedQuery]);

  return (
    <>
      <label className="mt-10 flex items-center gap-3 border-b border-forest pb-3">
        <span className="sr-only">Search the site</span>
        <Search className="h-4 w-4 text-terracotta" />
        <input
          data-testid="input-site-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${business.name}`}
          className="w-full bg-transparent text-lg outline-none placeholder:text-sage-muted/60"
        />
      </label>

      {normalizedQuery && (
        <section className="mt-10" aria-live="polite" aria-label="Search results">
          <p className="font-mono-label text-[10px] text-terracotta">
            {results.length} {results.length === 1 ? 'result' : 'results'} for “{query}”
          </p>
          {results.length > 0 ? (
            <ul className="mt-4 divide-y divide-forest/15 border-y border-forest/15">
              {results.map((result) => (
                <li key={`${result.href}-${result.title}`}>
                  <Link href={result.href} className="group flex items-center justify-between gap-4 py-5">
                    <span>
                      <strong className="block font-display text-2xl text-forest">{result.title}</strong>
                      <span className="mt-1 block text-sm leading-6 text-sage-muted">{result.description}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-terracotta transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-7 text-sage-muted">No matching pages yet. Try “rooms”, “dining”, “offers”, or “Navi Mumbai”.</p>
          )}
        </section>
      )}
    </>
  );
}