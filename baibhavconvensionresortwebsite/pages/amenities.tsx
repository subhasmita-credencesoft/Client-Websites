import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/AmenitiesPage.module.scss';
import { AMENITIES_FAQS } from '@/data/faqs';
import { FACILITIES } from '@/data/facilities';
import { Facility } from '@/types';

interface AmenitiesPageProps {
  facilities: Facility[];
}

const AmenitiesPage: NextPage<AmenitiesPageProps> = ({ facilities }) => {
  return (
    <>
      <Seo
        title="Amenities — Parking,  & i-Fi"
        description="Free parking for 200+ vehicles, full power backup, 24/7 security, driver rest areas and high-speed Wi-Fi at Baibhab Resorts."
        path="/amenities"
      />
      <InnerHero
        image="/newedit/Waiting area 2.avif"
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
                style={{ backgroundImage: `url('${facility.image}')` }}
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
