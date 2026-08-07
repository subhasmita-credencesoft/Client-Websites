import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/RoomCard.module.scss';
import { RoomCategory } from '@/types';

export default function RoomCard({ room }: { room: RoomCategory }) {
  return (
    <article className={styles.card} data-reveal data-reveal-stagger>
      <div className={styles.imageWrap}>
        <Image
          src={room.image}
          alt={room.name}
          className={styles.image}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.body}>
        <p className={styles.name}>{room.name}</p>
        <p className={styles.subtitle}>{room.subtitle}</p>
        <div className={styles.specs}>
          <span>{room.beds}</span>
          <span>&middot;</span>
          <span>{room.size}</span>
          <span>&middot;</span>
          <span>{room.capacity}</span>
        </div>
        <div className={styles.footer}>
          <div>
            <span className={styles.price}>&#8377;{room.price.toLocaleString('en-IN')}</span>
            <span className={styles.priceUnit}>{room.priceUnit}</span>
          </div>
        </div>
        <div className={styles.actions}>
          {room.ctaHref.startsWith('http') ? (
            <a href={room.ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {room.ctaLabel}
            </a>
          ) : (
            <Link href={room.ctaHref} className="btn btn-primary">
              {room.ctaLabel}
            </Link>
          )}
          <Link href={`/stay/${room.slug}`} className="btn btn-outline">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
