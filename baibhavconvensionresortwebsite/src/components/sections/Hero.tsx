import Link from 'next/link';
import styles from '@/styles/Hero.module.scss';
import SearchWidget from './SearchWidget';

const HERO_IMAGE = '/images/banner-baibhav-1.avif';

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        role="img"
        aria-label="Grand banquet hall and lawns at Baibhab Resorts"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>Baibhab Resorts & Conventions</span>
        <h1 className={styles.title}>Where Grand Celebrations Meet Effortless Comfort</h1>
        <p className={styles.subtitle}>
          Premium banquet venues, sprawling open-air lawns, and modern accommodations strategically located on
          the Bhubaneswar Cuttack corridor.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/stay" className="btn btn-light">
            Check Room Availability
          </Link>
          <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-ghost-light">
            Plan Your Event
          </Link>
        </div>
      </div>
      <div className={styles.searchAnchor}>
        <div className={styles.searchWidgetWrapper}>
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}
