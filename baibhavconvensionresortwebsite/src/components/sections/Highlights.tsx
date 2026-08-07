import styles from '@/styles/HomeSections.module.scss';
import SectionLabel from '@/components/ui/SectionLabel';

const HIGHLIGHTS = [
  {
    icon: 'solar:map-point-wave-bold',
    title: 'Strategic Location',
    description: 'Located at Phulnakhara  seamlessly connecting Bhubaneswar & Cuttack.',
    image:
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    icon: 'solar:users-group-rounded-bold',
    title: 'Large Event Capacity',
    description: 'Multiple indoor banquets & manicured lawns for gatherings of all sizes.',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    icon: 'solar:chef-hat-bold',
    title: 'Seamless Catering',
    description: 'In-house culinary teams serving authentic Odia, Indian, and international cuisines.',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    icon: 'solar:parking-square-bold',
    title: 'Hassle-Free Parking',
    description: 'Dedicated parking space for over 200+ vehicles with valet capability.',
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
                style={{ backgroundImage: `url(${item.image})` }}
                role="img"
                aria-label={item.title}
              />
              <div className={styles.highlightOverlay} aria-hidden="true" />
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
