'use client';

import { useRooms } from '@/lib/hooks';
import { RoomCard } from './RoomCard';
import { Reveal } from '@/components/ui/Reveal';
import styles from './RoomsGrid.module.scss';

export function RoomsGrid() {
  const { rooms, loading, error } = useRooms();

  return (
    <section id="rooms" className={styles.section} aria-labelledby="rooms-heading">
      <div className={styles.container}>
        <Reveal as="header" className={styles.header}>
          <h2 id="rooms-heading" className={styles.heading}>
            Explore Our Rooms
          </h2>
          <p className={styles.subheading}>
            Discover comfort, elegance, and modern amenities at Hotel K2, Chakradharpur, Jharkhand.
          </p>
        </Reveal>

        {loading && (
          <p className={styles.empty}>Loading rooms...</p>
        )}

        {!loading && error && (
          <p className={styles.empty}>Unable to load room information. Please check back shortly.</p>
        )}

        {!loading && !error && rooms.length === 0 && (
          <p className={styles.empty}>Room information is being updated. Please check back shortly.</p>
        )}

        {!loading && !error && rooms.length > 0 && (
          <div className={styles.grid}>
            {rooms.map((room, index) => (
              <Reveal key={room.slug} delay={(index % 3) * 120}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
