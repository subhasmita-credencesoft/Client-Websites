import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import styles from '@/styles/EventsPage.module.scss';

const CORPORATE_FEATURES = [
  'High-definition projection screens and premium sound systems.',
  'High-speed dedicated Wi-Fi network for event attendees.',
  'Flexible stage configurations and breakout meeting zones.',
  'Custom tea/coffee breaks and buffet lunch arrangements.',
];

const CORPORATE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Corporate conference in the Imperial Hall',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Executive Boardroom meeting',
  },
  {
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Keynote presentation with stage lighting',
  },
];

const CorporatePage: NextPage = () => {
  return (
    <>
      <Seo
        title="Corporate Conferences & MICE"
        description="AGMs, product launches, seminars and team workshops at Baibhab Resorts  full AV, high-speed Wi-Fi, breakout rooms and dedicated conference catering."
        path="/events/corporate"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Weddings & Events', href: '/events' },
          { label: 'Corporate & MICE' },
        ]}
        eyebrow="Corporate Conferences & MICE"
        title="Elevate Your Corporate Presence"
        subtitle="Professional venue setups tailored for annual general meetings, product launches, regional seminars, and team workshops."
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
            </figure>
          ))}
        </div>

        <div className={styles.contentBlock} data-reveal>
          <h2 className="h2">Technical & facility features</h2>
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
              View Boardrooms & Halls
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default CorporatePage;
