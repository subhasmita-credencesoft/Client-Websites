import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import styles from '@/styles/AmenitiesPage.module.scss';
import { FACILITIES } from '@/data/facilities';
import { Facility } from '@/types';

interface AmenitiesPageProps {
  facilities: Facility[];
}

const AmenitiesPage: NextPage<AmenitiesPageProps> = ({ facilities }) => {
  return (
    <>
      <Seo
        title="Resort & Amenities"
        description="Parking for 200+ vehicles, full power backup, 24/7 security, swimming pool, driver rest areas, high-speed Wi-Fi and in-house catering at Baibhab Resorts & Conventions."
        path="/amenities"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Amenities' },
        ]}
        eyebrow="Resort & Amenities"
        title="Everything Your Stay and Event Needs"
        subtitle="Thoughtfully planned facilities that make gatherings of any size feel effortless."
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.grid}>
          {facilities.map((facility) => (
            <div key={facility.title} className={styles.card} data-reveal data-reveal-stagger>
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${facility.image})` }}
                role="img"
                aria-label={facility.title}
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
      </div>
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
