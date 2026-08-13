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
import { Venue } from '@/types';

interface VenuesPageProps {
  venues: Venue[];
}

const VenuesPage: NextPage<VenuesPageProps> = ({ venues }) => {
  const jsonLd = venues.map((venue) => ({
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: venue.name,
    description: venue.description,
    url: `${SITE.domain}/events/venues#${venue.slug}`,
    maximumAttendeeCapacity: venue.floatingCapacity,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar–Cuttack Highway',
      addressLocality: 'Phulnakhara',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
    telephone: SITE.phoneEvents,
  }));

  return (
    <>
      <Seo
        title="Venue Spaces & Capacity Matrix"
        description="Compare banquet halls, open-air lawns and boardrooms at Baibhab Resorts — seating and floating capacities, layout options and weather-backup plans."
        path="/events/venues"
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
                    alt={venue.name}
                    className={styles.venueImage}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className={styles.venueBody}>
                <div className={styles.venueMeta}>
                  <span className={styles.venueType}>{venue.venueType}</span>
                  <span className={styles.venueMetaText}>{venue.area}</span>
                  {venue.ceilingHeight && <span className={styles.venueMetaText}>{venue.ceilingHeight}</span>}
                </div>
                <h2 className={styles.venueTitle}>{venue.name}</h2>
                <p className={styles.venueText}>{venue.description}</p>

                <table className={styles.venueTable}>
                  <thead>
                    <tr>
                      <th>Layout</th>
                      <th>Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Seated</td>
                      <td>{venue.seatedCapacity.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td>Floating</td>
                      <td>
                        {venue.floatingCapacity >= 1000
                          ? `${venue.floatingCapacity.toLocaleString('en-IN')}+`
                          : venue.floatingCapacity}
                      </td>
                    </tr>
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
