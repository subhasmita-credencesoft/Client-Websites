import styles from '@/styles/HomeSections.module.scss';
import SectionLabel from '@/components/ui/SectionLabel';

const HIGHLIGHTS = [
  {
    index: '01',
    icon: 'solar:map-point-wave-bold',
    title: 'Strategic Location',
    description: 'Located at Phulnakhara  seamlessly connecting Bhubaneswar & Cuttack.',
    image: '/newedit/Entrance Pathway.avif',
  },
  {
    index: '02',
    icon: 'solar:users-group-rounded-bold',
    title: 'Large Event Capacity',
    description: 'Multiple indoor banquets & manicured lawns for gatherings of all sizes.',
    image: '/wedding/entrance.jpeg',
  },
  {
    index: '03',
    icon: 'solar:chef-hat-bold',
    title: 'Seamless Catering',
    description: 'In-house culinary teams serving authentic Odia, Indian, and international cuisines.',
    image: '/newedit/Minimal Hotel Refreshment Station.avif',
  },
  {
    index: '04',
    icon: 'solar:parking-square-bold',
    title: 'Hassle-Free Parking',
    description: 'Dedicated parking space for over 200+ vehicles with valet capability.',
    image: '/newedit/gate front.avif',
  },
];

export default function Highlights() {
  return (
    <section className={styles.highlights} aria-labelledby="highlights-heading">
      <div className="container">
        <div className={styles.highlightsHeader} data-reveal>
          <SectionLabel eyebrow="Why Baibhab" title="Key highlights" />
        </div>
        <div className={styles.highlightsGrid}>
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className={styles.highlightCard} data-reveal data-reveal-stagger>
              <div
                className={styles.highlightImage}
                style={{ backgroundImage: `url('${item.image}')` }}
                role="img"
                aria-label={item.title}
              />
              <div className={styles.highlightOverlay} aria-hidden="true" />
              <span className={styles.highlightIndex}>{item.index}</span>
              <div className={styles.highlightContent}>
                <iconify-icon icon={item.icon} width="24" aria-hidden="true" />
                <p className={styles.highlightTitle}>{item.title}</p>
                <p className={styles.highlightText}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
