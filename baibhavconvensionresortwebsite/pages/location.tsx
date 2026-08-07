import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import styles from '@/styles/LocationPage.module.scss';
import { DISTANCES, ATTRACTIONS, GETTING_HERE, WHY_LOCATION } from '@/data/location';
import { SITE } from '@/data/site';
import { Attraction, Distance } from '@/types';

interface LocationPageProps {
  distances: Distance[];
  attractions: Attraction[];
}

const MAP_EMBED = 'https://www.google.com/maps?q=Phulnakhara%20Cuttack%20Bhubaneswar%20NH16&output=embed';

const LocationPage: NextPage<LocationPageProps> = ({ distances, attractions }) => {
  return (
    <>
      <Seo
        title="Location & Local Guide  The Perfect Midpoint: Phulnakhara"
        description="Baibhab Resorts on NH-16 at Phulnakhara  minutes from Bhubaneswar and Cuttack, Nandankanan, and Puri/Konark connectivity. See distances, directions and attractions."
        path="/location"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Location & Local Guide' },
        ]}
        eyebrow="Location & Local Guide"
        title="The Perfect Midpoint: Phulnakhara"
        subtitle="Situated right on the NH-16 highway  effortless access from both Bhubaneswar and Cuttack."
      />

      <div className="container" style={{ marginTop: 48 }}>
        <div className={styles.mapWrap} data-reveal>
          <iframe
            title="Map Baibhab Resorts & Conventions, Phulnakhara"
            src={MAP_EMBED}
            className={styles.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className={styles.address}>{SITE.address}</p>
      </div>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Getting here</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            {GETTING_HERE.title}
          </h2>
          <p className={styles.text}>{GETTING_HERE.intro}</p>
          <div className={styles.steps}>
            {GETTING_HERE.steps.map((step, index) => (
              <div key={step.title} className={styles.step} data-reveal data-reveal-stagger>
                <span className={styles.stepNumber}>{index + 1}</span>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepText}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Distances</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            Transit hubs at a glance
          </h2>
          <div className={styles.tableWrap} data-reveal>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Distance</th>
                  <th>Driving Time</th>
                </tr>
              </thead>
              <tbody>
                {distances.map((item) => (
                  <tr key={item.destination}>
                    <td>{item.destination}</td>
                    <td>{item.distance}</td>
                    <td>{item.drivingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Why our location matters</p>
          <div className={styles.whyGrid}>
            {WHY_LOCATION.map((item) => (
              <div key={item.title} className={styles.whyCard} data-reveal data-reveal-stagger>
                <p className={styles.whyTitle}>{item.title}</p>
                <p className={styles.text}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Nearby attractions</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            What to explore around Phulnakhara
          </h2>
          <div className={styles.attractionGrid}>
            {attractions.map((attraction) => (
              <div key={attraction.name} className={styles.attractionCard} data-reveal data-reveal-stagger>
                <p className={styles.attractionTitle}>{attraction.name}</p>
                <p className={styles.attractionMeta}>
                  {attraction.distance} &middot; {attraction.drivingTime}
                </p>
                <p className={styles.attractionText}>{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<LocationPageProps> = async () => {
  return {
    props: {
      distances: DISTANCES,
      attractions: ATTRACTIONS,
    },
  };
};

export default LocationPage;
