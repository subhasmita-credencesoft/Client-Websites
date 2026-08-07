import Link from 'next/link';
import styles from '@/styles/HomeSections.module.scss';
import SectionLabel from '@/components/ui/SectionLabel';
import RoomCard from '@/components/ui/RoomCard';
import { RoomCategory } from '@/types';

export default function RoomPreview({ rooms }: { rooms: RoomCategory[] }) {
  return (
    <section className={styles.roomPreview} aria-labelledby="rooms-heading">
      <div className="container">
        <div className={styles.roomHeader} data-reveal>
          <SectionLabel eyebrow="Accommodations" title="Rooms designed around you" />
          <Link href="/stay" className="btn btn-outline">
            View All Rooms
          </Link>
        </div>
        <div className={styles.roomGrid} data-reveal-stagger>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
