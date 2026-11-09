import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGallery from '@/components/sections/ProductGallery';
import FaqSection from '@/components/sections/FaqSection';
import { STAY_FAQS } from '@/data/faqs';
import styles from '@/styles/StayPage.module.scss';
import { getRoomBySlug, ROOMS } from '@/data/rooms';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { RoomCategory } from '@/types';

interface RoomPageProps {
  room: RoomCategory;
}

const RoomPage: NextPage<RoomPageProps> = ({ room }) => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Stay', url: '/stay' },
      { name: room.name, url: `/stay/${room.slug}` },
    ]),
    createFaqSchema(STAY_FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'HotelRoom',
      name: room.name,
      description: room.overview,
      image: room.gallery.map((g) => g.src),
      url: `${SITE.domain}/stay/${room.slug}`,
      bed: { '@type': 'BedDetails', typeOfBed: room.beds },
      occupancy: { '@type': 'QuantitativeValue', value: 2, maxValue: 4 },
      amenityFeature: room.amenities.map((amenity) => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity,
        value: true,
      })),
      offers: {
        '@type': 'Offer',
        price: room.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: room.ctaHref,
      },
    },
  ];

  return (
    <>
      <Seo
        title={`${room.name} — Phulnakhara, Bhubaneswar`}
        description={room.overview}
        path={`/stay/${room.slug}`}
        keywords={`${room.name} Phulnakhara, ${room.name} Bhubaneswar, resort room near SUM hospital, hotel room booking NH-16, stay near cuttack bhubaneswar highway`}
        image={room.image}
        imageAlt={`${room.name} with ${room.beds} at Baibhab Resorts & Conventions, Bhubaneswar–Cuttack, Odisha`}
        type="product"
        jsonLd={jsonLd}
      />

      <div className="container" style={{ paddingTop: 96, paddingBottom: 24 }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Stay', href: '/stay' },
            { label: room.name },
          ]}
        />
      </div>

      <div className="container">
        <ProductGallery images={room.gallery} totalCount={room.gallery.length} />
      </div>

      <div className={styles.roomLayout} data-reveal>
        <div className={styles.roomContent}>
          <div className={styles.header}>
            <p className="caption">Accommodation</p>
            <h1 className="h2" style={{ marginTop: 8 }}>
              {room.name}
            </h1>
            <p className={styles.subtitle}>{room.subtitle}</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Beds</span>
              <span className={styles.statValue}>{room.beds}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Inventory</span>
              <span className={styles.statValue}>{room.size}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Capacity</span>
              <span className={styles.statValue}>{room.capacity}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Ideal For</span>
              <span className={styles.statValue}>{room.idealFor}</span>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className="h3">Overview</h2>
            <p className={styles.text}>{room.overview}</p>
          </div>

          <div className={styles.block}>
            <h2 className="h3">Room Amenities</h2>
            <ul className={styles.amenitiesGrid}>
              {room.amenities.map((amenity) => (
                <li key={amenity}>
                  <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          {room.perks && room.perks.length > 0 && (
            <div className={styles.block}>
              <h2 className="h3">Included Perks</h2>
              <ul className={styles.amenitiesGrid}>
                {room.perks.map((perk) => (
                  <li key={perk}>
                    <iconify-icon icon="solar:star-bold" className={styles.checkIcon} aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cross Links to Dining and Events */}
          <div className={styles.block} style={{
            backgroundColor: '#ffffff',
            padding: '28px 24px',
            borderRadius: '16px',
            border: '1px solid #e7e7e7',
            marginTop: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#111111', marginBottom: '8px' }}>
              Explore More at Baibhab Resorts
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' , lineHeight: 1.6 }}>
              Make the most of your stay with our on-site amenities, dining, and event facilities.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/dining" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                Fusion Bites Restaurant
              </Link>
              <Link href="/location" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                Local Attractions Guide
              </Link>
              <Link href="/stay" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                View All Room Categories
              </Link>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.priceRow}>
            <span className={styles.price}>&#8377;{room.price.toLocaleString('en-IN')}</span>
            <span className={styles.priceUnit}>{room.priceUnit}</span>
          </div>
          <p className={styles.sidebarNote}>Free Wi-Fi and parking included. Taxes extra.</p>
          <a
            href={room.ctaHref}
            className="btn btn-primary btn-block"
            {...(room.ctaHref.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {room.ctaLabel}
          </a>
          <a href={`tel:+${SITE.phoneReservationsRaw}`} className="btn btn-outline btn-block">
            <iconify-icon icon="solar:phone-calling-rounded-bold" aria-hidden="true" />
            Call {SITE.phoneReservations}
          </a>
          <p className={styles.sidebarNote}>Instant confirmation via BookOne reservation engine.</p>
        </aside>
      </div>

      <FaqSection
        items={STAY_FAQS}
        eyebrow="Guest FAQs"
        title="Stay Questions, Answered"
        subtitle={`Booking, check-in and amenity questions for your ${room.name} stay.`}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ROOMS.map((room) => ({ params: { slug: room.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<RoomPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;
  const room = slug ? getRoomBySlug(slug) : undefined;

  if (!room) {
    return { notFound: true };
  }

  return { props: { room } };
};

export default RoomPage;
