import Link from 'next/link';
import StatLine from '@/components/sections/shared/StatLine';
import { homeStats } from '@/data/pages/home';

export default function HomeWelcome() {
  return (
    <section className="section">
      <div className="editorial">
        <img
          className="editorial-image"
          src="/facecadeimage.avif"
          alt="Exterior facade of Hotel Krishna Palace on Station Road, Hosapete"
        />
        <div className="editorial-copy">
          <span className="eyebrow">A familiar welcome</span>
          <h2>Make room for discovery.</h2>
          <p>
            Some journeys deserve a place that feels settled and easy. At Hotel Krishna Palace, a restful room, a welcoming table and Hosapete’s everyday warmth bring you back to the heart of your travels.
          </p>
          <p>
            From here, the layered history of Hampi and the landscapes of Karnataka are ready to unfold at your own pace.
          </p>
          <Link className="text-link" href="/rooms-rates/">Find your room</Link>
          <StatLine items={homeStats} />
        </div>
      </div>
    </section>
  );
}
