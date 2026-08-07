import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import VenueCapacity from '@/components/sections/VenueCapacity';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/EventsPage.module.scss';
import { EVENTS_FAQS } from '@/data/faqs';
import { VENUES } from '@/data/venues';
import { SITE } from '@/data/site';
import { Venue } from '@/types';

interface EventsPageProps {
  venues: Venue[];
}

const EVENT_PATHS = [
  {
    index: '01',
    eyebrow: 'Weddings & Social',
    title: 'Weddings & Social Celebrations',
    description:
      'Mandap setups, Sangeet and Mehendi, grand receptions indoors or under the open sky, with dedicated dressing suites and flexible decorator policy.',
    cta: 'Explore Weddings',
    href: '/events/weddings',
    image: '/newedit/Luxurious Courtyard Entrance at Night.avif',
  },
  {
    index: '02',
    eyebrow: 'Corporate & MICE',
    title: 'Corporate Conferences & MICE',
    description:
      'AGMs, product launches, seminars and workshops with full AV, dedicated Wi-Fi, breakout zones, and seamless catering.',
    cta: 'Explore Corporate & MICE',
    href: '/events/corporate',
    image: '/newedit/Warm-Lit Luxury Hotel Corridor.avif',
  },
  {
    index: '03',
    eyebrow: 'Venue Spaces',
    title: 'Venue Spaces & Capacity',
    description:
      'Compare halls, lawns, and boardrooms  theater, cluster, U-shape and floating layouts, with seating and weather-backup plans.',
    cta: 'View Venues & Capacity',
    href: '/events/venues',
    image: '/newedit/Our Building.avif',
  },
  {
    index: '04',
    eyebrow: 'Custom Proposals',
    title: 'Request a Custom Proposal',
    description:
      'Tell us about your event  type, guests, dates, and catering preferences  and receive a tailored proposal within 24 hours.',
    cta: 'Event Inquiry Form',
    href: '/contact?inquiry=Banquets+%2F+Events',
    image: '/newedit/Reciption.avif',
  },
];

const EventsPage: NextPage<EventsPageProps> = ({ venues }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Baibhab Resorts & Conventions',
    description: 'Odisha\u2019s premier event and wedding destination on the Bhubaneswar\u2013Cuttack corridor.',
    url: `${SITE.domain}/events`,
    maximumAttendeeCapacity: 1500,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar\u2013Cuttack Highway',
      addressLocality: 'Phulnakhara',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
    telephone: SITE.phoneEvents,
    sameAs: [SITE.facebook, SITE.instagram],
    containsPlace: venues.map((venue) => ({
      '@type': 'EventVenue',
      name: venue.name,
      maximumAttendeeCapacity: venue.floatingCapacity,
    })),
  };

  return (
    <>
      <Seo
        title="Weddings & Events in Odisha"
        description="Grand banquet halls, open-air lawns and boardrooms on the Bhubaneswar–Cuttack corridor for weddings, corporate MICE and celebrations up to 1,500+ guests."
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
            <Link
              key={path.title}
              href={path.href}
              className={styles.card}
              data-reveal
              data-reveal-stagger
            >
              <div className={styles.cardMedia}>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url('${path.image}')` }}
                  role="img"
                  aria-label={path.title}
                />
                <div className={styles.cardOverlay} aria-hidden="true" />
              </div>
              <span className={styles.cardIndex}>{path.index}</span>
              <div className={styles.cardBody}>
                <p className={styles.cardEyebrow}>{path.eyebrow}</p>
                <p className={styles.cardTitle}>{path.title}</p>
                <p className={styles.cardText}>{path.description}</p>
                <span className={styles.cardCta}>
                  {path.cta}
                  <iconify-icon icon="solar:arrow-right-linear" width="16" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <VenueCapacity venues={venues} />

      <FaqSection
        items={EVENTS_FAQS}
        eyebrow="Events FAQs"
        title="Event Questions, Answered"
        subtitle="Capacity, décor, catering and booking questions for weddings, corporate events and social gatherings."
      />
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
