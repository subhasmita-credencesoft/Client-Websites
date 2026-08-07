import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import VenueCapacity from '@/components/sections/VenueCapacity';
import styles from '@/styles/EventsPage.module.scss';
import { VENUES } from '@/data/venues';
import { Venue } from '@/types';

interface EventsPageProps {
  venues: Venue[];
}

const EVENT_PATHS = [
  {
    title: 'Weddings & Social Celebrations',
    description:
      'Mandap setups, Sangeet and Mehendi, grand receptions indoors or under the open sky, with dedicated dressing suites and flexible decorator policy.',
    cta: 'Explore Weddings',
    href: '/events/weddings',
  },
  {
    title: 'Corporate Conferences & MICE',
    description:
      'AGMs, product launches, seminars and workshops with full AV, dedicated Wi-Fi, breakout zones, and seamless catering.',
    cta: 'Explore Corporate & MICE',
    href: '/events/corporate',
  },
  {
    title: 'Venue Spaces & Capacity',
    description:
      'Compare halls, lawns, and boardrooms  theater, cluster, U-shape and floating layouts, with seating and weather-backup plans.',
    cta: 'View Venues & Capacity',
    href: '/events/venues',
  },
  {
    title: 'Request a Custom Proposal',
    description:
      'Tell us about your event  type, guests, dates, and catering preferences  and receive a tailored proposal within 24 hours.',
    cta: 'Event Inquiry Form',
    href: '/contact?inquiry=Banquets+%2F+Events',
  },
];

const EventsPage: NextPage<EventsPageProps> = ({ venues }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Baibhab Resorts & Conventions',
    description: 'Odisha\u2019s premier event and wedding destination on the Bhubaneswar\u2013Cuttack corridor.',
    maximumAttendeeCapacity: 1500,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar\u2013Cuttack Highway',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
  };

  return (
    <>
      <Seo
        title="Conventions, Weddings & Events Odisha's Premier Event Destination"
        description="Grand banquet halls, open-air lawns and executive boardrooms on the Bhubaneswar\u2013Cuttack corridor  for weddings, corporate MICE, and social celebrations up to 1,500+ guests."
        path="/events"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/images/baibhabgate.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Weddings & Events' },
        ]}
        eyebrow="Conventions, Weddings & Events"
        title="Odisha's Premier Event & Wedding Destination"
        subtitle="Turning your grandest visions into seamless, memorable occasions."
        cta={{ label: 'Plan Your Event', href: '/contact?inquiry=Banquets+%2F+Events' }}
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.grid}>
          {EVENT_PATHS.map((path) => (
            <Link key={path.title} href={path.href} className={styles.card} data-reveal data-reveal-stagger>
              <p className={styles.cardTitle}>{path.title}</p>
              <p className={styles.cardText}>{path.description}</p>
              <span className={styles.cardCta}>
                {path.cta}
                <iconify-icon icon="solar:arrow-right-linear" width="16" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <VenueCapacity venues={venues} />
    </>
  );
};

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  return {
    props: {
      venues: VENUES,
    },
  };
};

export default EventsPage;
