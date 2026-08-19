import Image from 'next/image';
import Link from 'next/link';
import type { Room } from '@/types';
import { Button } from '@/components/ui/Button';
import styles from './RoomCard.module.scss';

interface Props {
  room: Room;
}

export function RoomCard({ room }: Props) {
  const detailHref = room.hasDetailPage ? `/rooms/${room.slug}` : undefined;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={room.image}
          alt={`${room.name} at Hotel K2`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className={styles.image}
        />
        {room.price !== undefined && (
          <div className={styles.priceTag}>
            <span className={styles.priceCurrency}>{room.currency ?? 'INR'}</span>
            <span className={styles.priceValue}>{room.price.toLocaleString('en-IN')}</span>
            <span className={styles.priceUnit}>/night</span>
          </div>
        )}
        {room.availableRooms !== undefined && room.availableRooms > 0 && (
          <div className={styles.availability}>
            {room.availableRooms} rooms available
          </div>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>
          {detailHref ? <Link href={detailHref}>{room.name}</Link> : room.name}
        </h3>
        <p className={styles.summary}>{room.summary}</p>

        <ul className={styles.amenities}>
          {room.amenities.map((amenity, index) => (
            <li key={`${amenity.label}-${index}`} className={styles.amenity}>
              {amenity.icon && (
                <Image
                  src={amenity.icon}
                  alt=""
                  width={30}
                  height={30}
                  className={styles.amenityIcon}
                />
              )}
              {amenity.label}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button href={room.bookingUrl} variant="secondary" className={styles.roomBtn}>
            Book Now
          </Button>
          <Button href={detailHref ?? room.bookingUrl} variant="secondary" className={styles.roomBtn}>
            View More
          </Button>
        </div>
      </div>
    </article>
  );
}
