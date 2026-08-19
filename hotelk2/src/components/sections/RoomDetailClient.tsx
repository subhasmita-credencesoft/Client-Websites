'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRoom } from '@/lib/hooks';
import { Button } from '@/components/ui/Button';
import styles from './RoomDetailClient.module.scss';

interface Props {
  slug: string;
}

export function RoomDetailClient({ slug }: Props) {
  const { room, loading, error } = useRoom(slug);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.description}>Loading room details...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Room Not Found</h1>
          <p className={styles.description}>
            The room you are looking for does not exist or may have moved.
          </p>
          <div className={styles.actions}>
            <Link href="/#rooms">Back to Rooms</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.page}>
      <div className={styles.hero}>
        <Image
          src={room.image}
          alt={`${room.name} at Hotel K2`}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.breadcrumb}>
            <Link href="/">Home</Link> / <Link href="/#rooms">Rooms</Link> / {room.name}
          </p>
          <h1 className={styles.heading}>{room.name}</h1>
          <p className={styles.occupancy}>{room.occupancy}</p>
          {room.price !== undefined && (
            <p className={styles.heroPrice}>
              <span className={styles.heroPriceCurrency}>{room.currency ?? 'INR'}</span>
              <span className={styles.heroPriceValue}>{room.price.toLocaleString('en-IN')}</span>
              <span className={styles.heroPriceUnit}>/night</span>
            </p>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div className={styles.main}>
            <h2 className={styles.sectionHeading}>About this room</h2>
            <p className={styles.description}>{room.description}</p>

            <h2 className={styles.sectionHeading}>Amenities</h2>
            <ul className={styles.amenityList}>
              {room.amenities.map((amenity, index) => (
                <li key={`${amenity.label}-${index}`} className={styles.amenityItem}>
                  {amenity.icon && (
                    <Image src={amenity.icon} alt="" width={18} height={18} className={styles.amenityIcon} />
                  )}
                  {amenity.label}
                </li>
              ))}
            </ul>

            {room.gallery.length > 0 && (
              <>
                <h2 className={styles.sectionHeading}>Gallery</h2>
                <div className={styles.gallery}>
                  {room.gallery.map((src, index) => (
                    <div key={src} className={styles.galleryItem}>
                      <Image
                        src={src}
                        alt={`${room.name}, image ${index + 1}`}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className={styles.galleryImage}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <p className={styles.bookingLabel}>Ready to stay?</p>
              <p className={styles.bookingCopy}>
                Book directly with the hotel for the best available rate on {room.name.toLowerCase()}.
              </p>
              {room.price !== undefined && (
                <div className={styles.bookingPrice}>
                  <span className={styles.bookingPriceCurrency}>{room.currency ?? 'INR'}</span>
                  <span className={styles.bookingPriceValue}>{room.price.toLocaleString('en-IN')}</span>
                  <span className={styles.bookingPriceUnit}>/night</span>
                </div>
              )}
              {room.availableRooms !== undefined && room.availableRooms > 0 && (
                <p className={styles.bookingAvailability}>
                  {room.availableRooms} rooms available for your dates
                </p>
              )}
              <Button href={room.bookingUrl} variant="primary" fullWidth>
                Book Now
              </Button>
              <Button href="tel:+918709490824" variant="ghost" fullWidth>
                Call the Front Desk
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
