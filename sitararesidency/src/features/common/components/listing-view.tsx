import { CalendarDays } from 'lucide-react';

import { sectionConfig } from '@/features/common/data/section-config';
import type { ListingType } from '@/core/types/content';
import { BookButton } from '@/features/booking';
import { Card } from '@/shared/ui/card';
import { PageIntro } from './page-intro';

export function ListingView({ type }: { type: ListingType }) {
  const config = sectionConfig(type);

  return (
    <main>
      <PageIntro {...config} />
      <section className="listing-section bg-cream px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex items-center justify-between">
            <p className="font-mono-label text-[10px] text-terracotta">
              {config.items.length.toString().padStart(2, '0')} ways to begin
            </p>
            {type === 'bedrooms' && (
              <BookButton
                testId="button-listing-book"
                className="inline-flex items-center gap-2 bg-terracotta px-4 py-3 text-[10px] font-mono-label text-cream"
              >
                Check availability
                <CalendarDays className="h-3 w-3" />
              </BookButton>
            )}
          </div>
          <div className="grid gap-x-5 gap-y-14 md:grid-cols-3">
            {config.items.map((item) => (
              <Card
                key={item.slug}
                item={item}
                href={type === 'things-to-do' ? '/things-to-do' : `/${type}/${item.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
