import type { ReactNode } from 'react';
import Link from 'next/link';
import { diningOutlets } from '@/data/dining';
import SectionHead from '@/components/sections/shared/SectionHead';

export default function OtherOutlets({ exclude, body }: { exclude: string; body: ReactNode }) {
  const outlets = diningOutlets.filter((outlet) => outlet.slug !== exclude);
  return (
    <section className="section section--dark">
      <SectionHead eyebrow="Other Outlets" title="More dining at Krishna Palace" body={body} />
      <div className="outlets-compact-grid">
        {outlets.map((outlet) => (
          <Link className="outlet-compact-card" href={`/dining/${outlet.slug}/`} key={outlet.slug}>
            <img src={outlet.image} alt={outlet.alt} />
            <div className="outlet-compact-info">
              <span className="outlet-badge">{outlet.badge}</span>
              <h3>{outlet.name}</h3>
              <p>{outlet.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
