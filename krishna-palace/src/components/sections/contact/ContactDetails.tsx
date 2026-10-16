import { hotel } from '@/data/site';

export default function ContactDetails() {
  const mapQuery = encodeURIComponent(hotel.address);
  return (
    <section className="section" id="contact-details">
      <div className="contact-layout">
        <div>
          <span className="eyebrow">Come by, call or write</span>
          <h2 style={{ font: '400 clamp(38px,5vw,64px)/1.05 var(--serif)', margin: '16px 0 36px' }}>
            A conversation<br />starts here.
          </h2>
          <div className="contact-details">
            <div className="contact-row"><span>Address</span><address>{hotel.address}</address></div>
            <div className="contact-row"><span>Telephone</span><a href={`tel:${hotel.phoneHref}`}>{hotel.phoneDisplay}</a></div>
            <div className="contact-row"><span>Mobile</span><a href={`tel:${hotel.mobileHref}`}>{hotel.mobileDisplay}</a></div>
            <div className="contact-row"><span>Reservations & enquiries</span><a href={`mailto:${hotel.reservationEmail}`}>{hotel.reservationEmail}</a></div>
          </div>
        </div>
        <div className="map-panel" aria-label="Directions to Hotel Krishna Palace on Station Road in Hosapete">
          <div className="map-pin">
            <span className="eyebrow">Station Road · Hosapete</span>
            <strong>Hotel Krishna Palace</strong>
            <p>{hotel.address}</p>
            <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">Open directions</a>
          </div>
        </div>
      </div>
    </section>
  );
}
