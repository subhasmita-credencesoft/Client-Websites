import Link from 'next/link';
import RoomsList from '@/components/rooms/RoomsList';
import SectionHead from '@/components/sections/shared/SectionHead';
import { hotel } from '@/data/site';

export default function HomeRooms() {
  return (
    <section className="section">
      <SectionHead
        eyebrow="Rooms & rates"
        title={<>Rest easy.<br />Roam far.</>}
        body=" For every room at the hotel, refreshed as bookings come in."
      />
      <RoomsList compact />
      <div className="hero-actions">
        <Link className="button" href="/rooms-rates/">All rooms & rates</Link>
        <a className="button button--ink" href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">Book now</a>
      </div>
    </section>
  );
}
