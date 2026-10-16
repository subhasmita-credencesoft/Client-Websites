import Link from 'next/link';
import StatLine from '@/components/sections/shared/StatLine';
import { hotel } from '@/data/site';
import { diningOutlets } from '@/data/dining';
import { madiraStats } from '@/data/pages/madira';

export default function MadiraIntro() {
  const madira = diningOutlets.find((outlet) => outlet.slug === 'madira')!;

  return (
    <section className="section">
      <div className="editorial">
        <img className="editorial-image" src="/compressed_FOC00707_converted.jpg" alt="Madira The Bar's intimate wood-paneled lounge counter" />
        <div className="editorial-copy">
          <span className="eyebrow">Bar & Fine Dining</span>
          <h2>Refined ambience, thoughtful hospitality.</h2>
          {madira.extendedDescription.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          <StatLine items={madiraStats} />
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="button" href={`tel:${hotel.phoneHref}`}>Call for reservations</a>
            <Link className="button button--outline" href="/dining/">All dining outlets</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
