import Link from 'next/link';
import styles from '@/styles/HomeSections.module.scss';
import SectionLabel from '@/components/ui/SectionLabel';
import { Venue } from '@/types';

function formatCapacity(value: number): string {
  return value >= 1000 ? `${value.toLocaleString('en-IN')}+` : value.toLocaleString('en-IN');
}

export default function VenueCapacity({ venues }: { venues: Venue[] }) {
  return (
    <section className={styles.venueSection} aria-labelledby="venue-capacity-heading">
      <div className="container">
        <div className={styles.venueHeader} data-reveal>
          <SectionLabel eyebrow="At a glance" title="Venue capacity overview" />
        </div>
        <div className={styles.venueGrid}>
          {venues.map((venue) => (
            <article
              key={venue.id}
              className={styles.venueCard}
              data-reveal
              data-reveal-stagger
            >
              <div className={styles.venueCardMedia}>
                <div
                  className={styles.venueCardImage}
                  role="img"
                  aria-label={venue.name}
                  style={{ backgroundImage: `url('${venue.image}')` }}
                />
                <div className={styles.venueCardOverlay} />
              </div>
              <div className={styles.venueCardBody}>
                <div className={styles.venueCardTop}>
                  <span className={styles.venueTypeChip}>{venue.venueType}</span>
                  <span className={styles.venueAreaChip}>{venue.area}</span>
                </div>
                <h3 className={styles.venueCardTitle}>{venue.name}</h3>
                <p className={styles.venueCardIdeal}>{venue.idealFor}</p>
                <div className={styles.venueCardStats}>
                  <div className={styles.venueStat}>
                    <span className={styles.venueStatValue}>
                      {formatCapacity(venue.seatedCapacity)}
                    </span>
                    <span className={styles.venueStatLabel}>Seated</span>
                  </div>
                  <div className={styles.venueStat}>
                    <span className={styles.venueStatValue}>
                      {formatCapacity(venue.floatingCapacity)}
                    </span>
                    <span className={styles.venueStatLabel}>Floating</span>
                  </div>
                  <Link href={`/events/venues#${venue.slug}`} className={styles.venueCardLink}>
                    View space
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
