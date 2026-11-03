import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/AmenitiesPage.module.scss';
import { AMENITIES_FAQS } from '@/data/faqs';
import { FACILITIES } from '@/data/facilities';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { Facility } from '@/types';

interface AmenitiesPageProps {
  facilities: Facility[];
}

const AmenitiesPage: NextPage<AmenitiesPageProps> = ({ facilities }) => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Amenities', url: '/amenities' },
    ]),
    createFaqSchema(AMENITIES_FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      name: SITE.name,
      url: `${SITE.domain}/amenities`,
      amenityFeature: facilities.map((facility) => ({
        '@type': 'LocationFeatureSpecification',
        name: facility.title,
        value: true,
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Resort Amenities — Free Parking, Wi-Fi & Power Backup"
        description="Explore resort facilities at Baibhab Resorts on NH-16: parking for 200+ vehicles, full generator power backup, 24/7 security, driver rest areas, high-speed Wi-Fi, and elevator access."
        path="/amenities"
        keywords="resort amenities phulnakhara, hotel with free parking bhubaneswar, power backup resort odisha, banquet hall with driver rest area, wi-fi hotel nh16"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/newedit/Waiting area 2.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Amenities' },
        ]}
        eyebrow="Resort & Amenities"
        title="Everything Your Stay and Event Needs"
        subtitle="Thoughtfully planned facilities that make gatherings of any size feel effortless on the Bhubaneswar–Cuttack corridor."
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.grid}>
          {facilities.map((facility) => (
            <div key={facility.title} className={styles.card} data-reveal data-reveal-stagger>
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url('${facility.image}')` }}
                role="img"
                aria-label={`Baibhab Resorts facility — ${facility.title}`}
              />
              <div className={styles.cardOverlay} aria-hidden="true" />
              <div className={styles.cardBody}>
                <iconify-icon icon={facility.icon} width="24" aria-hidden="true" />
                <p className={styles.cardTitle}>{facility.title}</p>
                <p className={styles.cardText}>{facility.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-linking Action Banner */}
        <div style={{
          marginTop: 56,
          backgroundColor: '#161616',
          border: '1px solid #282828',
          borderRadius: 16,
          padding: '32px',
          textAlign: 'center',
        }} data-reveal>
          <h2 style={{ fontSize: '1.5rem', color: '#f5f5f5', marginBottom: 12 }}>
            Experience Comfort & Hospitality Firsthand
          </h2>
          <p style={{ color: '#a3a3a3', maxWidth: 600, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Book a relaxing room for your family or enquire about our banquet facilities for your upcoming wedding or conference.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/stay" className="btn btn-primary">
              View Rooms & Rates
            </Link>
            <Link href="/events/venues" className="btn btn-outline">
              Explore Event Venues
            </Link>
          </div>
        </div>
      </div>

      <FaqSection
        items={AMENITIES_FAQS}
        eyebrow="Amenities FAQs"
        title="Facilities Questions"
        subtitle="Parking, power backup, security and Wi-Fi — everything you need for a comfortable stay."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<AmenitiesPageProps> = async () => {
  return {
    props: {
      facilities: FACILITIES,
    },
  };
};

export default AmenitiesPage;
