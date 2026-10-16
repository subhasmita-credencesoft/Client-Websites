import SectionHead from '@/components/sections/shared/SectionHead';
import { destinations } from '@/data/destinations';
import { tourismRouteStops, tourismRouteFooter } from '@/data/pages/tourism';

export default function TourismRoute() {
  return (
    <section className="section">
      <SectionHead
        eyebrow="Beyond the expected"
        title="Follow the old roads."
        body="Hosapete opens onto a rich heritage region. Here are a few places to begin exploring; ask the hotel team for help with your plans."
      />
      <div className="regional-route" aria-label="Illustrated route through the Hampi heritage region">
        <div className="regional-route__intro">
          <span className="eyebrow">A regional route</span>
          <p>A few places to begin. Illustrated for orientation only — not to scale.</p>
        </div>
        <svg className="regional-route__map" viewBox="0 0 1000 370" role="img" aria-labelledby="route-title route-desc">
          <title id="route-title">Heritage places around Hosapete</title>
          <desc id="route-desc">An illustrative line joining Hosapete, Hampi, Anegundi, Aihole, Badami and Pattadakal. The route is not to scale.</desc>
          <path className="regional-route__line" d="M 82 266 C 160 250, 198 205, 278 214 S 394 254, 462 208 S 544 136, 627 152 S 735 196, 798 138 S 886 95, 928 80" fill="none" />
          {tourismRouteStops.map((stop) => (
            <g className="regional-route__point" transform={`translate(${stop.x} ${stop.y})`} key={stop.name}>
              <circle className="regional-route__stop" r="7" />
              <text className="regional-route__label" x={stop.labelX ?? 0} y={stop.labelY} textAnchor={stop.anchor}>{stop.name}</text>
            </g>
          ))}
        </svg>
        <div className="regional-route__footer">
          {tourismRouteFooter.map((label) => <span key={label}>{label}</span>)}
        </div>
      </div>
      <div className="destination-list">
        {destinations.map((place, index) => (
          <article className={`destination-card${place.image ? '' : ' destination-card--text'}`} key={place.name}>
            {place.image
              ? <img src={place.image} alt={place.alt} />
              : <div className="destination-art" aria-hidden="true"><span>{place.name.slice(0, 2).toUpperCase()}</span></div>}
            <div>
              <span className="eyebrow">0{index + 1} · Karnataka</span>
              <h2>{place.name}</h2>
              <p>{place.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
