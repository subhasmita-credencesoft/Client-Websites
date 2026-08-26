import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/LocationPage.module.scss';
import { LOCATION_FAQS } from '@/data/faqs';
import { DISTANCES, ATTRACTIONS, GETTING_HERE, WHY_LOCATION, NEARBY_LANDMARKS } from '@/data/location';
import { SITE } from '@/data/site';
import { Attraction, Distance } from '@/types';

interface LocationPageProps {
  distances: Distance[];
  attractions: Attraction[];
}

const MAP_EMBED = 'https://www.google.com/maps?q=Phulnakhara%20Cuttack%20Bhubaneswar%20NH16&output=embed';
const DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=Phulnakhara%20Cuttack%20Bhubaneswar%20NH16';

const WHY_IMAGES = ['/nocitytrafic.png', '/cuttackhighway.png'];
const WHY_ICONS = ['solar:car-bold', 'solar:bus-bold'];

const ATTRACTION_IMAGES = [
  '/nandankanan.png',
  '/barabatistadium.png',
  '/oceanpark.png',
  '/statemuseumcuttack.png',
  '/images/cuttackchandimandir.png',
  '/locallandmark.png',
  '/bhubaneswarheritage.png',
];
const ATTRACTION_ICONS = [
  'solar:tree-bold',
  'solar:stadium-bold',
  'solar:water-sun-bold',
  'solar:leaf-bold',
  'solar:chair-bold',
  'solar:building-2-bold',
  'solar:city-bold',
];

const LocationPage: NextPage<LocationPageProps> = ({ distances, attractions }) => {
  return (
    <>
      <Seo
        title="Phulnakhara Location & Directions"
        description="Baibhab Resorts on NH-16 at Phulnakhara, minutes from Bhubaneswar and Cuttack — with distances, directions and nearby attractions."
        path="/location"
      />
      <InnerHero
        image="/newedit/Gate new Design.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Location & Local Guide' },
        ]}
        eyebrow="Location & Local Guide"
        title="The Perfect Midpoint: Phulnakhara"
        subtitle="Situated right on the NH-16 highway — effortless access from both Bhubaneswar and Cuttack."
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
        <div className={styles.mapFooter} data-reveal>
          <span className={styles.addressBlock}>
            <iconify-icon icon="solar:map-point-bold" width="18" aria-hidden="true" />
            <span>{SITE.address}</span>
          </span>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Get Directions
          </a>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Getting here</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            {GETTING_HERE.title}
          </h2>
          <p className={styles.lead}>{GETTING_HERE.intro}</p>
          <div className={styles.imageGrid}>
            {GETTING_HERE.steps.map((step, index) => (
              <div key={step.title} className={styles.card} data-reveal data-reveal-stagger>
                <div className={styles.media}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url('${step.image}')` }}
                    role="img"
                    aria-label={`Driving direction to Baibhab Resorts — ${step.title}`}
                  />
                  <div className={styles.overlay} />
                </div>
                <span className={styles.indexChip}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.text}>{step.description}</p>
                </div>
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
          <div className={styles.split}>
            <div className={styles.splitMedia} data-reveal>
              <div
                className={styles.splitImage}
                style={{ backgroundImage: `url('/newedit/Elegant Nighttime Property Showcase.avif')` }}
                role="img"
                aria-label="Elegant nighttime showcase of the Baibhab Resorts property"
              />
              <p className={styles.splitCaption}>Elegant Nighttime Property Showcase</p>
            </div>
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
                      <td className={styles.tableName}>{item.destination}</td>
                      <td>{item.distance}</td>
                      <td>{item.drivingTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Why our location matters</p>
          <div className={styles.whyGrid}>
            {WHY_LOCATION.map((item, index) => (
              <div key={item.title} className={styles.card} data-reveal data-reveal-stagger>
                <div className={styles.media}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url('${WHY_IMAGES[index]}')` }}
                    role="img"
                    aria-label={`Baibhab Resorts location advantage — ${item.title}`}
                  />
                  <div className={styles.overlay} />
                </div>
                <span className={styles.iconChip}>
                  <iconify-icon icon={WHY_ICONS[index]} width="22" aria-hidden="true" />
                </span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.text}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Nearby landmarks</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            Hotels, Hospitals, Schools & Heritage Sites Around Phulnakhara
          </h2>
          <p className={styles.lead}>
            A stay at Baibhab Resorts puts you minutes from SUM Hospital, DPS Kalinga, EAST,
            cuttackchandimandir temples, and the NH-16 corridor — ideal for patient visits, open days, weddings and corporate travel.
          </p>
          <div className={styles.landmarkGrid}>
            {NEARBY_LANDMARKS.map((cluster) => (
              <div key={cluster.id} className={styles.landmarkCard} data-reveal data-reveal-stagger>
                <div className={styles.landmarkHeader}>
                  <span className={styles.landmarkIcon}>
                    <iconify-icon icon={cluster.icon} width="22" aria-hidden="true" />
                  </span>
                  <h3 className={styles.landmarkTitle}>{cluster.title}</h3>
                </div>
                <p className={styles.landmarkText}>{cluster.description}</p>
                <ul className={styles.landmarkList}>
                  {cluster.landmarks.map((landmark) => (
                    <li key={landmark.name} className={styles.landmarkItem}>
                      <span className={styles.landmarkName}>{landmark.name}</span>
                      <span className={styles.landmarkMeta}>
                        {landmark.distance} · {landmark.drivingTime}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.landmarkNote}>
            Distances are approximate by road from Phulnakhara and vary with traffic.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="caption">Nearby attractions</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            What to explore around Phulnakhara
          </h2>
          <p className={styles.lead}>
            From water parks and botanical gardens to ancient temples and historic landmarks — discover the best of Odisha from our central location.
          </p>
          <div className={styles.attractionGrid}>
            {attractions.map((attraction, index) => (
              <div key={attraction.name} className={styles.card} data-reveal data-reveal-stagger>
                <div className={styles.media}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url('${ATTRACTION_IMAGES[index]}')` }}
                    role="img"
                    aria-label={`Baibhab Resorts nearby attraction — ${attraction.name}`}
                  />
                  <div className={styles.overlay} />
                </div>
                <span className={styles.attractionTop}>
                  <span className={styles.iconChipSmall}>
                    <iconify-icon icon={ATTRACTION_ICONS[index]} width="18" aria-hidden="true" />
                  </span>
                  <span className={styles.attractionChip}>
                    {attraction.distance} &middot; {attraction.drivingTime}
                  </span>
                </span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{attraction.name}</h3>
                  <p className={styles.text}>{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        items={LOCATION_FAQS}
        eyebrow="Location FAQs"
        title="Getting Here Questions"
        subtitle="Distances from Bhubaneswar, Cuttack and the airport, plus nearby attractions."
      />
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
