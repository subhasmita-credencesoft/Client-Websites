'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import { hotel } from '@/data/site';
import { DEFAULT_PROPERTY, DEFAULT_ROOM_DETAILS } from '@/data/rooms';
import { fetchRoom } from '@/lib/api/hotel';
import { formatINR, formatStayDate } from '@/lib/format';
import type { PropertyInfo, RoomDetail } from '@/types/hotel';

type LoadState = 'loading' | 'ready' | 'missing' | 'error';

function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.failed) return;
  image.dataset.failed = '1';
  image.style.visibility = 'hidden';
}

function occupancyLabel(min: number | null, max: number | null): string | null {
  if (!max && !min) return null;
  const top = max ?? min;
  if (!top) return null;
  if (min && min !== top) return `${min}–${top} guests`;
  return top === 1 ? '1 guest' : `up to ${top} guests`;
}

export default function RoomDetail({ id }: { id: string }) {
  const initialRoom = DEFAULT_ROOM_DETAILS[id] ?? null;
  const [state, setState] = useState<LoadState>(initialRoom ? 'ready' : 'loading');
  const [room, setRoom] = useState<RoomDetail | null>(initialRoom);
  const [property, setProperty] = useState<PropertyInfo | null>(DEFAULT_PROPERTY);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setActiveImage(0);

    fetchRoom(id, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        if (!result) {
          if (!initialRoom) setState('missing');
          return;
        }
        setRoom(result.room);
        setProperty(result.property);
        setState('ready');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return;
        if (!initialRoom) {
          setState('error');
        }
      });

    return () => controller.abort();
  }, [id, initialRoom]);

  if (state === 'missing' || (state === 'error' && !room)) {
    return (
      <>
        <SiteHeader solid />
        <section className="section room-detail room-detail--empty">
          <span className="eyebrow">Rooms &amp; rates</span>
          <h1>{state === 'missing' ? 'We can’t find that room.' : 'Rooms are temporarily unavailable.'}</h1>
          <p>{state === 'missing' ? 'It may have been renamed or removed. Browse the current rooms and rates instead.' : 'Please check again in a moment, or contact the hotel directly.'}</p>
          <div className="hero-actions">
            <Link className="button" href="/rooms-rates/">Back to rooms &amp; rates</Link>
            <a className="button button--outline button--ink" href={`mailto:${hotel.reservationEmail}`}>Email reservations</a>
          </div>
        </section>
      </>
    );
  }

  if ((state === 'loading' && !room) || !room) {
    return (
      <>
        <SiteHeader solid />
        <section className="section room-detail room-detail--loading" aria-busy="true" aria-live="polite">
          <span className="eyebrow">Rooms &amp; rates</span>
          <div className="skeleton skeleton--title" />
          <div className="skeleton skeleton--text" />
          <div className="skeleton skeleton--text skeleton--short" />
        </section>
      </>
    );
  }

  const facts = [
    { label: 'Sleeps', value: occupancyLabel(room.minOccupancy, room.maxOccupancy) },
    { label: 'Available', value: room.available !== null && room.totalRooms ? `${room.available} of ${room.totalRooms} for your dates` : null },
    { label: 'Rooms of this type', value: room.inventory ? String(room.inventory) : null },
    { label: 'Minimum stay', value: room.minimumStay ? `${room.minimumStay} night${room.minimumStay > 1 ? 's' : ''}` : null },
    { label: 'Size', value: room.size },
    { label: 'Tax', value: `+ ${room.gstPercent}% GST` },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  const image = room.images[activeImage] ?? room.image;

  return (
    <div data-room-id={room.id}>
      <SiteHeader solid />
      <section className="section room-detail">
        <Link className="room-detail__back" href="/rooms-rates/">&larr; Rooms &amp; rates</Link>

        <div className="room-detail__grid">
          <div className={`room-detail__media${image ? '' : ' room-detail__media--empty'}`}>
            {image && <img src={image} alt={room.name} onError={handleImageError} />}
            {room.images.length > 1 && (
              <div className="room-detail__thumbs">
                {room.images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className={`room-detail__thumb${index === activeImage ? ' is-active' : ''}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show photo ${index + 1} of ${room.images.length}`}
                  >
                    <img src={src} alt="" onError={handleImageError} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="room-detail__info">
            <span className="eyebrow">Rooms &amp; rates</span>
            <div className="room-detail__head">
              <h1>{room.name}</h1>
              <div className="price">
                {formatINR(room.price)}
                <small>{room.rateDetail}</small>
              </div>
            </div>
            <p className="room-detail__desc">{room.description}</p>

            <dl className="room-facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="room-detail__actions">
              <a
                className="button"
                href={hotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book now
              </a>
              <a className="button button--outline button--ink" href={`tel:${hotel.phoneHref}`}>
                Call to reserve
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="section-head">
          <div><span className="eyebrow">Rate plans</span><h2>Every plan for this room.</h2></div>
          <p>Live tariff for your selected night. Occupancy and inclusions are set by the hotel.</p>
        </div>

        {room.plans.length ? (
          <div className="plan-list">
            {room.plans.map((plan) => {
              const validFrom = formatStayDate(plan.effectiveDate);
              const validTo = formatStayDate(plan.expiryDate);
              const stay = plan.minimumStay || plan.maximumStay
                ? [plan.minimumStay ? `min ${plan.minimumStay} night${plan.minimumStay > 1 ? 's' : ''}` : null,
                   plan.maximumStay && plan.maximumStay < 999 ? `max ${plan.maximumStay} nights` : null]
                    .filter(Boolean).join(' · ')
                : null;

              return (
                <article className="plan-card" key={plan.code || plan.name}>
                  <div className="plan-card__top">
                    <div>
                      <h3>{plan.name}</h3>
                      {plan.code && <span className="plan-card__code">{plan.code}</span>}
                    </div>
                    <strong>{formatINR(plan.amount)}</strong>
                  </div>
                  <ul className="plan-card__meta">
                    {occupancyLabel(plan.minimumOccupancy, plan.maximumOccupancy) && (
                      <li>{occupancyLabel(plan.minimumOccupancy, plan.maximumOccupancy)}</li>
                    )}
                    {stay && <li>{stay}</li>}
                    {validFrom && validTo && <li>Valid {validFrom} &ndash; {validTo}</li>}
                    {plan.extraChargePerPerson ? <li>Extra person {formatINR(plan.extraChargePerPerson)}</li> : null}
                    {plan.extraChargePerChild ? <li>Child {formatINR(plan.extraChargePerChild)}</li> : null}
                  </ul>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="room-detail__note">Please contact the hotel for the plans available on your dates.</p>
        )}
      </section>

      {property && property.amenities.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div><span className="eyebrow">At the hotel</span><h2>Included in every stay.</h2></div>
            <p>Facilities available across {property.name}{property.city ? `, ${property.city}` : ''}.</p>
          </div>
          <ul className="feature-list">{property.amenities.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      )}

      <section className="callout">
        <span className="eyebrow">Ready to stay?</span>
        <h2>Reserve your room.</h2>
        <p>Book directly online for current availability and published rates, or speak with our reservations team.</p>
        <a className="button" href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">Book online</a>
        <a className="button button--outline" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }} href={`mailto:${hotel.reservationEmail}?subject=${encodeURIComponent(`Room enquiry — ${room.name}`)}`}>Email reservations</a>
      </section>
    </div>
  );
}
