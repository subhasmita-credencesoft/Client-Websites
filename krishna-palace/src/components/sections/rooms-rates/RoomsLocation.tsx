import Link from 'next/link';
import StatLine from '@/components/sections/shared/StatLine';
import { roomsRatesStats } from '@/data/pages/roomsRates';

export default function RoomsLocation() {
  return (
    <section className="section">
      <div className="editorial editorial--rooms">
        <div className="editorial-copy">
          <span className="eyebrow">Location</span>
          <h2>Gateway to Hampi.</h2>
          <p>
            Situated on Station Road in Hosapete, Hotel Krishna Palace places you near the Hampi UNESCO
            World Heritage Site — close enough for a comfortable morning drive to the stone chariot at
            Vittala, the Virupaksha Temple, or the boulder-strewn landscapes of Anegundi.
          </p>
          <p>
            Return each evening to a well-appointed room, a cool swim, and your choice of two
            distinct dining destinations — from the all-day ease of Fiesta to the wood-paneled
            calm of Madira The Bar.
          </p>
          <StatLine items={roomsRatesStats} />
          <Link className="text-link" href="/tourism/">
            Explore nearby destinations
          </Link>
        </div>
        <img
          src="/images/32-tourism-1.jpg"
          alt="The iconic stone chariot at Vittala Temple, Hampi, in warm golden light"
          className="editorial-image"
        />
      </div>
    </section>
  );
}
