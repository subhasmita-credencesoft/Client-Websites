import Link from 'next/link';
import SectionHead from '@/components/sections/shared/SectionHead';
import { diningOutlets } from '@/data/dining';

export default function RestaurantOutlets() {
  return (
    <section className="section">
      <SectionHead
        eyebrow="Dining & Bar"
        title="Two distinct destinations to discover."
        body="Visit our main Dining portal or explore an individual destination below."
      />

      <div className="outlets-grid">
        {diningOutlets.map((outlet) => (
          <article className="outlet-card" key={outlet.slug}>
            <div className="outlet-card__media">
              <img src={outlet.image} alt={outlet.alt} />
              <span className="outlet-badge">{outlet.badge}</span>
            </div>
            <div className="outlet-card__content">
              <span className="eyebrow">{outlet.positioning}</span>
              <h3>{outlet.name}</h3>
              <p className="outlet-card__desc">{outlet.description}</p>
              <div className="outlet-card__actions">
                <Link className="text-link" href={`/dining/${outlet.slug}/`}>
                  View {outlet.name}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link className="button" href="/dining/">
          Visit complete dining & bar guide
        </Link>
      </div>
    </section>
  );
}
