import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/EventsPage.module.scss';
import { CORPORATE_FAQS } from '@/data/faqs';
import { createBreadcrumbSchema, createEventVenueSchema, createFaqSchema } from '@/lib/schema';

const CORPORATE_FEATURES = [
  'High-definition projection screens, LED video walls and premium sound systems.',
  'High-speed dedicated Wi-Fi network for event attendees and video conferencing.',
  'Flexible stage configurations, breakout meeting zones, and boardroom seating.',
  'Custom morning coffee breaks, business lunch buffets, and evening cocktail dinners.',
  '100% full generator power backup for uninterrupted corporate sessions.',
  'Dedicated parking for 200+ vehicles with hassle-free NH-16 highway access.',
];

const CORPORATE_IMAGES = [
  {
    src: '/newedit/Waiting area 2.avif',
    alt: 'Executive delegate lounge and waiting area at Baibhab Resorts Bhubaneswar',
  },
  {
    src: '/newedit/Luxury Courtyard Pathway at Night.avif',
    alt: 'Courtyard colonnade and evening conference networking space on NH-16',
  },
  {
    src: '/newedit/Reciption.avif',
    alt: 'Corporate event registration and reception desk at Baibhab Resorts',
  },
];

const CorporatePage: NextPage = () => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Weddings & Events', url: '/events' },
      { name: 'Corporate & MICE', url: '/events/corporate' },
    ]),
    createEventVenueSchema(),
    createFaqSchema(CORPORATE_FAQS),
  ];

  return (
    <>
      <Seo
        title="Corporate Conferences & MICE Venues in Bhubaneswar — Cuttack"
        description="Host AGMs, product launches, seminars and team workshops at Baibhab Resorts on NH-16. Full AV support, high-speed Wi-Fi, breakout boardrooms, and executive catering."
        path="/events/corporate"
        keywords="corporate event venue bhubaneswar, conference hall phulnakhara, mice venue odisha, seminar hall cuttack highway, business meeting room bhubaneswar, corporate retreat odisha"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/newedit/Warm-Lit Luxury Hotel Corridor.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Weddings & Events', href: '/events' },
          { label: 'Corporate & MICE' },
        ]}
        eyebrow="Corporate Conferences & MICE"
        title="Elevate Your Corporate Presence"
        subtitle="Professional venue setups tailored for annual general meetings, product launches, regional seminars, and team workshops on the Bhubaneswar–Cuttack corridor."
        cta={{ label: 'Request a Proposal', href: '/contact?inquiry=Banquets+%2F+Events' }}
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.featureGrid} data-reveal>
          {CORPORATE_IMAGES.map((img) => (
            <figure key={img.src} className={styles.featureImageWrap}>
              <Image
                src={img.src}
                alt={img.alt}
                className={styles.featureImage}
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <figcaption className={styles.featureCaption}>{img.alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.contentBlock} data-reveal>
          <h2 className="h2">Engineered for Business Excellence</h2>
          <p className={styles.featureText}>
            Positioned midway between Bhubaneswar and Cuttack at Phulnakhara, Baibhab Resorts allows delegates from
            both cities to arrive in 25–35 minutes without traversing inner-city traffic bottlenecks.
          </p>
          <ul className={styles.checklist}>
            {CORPORATE_FEATURES.map((feature) => (
              <li key={feature} className={styles.checkItem}>
                <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className={styles.ctaBlock}>
            <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-primary">
              Request a Corporate Proposal
            </Link>
            <Link href="/events/venues" className="btn btn-outline">
              Compare Conference Halls
            </Link>
            <Link href="/stay" className="btn btn-outline">
              Executive Stay Rooms
            </Link>
          </div>
        </div>
      </div>

      <FaqSection
        items={CORPORATE_FAQS}
        eyebrow="Corporate FAQs"
        title="Corporate & MICE Questions"
        subtitle="Audio-visual setups, seating formats, Wi-Fi connectivity and delegate dining."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default CorporatePage;
