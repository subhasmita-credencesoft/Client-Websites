import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/VenueCard.module.scss';
import { Venue } from '@/types';

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Link href={`/events/venues#${venue.slug}`} className={styles.card} data-reveal>
      <div className={styles.imageWrap}>
        <Image
          src={venue.image}
          alt={venue.name}
          className={styles.image}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className={styles.tag}>{venue.venueType}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.name}>{venue.name}</p>
        <div className={styles.capacity}>
          <div>
            <span className={styles.capacityValue}>{venue.seatedCapacity}</span>
            <span className={styles.capacityLabel}>Seated</span>
          </div>
          <div>
            <span className={styles.capacityValue}>
              {venue.floatingCapacity >= 1000 ? `${venue.floatingCapacity.toLocaleString('en-IN')}+` : venue.floatingCapacity}
            </span>
            <span className={styles.capacityLabel}>Floating</span>
          </div>
        </div>
        <p className={styles.idealFor}>{venue.idealFor}</p>
      </div>
    </Link>
  );
}
