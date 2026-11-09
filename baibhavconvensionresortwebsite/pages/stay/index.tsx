import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import RoomCard from '@/components/ui/RoomCard';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/StayPage.module.scss';
import { STAY_FAQS } from '@/data/faqs';
import { ROOMS } from '@/data/rooms';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { RoomCategory } from '@/types';

interface StayPageProps {
  rooms: RoomCategory[];
}

const StayPage: NextPage<StayPageProps> = ({ rooms }) => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Stay & Rooms', url: '/stay' },
    ]),
    createFaqSchema(STAY_FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Rooms & Accommodations at Baibhab Resorts & Conventions',
      itemListElement: rooms.map((room, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'HotelRoom',
          name: room.name,
          description: room.overview,
          url: `${SITE.domain}/stay/${room.slug}`,
          image: room.image,
          bed: { '@type': 'BedDetails', typeOfBed: room.beds },
          offers: {
            '@type': 'Offer',
            price: room.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: room.ctaHref,
          },
        },
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Rooms & Accommodations in Phulnakhara — Bhubaneswar"
        description="Book Premium and Deluxe Rooms at Phulnakhara on NH-16 between Bhubaneswar and Cuttack. Complimentary Wi-Fi, air conditioning, free parking, and 24/7 room service."
        path="/stay"
        keywords="hotel in phulnakhara, rooms near sum hospital phulnakhara, hotel bhubaneswar cuttack highway, resort stay nakhara, luxury room booking bhubaneswar"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/newedit/Luxury room.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Stay' },
        ]}
        eyebrow="Stay & Accommodations"
        title="Restful Stay Between Twin Cities"
        subtitle="Designed for business travelers, wedding guests, and families seeking comfort and convenience on the NH-16 corridor."
      />

      <div className="container" style={{ marginTop: 48 }}>
        <div className={styles.grid} data-reveal-stagger>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      {/* Contextual Internal Linking */}
      <section className="container" style={{ marginTop: 64, marginBottom: 32 }}>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e7e7e7',
          borderRadius: 16,
          padding: '40px 32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: '#111111', fontWeight: 500 }}>Hosting a Wedding or Event?</h3>
            <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: 16 }}>
              Reserve room blocks alongside our grand banquet halls and open lawns for your wedding entourage.
            </p>
            <Link href="/events/weddings" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
              Explore Wedding Venues
            </Link>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: '#111111', fontWeight: 500 }}>In-House Dining & Room Service</h3>
            <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: 16 }}>
              Enjoy authentic Odia thalis, coastal seafood, and multi-cuisine favorites at Fusion Bites.
            </p>
            <Link href="/dining" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
              View Restaurant & Dining
            </Link>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: '#111111', fontWeight: 500 }}>Strategic Highway Location</h3>
            <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: 16 }}>
              Situated 1 km from SUM Hospital 2 and 15–18 km from Bhubaneswar & Cuttack railway stations.
            </p>
            <Link href="/location" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
              See Directions & Distances
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        items={STAY_FAQS}
        eyebrow="Guest FAQs"
        title="Stay Questions, Answered"
        subtitle="Everything you need to know before checking in at Baibhab Resorts & Conventions."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<StayPageProps> = async () => {
  return {
    props: {
      rooms: ROOMS,
    },
  };
};

export default StayPage;
