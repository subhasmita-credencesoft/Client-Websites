import Link from 'next/link';
import styles from '@/styles/HomeSections.module.scss';

const PATHS = [
  {
    icon: 'solar:confetti-minimalistic-bold',
    title: 'Host Unforgettable Events',
    description:
      'From lavish weddings to high-impact corporate conferences, our state-of-the-art banquet halls and outdoor lawns accommodate up to 1,500+ guests with custom catering, ample parking, and full event support.',
    cta: 'Explore Event Venues',
    href: '/events',
    image: '/images/wedding.jpg',
  },
  {
    icon: 'solar:bed-bold',
    title: 'Stay & Relax',
    description:
      'Enjoy well-appointed rooms, high-speed Wi-Fi, in-house dining, and warm Odia hospitality perfect for business travelers, wedding attendees, and weekend getaways.',
    cta: 'View Accommodations',
    href: '/stay',
    image: '/newedit/Luxury room.avif',
  },
];

export default function DualPath() {
  return (
    <section className={styles.dualPath} aria-label="What we offer">
      <div className="container">
        <div className={styles.dualGrid}>
          {PATHS.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className={styles.dualCard}
              data-reveal
              data-reveal-stagger
            >
              <div
                className={styles.dualMedia}
                style={{ backgroundImage: `url('${path.image}')` }}
                role="img"
                aria-label={path.title}
              />
              <div className={styles.dualOverlay} aria-hidden="true" />
              <div className={styles.dualShine} aria-hidden="true" />
              <div className={styles.dualBody}>
                <span className={styles.dualIcon}>
                  <iconify-icon icon={path.icon} width="22" aria-hidden="true" />
                </span>
                <h2 className={styles.dualTitle}>{path.title}</h2>
                <p className={styles.dualText}>{path.description}</p>
                <span className={styles.dualCta}>
                  {path.cta}
                  <iconify-icon icon="solar:arrow-right-linear" width="16" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
