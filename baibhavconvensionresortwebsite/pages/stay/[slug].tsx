import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGallery from '@/components/sections/ProductGallery';
import styles from '@/styles/StayPage.module.scss';
import { getRoomBySlug, ROOMS } from '@/data/rooms';
import { fetchRoomsFromApi } from '@/lib/hotelmate';
import { SITE } from '@/data/site';
import { RoomCategory } from '@/types';

interface RoomPageProps {
  room: RoomCategory;
}

const RoomPage: NextPage<RoomPageProps> = ({ room }) => {
  const jsonLd = {
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
    },
  };

  return (
    <>
      <Seo
        title={`${room.name} — ${room.subtitle}`}
        description={room.overview}
        path={`/stay/${room.slug}`}
        image={room.image}
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
        <div className={styles.roomMain}>
          <div className={styles.roomHeader}>
            <h1 className={styles.roomTitle}>{room.name}</h1>
            <p className={styles.roomSubtitle}>{room.subtitle}</p>
          </div>

          <div className={styles.roomSection}>
            <h2 className={styles.roomSectionTitle}>Overview</h2>
            <p className={styles.roomText}>{room.overview}</p>
          </div>

          <div className={styles.specStrip}>
            <div>
              <span className={styles.specLabel}>Bed</span>
              <span className={styles.specValue}>{room.beds}</span>
            </div>
            <div>
              <span className={styles.specLabel}>Size</span>
              <span className={styles.specValue}>{room.size}</span>
            </div>
            <div>
              <span className={styles.specLabel}>Capacity</span>
              <span className={styles.specValue}>{room.capacity}</span>
            </div>
          </div>

          <div className={styles.roomSection}>
            <h2 className={styles.roomSectionTitle}>In-room amenities</h2>
            <div className={styles.checklist}>
              {room.amenities.map((amenity) => (
                <div key={amenity} className={styles.checkItem}>
                  <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.roomSection}>
            <h2 className={styles.roomSectionTitle}>Guest perks</h2>
            <ul className={styles.perks}>
              {room.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <p className={styles.roomText}>
              <strong>Ideal for:</strong> {room.idealFor}
            </p>
          </div>
        </div>

        <aside className={styles.roomSidebar} aria-label="Booking">
          <div className={styles.priceRow}>
            <span className={styles.price}>&#8377;{room.price.toLocaleString('en-IN')}</span>
            <span className={styles.priceUnit}>{room.priceUnit}</span>
          </div>
          <p className={styles.sidebarNote}>Breakfast & Wi-Fi included. Taxes extra.</p>
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
          <p className={styles.sidebarNote}>You won&apos;t be charged yet — availability confirmed first.</p>
        </aside>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const rooms = (await fetchRoomsFromApi()) ?? ROOMS;
  return {
    paths: rooms.map((room) => ({ params: { slug: room.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<RoomPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;
  const rooms = (await fetchRoomsFromApi()) ?? ROOMS;
  const room = slug ? rooms.find((r) => r.slug === slug) ?? getRoomBySlug(slug) : undefined;

  if (!room) {
    return { notFound: true };
  }

  return { props: { room } };
};

export default RoomPage;

export const ALL_ROOM_SLUGS = ROOMS.map((r) => r.slug);
