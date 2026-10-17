import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { FaqSection } from '@/components/layout/FaqSection';
import { CtaSection } from '@/components/layout/CtaSection';
import { BlogTeasers } from '@/components/blog/BlogTeasers';
import { NearbyPlaces } from '@/components/sections/NearbyPlaces';
import { Icon } from '@/components/ui/Icon';
import { PAGE_KEYWORDS } from '@/data/seo';
import styles from '@/components/layout/PageContent.module.scss';

export const metadata: Metadata = {
  title: { absolute: 'Places to Visit in Chakradharpur | Hotel K2 Travel Guide' },
  description:
    'Places to visit in Chakradharpur — Hirni Falls, Secret Waterfall, Nakti Dam, Mahadevsal Temple, Kera Mandir and local markets. A travel guide for guests staying at Hotel K2 in West Singhbhum, Jharkhand.',
  keywords: PAGE_KEYWORDS['travel-guide'].join(', '),
  alternates: { canonical: '/travel-guide' },
  openGraph: {
    title: 'Places to Visit in Chakradharpur | Hotel K2 Travel Guide',
    description:
      'Hirni Falls, Nakti Dam, Mahadevsal Temple and more — explore the best places to visit around Chakradharpur from Hotel K2.',
    url: '/travel-guide',
    images: [{ url: '/nearbyimage/hirnifall.png', width: 1200, height: 630, alt: 'Places to visit near Chakradharpur — Hirni Falls' }],
  },
};

const GETTING_HERE = [
  'By train — Chakradharpur Railway Station is a short walk from Hotel K2.',
  'By air — the nearest airport is in Ranchi, about 110 km away, with taxi transfers arranged on request.',
  'By road — Hotel K2 sits on Station Link Road at Etwari Bazar, easy to reach by car or auto.',
  'Around town — car rental and self-drive scooty are available at the hotel.',
];

const FAQS = [
  {
    q: 'What are the best places to visit in Chakradharpur?',
    a: 'Popular places to visit in Chakradharpur and nearby include Hirni Falls, Secret Waterfall, Nakti Dam, Mahadevsal Temple and Kera Mandir, along with the local Etwari Bazar market. Hotel K2 is a convenient base for all of them.',
  },
  {
    q: 'How far is Hirni Falls from Hotel K2, Chakradharpur?',
    a: 'Hirni Falls is one of the most popular waterfalls near Chakradharpur, surrounded by forest. You can reach it by car or on a rented scooty from Hotel K2; our front desk can help arrange your trip.',
  },
  {
    q: 'How do I reach Hotel K2 from Chakradharpur Railway Station?',
    a: 'Hotel K2 is located on Station Link Road at Etwari Bazar, just a short walk from Chakradharpur Railway Station. Autos and taxis are also readily available at the station.',
  },
  {
    q: 'Does Hotel K2 help arrange local sightseeing?',
    a: 'Yes. Car rental and self-drive scooty are available on request, and our 24-hour front desk is happy to help plan your visits to waterfalls, temples and markets around Chakradharpur.',
  },
];

export default function TravelGuidePage() {
  return (
    <>
      <PageBanner
        eyebrow="Travel Guide"
        title="Places to Visit in Chakradharpur"
        subtitle="Waterfalls, temples and local markets — a traveller's guide to what to see around Chakradharpur, with Hotel K2 as your base in West Singhbhum."
        breadcrumbLabel="Travel Guide"
        path="/travel-guide"
        image="/nearbyimage/hirnifall.png"
      />

      <NearbyPlaces />

      <section className={`${styles.band} ${styles.bandAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Getting Here</span>
            <h2 className={styles.heading}>How to reach Hotel K2</h2>
          </div>

          <ul className={styles.list}>
            {GETTING_HERE.map((item) => (
              <li key={item} className={styles.listItem}>
                <Icon name="check" size={18} className={styles.listIcon} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={FAQS} title="Places to visit in Chakradharpur — FAQ" id="travel-faq-heading" />

      <BlogTeasers
        slugs={[
          'places-to-visit-near-chakradharpur',
          'how-to-reach-chakradharpur',
          'where-to-stay-in-chakradharpur',
        ]}
        kicker="Travel Reads"
        title="More travel guides for Chakradharpur"
        intro="Plan your trip with our guides to getting here, getting around and making the most of your stay."
      />

      <CtaSection
        title="Explore Chakradharpur from Hotel K2"
        text="Make Hotel K2 your base for waterfalls, temples and local markets in West Singhbhum. Book a room and ask our front desk for travel tips."
        secondaryHref="/rooms"
        secondaryLabel="View our rooms"
      />
    </>
  );
}
