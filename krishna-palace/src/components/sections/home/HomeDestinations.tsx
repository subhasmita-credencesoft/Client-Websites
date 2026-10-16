import Link from 'next/link';
import SectionHead from '@/components/sections/shared/SectionHead';
import { homeDestinations } from '@/data/pages/home';

export default function HomeDestinations() {
  return (
    <section className="section section--dark">
      <SectionHead
        eyebrow="The region, in layers"
        title={<>Ancient stones.<br />Open horizons.</>}
        body="Hampi is only the beginning. Follow the heritage of Karnataka through sculpted temples, rocky landscapes and the broad waters of the Tungabhadra."
      />
      <div className="destination-grid">
        {homeDestinations.map((place) => (
          <Link className="destination" href="/tourism/" key={place.name}>
            <img src={place.image} alt={`${place.name}, a destination in Karnataka's heritage region`} />
            <div className="destination-label">
              <span>Discover</span>
              <h3>{place.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Link className="text-link" href="/tourism/" style={{ color: '#f2b36f' }}>See the heritage region</Link>
    </section>
  );
}
