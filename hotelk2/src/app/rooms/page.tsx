import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { FaqSection } from '@/components/layout/FaqSection';
import { CtaSection } from '@/components/layout/CtaSection';
import { BlogTeasers } from '@/components/blog/BlogTeasers';
import { RoomsGrid } from '@/components/sections/RoomsGrid';
import { Icon } from '@/components/ui/Icon';
import { PAGE_KEYWORDS } from '@/data/seo';
import styles from '@/components/layout/PageContent.module.scss';

export const metadata: Metadata = {
  title: { absolute: 'Rooms in Chakradharpur | Hotel K2 Accommodations' },
  description:
    'Rooms in Chakradharpur at Hotel K2 — AC single, double, triple and four-bed suite rooms with free Wi-Fi, LED TV, geyser and power backup. Premium and budget rooms near Chakradharpur Railway Station, from ₹999 a night.',
  keywords: PAGE_KEYWORDS.rooms.join(', '),
  alternates: { canonical: '/rooms' },
  openGraph: {
    title: 'Rooms in Chakradharpur | Hotel K2 Accommodations',
    description:
      'AC single, double, triple and suite rooms in Chakradharpur with free Wi-Fi, TV and geyser. Book Hotel K2 from ₹999 a night.',
    url: '/rooms',
    images: [{ url: '/newimages/PremiumroomDoublebed.png', width: 1200, height: 630, alt: 'Rooms in Chakradharpur — Hotel K2' }],
  },
};

const ROOM_FEATURES = [
  'Air-conditioned rooms with attached bathrooms',
  'Free high-speed Wi-Fi',
  'LED television',
  'Geyser (hot water)',
  'Power backup',
  '24-hour room service',
  'Daily housekeeping',
  'Comfortable beds and clean linen',
];

const FAQS = [
  {
    q: 'What room types are available at Hotel K2, Chakradharpur?',
    a: 'Hotel K2 offers single-bed, double-bed standard, double-bed classic, double-bed premium, triple-bed premium and four-bed suite rooms. Every room is air-conditioned and includes free Wi-Fi, LED TV and a geyser.',
  },
  {
    q: 'What is the room tariff at Hotel K2 in Chakradharpur?',
    a: 'Room rates start from ₹999 per night for a double-bed standard room and go up to ₹2,150 for our four-bed suite and triple-bed premium rooms, depending on the room type and season.',
  },
  {
    q: 'Do the rooms have AC and free Wi-Fi?',
    a: 'Yes. All rooms at Hotel K2 are air-conditioned and include free Wi-Fi, LED TV and hot water via geyser, along with power backup for an uninterrupted stay.',
  },
  {
    q: 'Can I book a room directly with Hotel K2?',
    a: 'Yes. You can book directly through our online booking engine or call the 24-hour front desk at +91 8709490824 to check availability and reserve your room.',
  },
  {
    q: 'Are the rooms suitable for families and groups?',
    a: 'Yes. Our triple-bed premium and four-bed suite rooms are designed for families and groups, while single and double rooms suit solo travellers and couples.',
  },
];

export default function RoomsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Accommodations"
        title="Rooms in Chakradharpur — Hotel K2 Accommodations"
        subtitle="Choose from AC single, double, triple and suite rooms with free Wi-Fi, LED TV and geyser — all just minutes from Chakradharpur Railway Station."
        breadcrumbLabel="Accommodations"
        path="/rooms"
        image="/newimages/PremiumroomDoublebed3.png"
      />

      <section className={styles.band}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Comfort & Value</span>
            <h2 className={styles.heading}>A room for every kind of stay</h2>
            <p className={styles.lead}>
              Whether you are travelling solo on business, staying as a couple, or bringing
              the whole family, Hotel K2 has a clean, comfortable and affordable room in
              Chakradharpur to match.
            </p>
          </div>

          <ul className={styles.list}>
            {ROOM_FEATURES.map((feature) => (
              <li key={feature} className={styles.listItem}>
                <Icon name="check" size={18} className={styles.listIcon} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RoomsGrid />

      <FaqSection items={FAQS} title="Rooms in Chakradharpur — FAQ" id="rooms-faq-heading" />

      <BlogTeasers
        slugs={[
          'choosing-a-room-at-hotel-k2',
          'where-to-stay-in-chakradharpur',
          'hotels-near-chakradharpur-railway-station',
        ]}
        kicker="Room Guides"
        title="Help choosing your room"
        intro="Not sure which room suits your trip? These guides compare the options and explain what to check before you book."
      />

      <CtaSection
        title="Ready to book your room?"
        text="Check live availability and reserve your room directly with Hotel K2, or call our 24-hour front desk for help choosing the right room."
        secondaryHref="/conference-hall"
        secondaryLabel="Conference hall"
      />
    </>
  );
}
