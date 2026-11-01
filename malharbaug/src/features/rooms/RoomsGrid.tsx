import Link from 'next/link';
import { getRooms } from '@/services/property.service';
import RoomCard from './RoomCard';

export default async function RoomsGrid() {
  const rooms = await getRooms();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="section-subtitle">Accommodation</p>
        <h2 className="section-title">Luxury Rooms & Villas for Every Occasion</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/rooms" className="btn-secondary">
          Compare All Rooms &amp; Villas
        </Link>
      </div>
    </section>
  );
}
