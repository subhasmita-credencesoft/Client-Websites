import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/EventsPage.module.scss';
import { VENUES_FAQS } from '@/data/faqs';
import { VENUES } from '@/data/venues';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { Venue } from '@/types';

interface VenuesPageProps {
  venues: Venue[];
}

const VenuesPage: NextPage<VenuesPageProps> = ({ venues }) => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Weddings & Events', url: '/events' },
      { name: 'Venues & Capacity', url: '/events/venues' },
    ]),
    createFaqSchema(VENUES_FAQS),
    ...venues.map((venue) => ({
      '@context': 'https://schema.org',
      '@type': 'EventVenue',
      name: `${venue.name} — Baibhab Resorts`,
      description: venue.description,
      url: `${SITE.domain}/events/venues#${venue.slug}`,
      image: `${SITE.domain}${venue.image}`,
      maximumAttendeeCapacity: venue.floatingCapacity,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar–Cuttack Highway',
        addressLocality: 'Phulnakhara',
        addressRegion: 'Odisha',
        addressCountry: 'IN',
      },
      telephone: SITE.phoneEvents,
    })),
  ];

  return (
    <>
      <Seo
        title="Venue Spaces & Capacity Matrix — Banquets & Lawns"
        description="Compare banquet halls, open-air lawns and boardrooms at Baibhab Resorts on the Bhubaneswar–Cuttack corridor. Seating and floating capacities, layout options, and weather-backup plans."
        path="/events/venues"
        keywords="royal imperial hall bhubaneswar, banquet hall capacity cuttack, wedding lawn phulnakhara, conference hall capacity bhubaneswar, mandap venues odisha"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/newedit/Warmly Lit Modern Colonnade at Night.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Weddings & Events', href: '/events' },
          { label: 'Venues & Capacity' },
        ]}
        eyebrow="Venue Spaces & Capacity"
        title="Spaces Built Around Your Event"
        subtitle="Theater, cluster, U-shape or floating — compare every layout before you decide."
        cta={{ label: 'Request a Proposal', href: '/contact?inquiry=Banquets+%2F+Events' }}
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.venueList}>
          {venues.map((venue) => (
            <article key={venue.id} id={venue.slug} className={styles.venue} data-reveal>
              <div className={styles.venueMedia}>
                {venue.video ? (
                  <video
                    className={styles.venueVideo}
                    src={venue.video}
                    poster={venue.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  />
                ) : (
                  <Image
                    src={venue.image}
                    alt={`${venue.name} - ${venue.venueType} with ${venue.area} at Baibhab Resorts Bhubaneswar`}
                    className={styles.venueImage}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className={styles.venueBody}>
                <div className={styles.venueMeta}>
                  <p className="caption">{venue.venueType}</p>
                  <h2 className="h2" style={{ marginTop: 8 }}>
                    {venue.name}
                  </h2>
                  <p className={styles.venueText}>{venue.description}</p>
                </div>

                <div className={styles.capacityGrid}>
                  <div className={styles.capacityItem}>
                    <p className={styles.capacityLabel}>Area</p>
                    <p className={styles.capacityValue}>{venue.area}</p>
                  </div>
                  {venue.ceilingHeight && (
                    <div className={styles.capacityItem}>
                      <p className={styles.capacityLabel}>Ceiling Height</p>
                      <p className={styles.capacityValue}>{venue.ceilingHeight}</p>
                    </div>
                  )}
                  <div className={styles.capacityItem}>
                    <p className={styles.capacityLabel}>Seated Capacity</p>
                    <p className={styles.capacityValue}>{venue.seatedCapacity}</p>
                  </div>
                  <div className={styles.capacityItem}>
                    <p className={styles.capacityLabel}>Floating Capacity</p>
                    <p className={styles.capacityValue}>
                      {venue.floatingCapacity >= 1000
                        ? `${venue.floatingCapacity.toLocaleString('en-IN')}+`
                        : venue.floatingCapacity}
                    </p>
                  </div>
                </div>

                <table className={styles.layoutTable} aria-label={`${venue.name} Seating Capacities`}>
                  <thead>
                    <tr>
                      <th scope="col">Layout</th>
                      <th scope="col">Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venue.layouts.map((layout) => (
                      <tr key={layout.name}>
                        <td>{layout.name}</td>
                        <td>{layout.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <ul className={styles.featureList}>
                  {venue.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className={styles.ctaBlock}>
                  <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-primary">
                    Enquire About This Venue
                  </Link>
                  <Link href="/events/weddings" className="btn btn-outline">
                    Wedding Packages
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <FaqSection
        items={VENUES_FAQS}
        eyebrow="Venue FAQs"
        title="Venue & Capacity Questions"
        subtitle="Capacities, layouts, weather backup and AV equipment across our banquet halls, lawns and boardrooms."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<VenuesPageProps> = async () => {
  return {
    props: {
      venues: VENUES,
    },
  };
};

export default VenuesPage;
