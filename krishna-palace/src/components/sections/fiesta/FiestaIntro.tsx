import Link from 'next/link';
import StatLine from '@/components/sections/shared/StatLine';
import { hotel } from '@/data/site';
import { diningOutlets } from '@/data/dining';
import { fiestaStats } from '@/data/pages/fiesta';

export default function FiestaIntro() {
  const fiesta = diningOutlets.find((outlet) => outlet.slug === 'fiesta')!;

  return (
    <section className="section">
      <div className="editorial">
        <img className="editorial-image" src="/FOC00348.avif" alt="Breakfast and dining table spread at Fiesta" />
        <div className="editorial-copy">
          <span className="eyebrow">All-Day Dining</span>
          <h2>Flavours for every time of day.</h2>
          {fiesta.extendedDescription.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          <StatLine items={fiestaStats} />
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="button" href={`tel:${hotel.phoneHref}`}>Reserve a table</a>
            <Link className="button button--outline" href="/dining/">All dining outlets</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
