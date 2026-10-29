import type { Metadata } from 'next';
import { Wifi, ShieldCheck, Clock3, Car, BedDouble, UtensilsCrossed } from 'lucide-react';

import { PageIntro } from '@/features/common';
import { leisurePage } from '@/features/common/data/pages';
import { JsonLdScript } from '@/shared/ui/json-ld';
import { pageMetadata, webPageSchema } from '@/core/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Leisure & Amenities | Hotel Sitara Residency Kalamboli Navi Mumbai',
  description:
    'Hotel amenities at Hotel Sitara Residency - free Wi-Fi, parking, 24x7 reception, room service, power backup & more.',
  path: '/leisure',
  keywords: [
    'hotel amenities Kalamboli',
    '24x7 reception Navi Mumbai',
    'hotel facilities near Panvel',
    'leisure activities Hotel Sitara Residency',
  ],
});

const icons = [BedDouble, Car, UtensilsCrossed, Wifi, Clock3, ShieldCheck];

export default function LeisurePage() {
  return (
    <main className="leisure-page bg-bg text-forest">
      <JsonLdScript
        data={[
          webPageSchema({
            name: 'Leisure & Amenities | Hotel Sitara Residency',
            description:
              'Hotel amenities at Hotel Sitara Residency - free Wi-Fi, parking, 24x7 reception, room service, power backup & more.',
            path: '/leisure',
            type: 'WebPage',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Hotel amenities',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'High-Speed Wi-Fi' },
              { '@type': 'ListItem', position: 2, name: '24/7 Room Service' },
              { '@type': 'ListItem', position: 3, name: 'Free Parking' },
              { '@type': 'ListItem', position: 4, name: 'Power Backup' },
              { '@type': 'ListItem', position: 5, name: 'Daily Housekeeping' },
              { '@type': 'ListItem', position: 6, name: 'Air Conditioning' },
            ],
          },
        ]}
      />

      <PageIntro
        eyebrow={leisurePage.eyebrow}
        title={leisurePage.heading}
        intro={leisurePage.intro}
        image={leisurePage.image}
      />

      <section className="bg-cream px-5 py-16 md:px-10 md:py-24 border-t border-forest/10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
              Everything for your comfort
            </p>
            <h2 className="mt-2 font-serif text-3xl italic text-forest">
              Practical Amenities, Thoughtfully Delivered
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leisurePage.tiles.map((tile, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="border border-forest/15 bg-white p-6 shadow-sm hover:border-terracotta transition-colors"
                >
                  <Icon className="h-6 w-6 text-terracotta mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-forest">{tile.title}</h3>
                  <p className="mt-2 text-xs text-sage-muted leading-relaxed">{tile.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
