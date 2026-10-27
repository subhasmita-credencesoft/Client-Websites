import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { business } from '@/core/config/business';
import { JsonLdScript } from '@/shared/ui/json-ld';
import { pageMetadata, SITE_URL, webPageSchema } from '@/core/lib/seo';

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

export default function LeisurePage() {
  return (
    <main className="leisure-page">
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
      {/* ═══ LEISURE CONTENT ═══ */}
      {/* ... existing content ... */}
    </main>
  );
}