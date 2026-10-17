import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/layout/PageBanner';
import { CtaSection } from '@/components/layout/CtaSection';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ABOUT, SITE } from '@/data/site';
import { PAGE_KEYWORDS } from '@/data/seo';
import styles from '@/components/layout/PageContent.module.scss';

export const metadata: Metadata = {
  title: { absolute: 'About Hotel K2 | Hotel in Chakradharpur, Jharkhand' },
  description:
    'About Hotel K2 — a comfortable hotel in Chakradharpur, Jharkhand, near Chakradharpur Railway Station at Etwari Bazar, Station Link Road. AC rooms, free Wi-Fi, 24-hour front desk, banquet hall and warm Jharkhand hospitality.',
  keywords: PAGE_KEYWORDS.about.join(', '),
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Hotel K2 | Hotel in Chakradharpur, Jharkhand',
    description:
      'Learn about Hotel K2, a comfortable hotel near Chakradharpur Railway Station with AC rooms, free Wi-Fi, banquet hall and 24-hour front desk.',
    url: '/about',
    images: [{ url: '/homehero1.png', width: 1200, height: 630, alt: 'About Hotel K2, Chakradharpur' }],
  },
};

const HIGHLIGHTS = [
  {
    title: 'Prime location',
    body: 'Set on Station Link Road, Etwari Bazar, minutes from Chakradharpur Railway Station and the town market — ideal for travellers arriving by train.',
  },
  {
    title: 'Comfortable AC rooms',
    body: 'Well-kept air-conditioned rooms with free Wi-Fi, LED TV, geyser and power backup, from budget stays to premium suites.',
  },
  {
    title: 'Warm hospitality',
    body: 'A 24-hour front desk, room service and a team that knows Chakradharpur — we help with arrivals, directions and local travel.',
  },
  {
    title: 'Events & dining',
    body: 'A banquet and conference hall with catering for meetings, functions and celebrations, plus family dining space on site.',
  },
  {
    title: 'Travel made easy',
    body: 'Car rental and self-drive scooty are available so you can explore West Singhbhum at your own pace.',
  },
  {
    title: 'Value for money',
    body: 'Clean, secure and affordable accommodation for business travellers, families and tourists visiting Jharkhand.',
  },
];

const FACTS = [
  'Near Chakradharpur Railway Station (Etwari Bazar, Station Link Road)',
  'Check-in 12:00 PM · Check-out 11:00 AM',
  '24-hour front desk and 24-hour room service',
  'Free high-speed Wi-Fi and power backup',
  'Banquet hall, conference hall and catering',
  'Car rental and self-drive scooty',
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        title="About Hotel K2 — A Warm Stay in Chakradharpur, Jharkhand"
        subtitle="Comfort, convenience and warm hospitality in the heart of Chakradharpur, West Singhbhum — near the railway station and local market."
        breadcrumbLabel="About Us"
        path="/about"
        image="/homehero1.png"
      />

      <section className={styles.band}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Our Story</span>
            <h2 className={styles.heading}>Welcome to Hotel K2</h2>
          </div>

          <div className={styles.prose}>
            <p>{ABOUT.body}</p>
            <p>
              From the moment you arrive at {SITE.address}, you are a short walk from
              Chakradharpur Railway Station and the bustling Etwari Bazar market. Our
              location makes Hotel K2 a convenient base for business trips, family visits
              and travellers exploring Jharkhand.
            </p>
            <p>
              Every room is maintained for cleanliness and comfort, with free Wi-Fi, LED TV,
              geyser and power backup. Whether you need a single room for a night or a suite
              for a family, our front desk is available around the clock to help.
            </p>
          </div>

          <div className={`${styles.narrow} ${styles.mediaWrap}`}>
            <Image
              src={ABOUT.image}
              alt={ABOUT.imageAlt}
              width={1200}
              height={600}
              sizes="(min-width: 1024px) 860px, 100vw"
              className={styles.mediaImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Why Hotel K2</span>
            <h2 className={styles.heading}>Why guests choose us</h2>
          </div>

          <div className={styles.grid3}>
            {HIGHLIGHTS.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 100} className={styles.tile}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.bandAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Good to know</span>
            <h2 className={styles.heading}>Hotel K2 at a glance</h2>
          </div>

          <ul className={styles.list}>
            {FACTS.map((fact) => (
              <li key={fact} className={styles.listItem}>
                <Icon name="check" size={18} className={styles.listIcon} />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title="Plan your stay in Chakradharpur"
        text="Book directly with Hotel K2 for the best available rate, or explore our rooms and services to find the right fit for your trip."
        secondaryHref="/rooms"
        secondaryLabel="View our rooms"
      />
    </>
  );
}
