'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { hotel } from '@/data/site';
import { DEFAULT_PROPERTY, DEFAULT_ROOMS } from '@/data/rooms';
import { fetchAvailability, selectPrimaryPlan } from '@/lib/api/hotel';
import { formatINR, isRoomId } from '@/lib/format';
import type { PropertyInfo, RoomOffer } from '@/types/hotel';
import RoomCarousel from '@/components/rooms/RoomCarousel';

function formatOccupancy(min: number | null, max: number | null): string {
  if (!max && !min) return '2 Guests';
  if (min && max && min !== max) return `${min}–${max} Guests`;
  return `${max ?? min} Guest${(max ?? min) === 1 ? '' : 's'}`;
}

export default function CinematicRoomsShowcase() {
  const [rooms, setRooms] = useState<RoomOffer[]>(DEFAULT_ROOMS);
  const [property, setProperty] = useState<PropertyInfo | null>(DEFAULT_PROPERTY);
  const [gstPercent, setGstPercent] = useState<number | null>(12);
  const [state, setState] = useState<'idle' | 'loading' | 'live' | 'failed'>('idle');

  useEffect(() => {
    const controller = new AbortController();

    fetchAvailability(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setRooms(data.rooms);
        setProperty(data.property);
        setGstPercent(data.gstPercent);
        setState('live');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return;
        if (!rooms.length) {
          setState('failed');
        }
      });

    return () => controller.abort();
  }, [rooms.length]);

  if (state === 'loading' && !rooms.length) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '100px 0' }}>
        <span className="eyebrow">Hospitality · Hosapete</span>
        <h2 style={{ font: '400 36px var(--serif)', margin: '14px 0' }}>Loading rooms from booking engine…</h2>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Synchronizing live tariffs, room categories, and current availability.</p>
      </section>
    );
  }

  if ((state === 'failed' && !rooms.length) || !rooms.length) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--muted)' }}>
          Rooms are momentarily unavailable online. Please reach out to our front desk at{' '}
          <a href={`tel:${hotel.phoneHref}`} style={{ textDecoration: 'underline' }}>{hotel.phoneDisplay}</a>.
        </p>
      </section>
    );
  }

  // All room images are taken directly from room.images or room.image
  const allPropertyPhotos = rooms.flatMap((r) => r.images).filter(Boolean);

  return (
    <>
      {/* ─── Editorial Quick Navigation ─── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="rooms-editorial-intro">
          <span className="eyebrow">View All rooms </span>
          <h2>A room for every traveller.</h2>
          <p>
            {property?.description ||
              'A comfortable and convenient stay surrounded by the rich heritage of the Vijayanagar Empire and the scenic beauty of Hampi.'}
          </p>

          <div className="rooms-quick-bar">
            {rooms.map((room, index) => (
              <a className="rooms-quick-pill" href={`#room-${room.id}`} key={room.id}>
                <span>0{index + 1}</span> {room.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editorial Pull Quote ─── */}
      <div className="editorial-quote-wrap">
        <blockquote className="editorial-quote">
          &ldquo;Every great journey through Hampi deserves a gracious place to return to at the end of the day.&rdquo;
        </blockquote>
        <span className="editorial-quote-cite">{property?.name || 'Hotel Krishna Palace'} · {property?.address || 'Station Road, Hosapete'}</span>
      </div>

      {/* ─── Alternating Room Showcases ─── */}
      <section className="section">
        {rooms.map((room, index) => {
          const isReverse = index % 2 === 1;
          const bestPlan = selectPrimaryPlan(room.plans) || room.plans[0];
          const displayPrice = bestPlan?.amount ?? room.price;
          const availabilityText =
            room.available !== null && room.totalRooms
              ? `${room.available} of ${room.totalRooms} available`
              : 'Available for reservation';

          const roomImages = room.images && room.images.length > 0 ? room.images : (room.image ? [room.image] : []);

          return (
            <article
              className={`room-showcase${isReverse ? ' room-showcase--reverse' : ''}`}
              id={`room-${room.id}`}
              key={room.id}
            >
              <div className="room-showcase__media">
                <span className="room-showcase__number">0{index + 1}</span>
                {roomImages.length > 0 ? (
                  <RoomCarousel images={roomImages} alt={room.name} />
                ) : (
                  <div style={{ height: '100%', background: 'var(--paper-deep)' }} />
                )}
                <span className="room-showcase__badge">
                  {room.available !== null ? `${room.available} Available Today` : 'Direct Reservation'}
                </span>
              </div>

              <div className="room-showcase__content">
                <span className="eyebrow">
                  {formatOccupancy(null, room.maxOccupancy)} · 24-Hour Stay Policy
                </span>
                <span className="room-showcase__tagline">
                  {bestPlan ? bestPlan.name : 'Single Occupancy With Breakfast Plan'}
                </span>
                <h3>{room.name}.</h3>
                <p className="room-showcase__desc">
                  {room.description}
                </p>

                <div className="room-showcase__meta">
                  <div className="room-showcase__meta-item">
                    <span>Published Tariff</span>
                    <strong>
                      {formatINR(displayPrice)}{' '}
                      <small style={{ fontWeight: 400, fontSize: 11, color: 'var(--muted)' }}>
                        + {gstPercent ?? 12}% GST
                      </small>
                    </strong>
                  </div>
                  <div className="room-showcase__meta-item">
                    <span>Occupancy</span>
                    <strong>{formatOccupancy(null, room.maxOccupancy)}</strong>
                  </div>
                  <div className="room-showcase__meta-item">
                    <span>Live Inventory</span>
                    <strong style={{ color: 'var(--orange-dark)' }}>{availabilityText}</strong>
                  </div>
                  <div className="room-showcase__meta-item">
                    <span>Stay Cycle</span>
                    <strong>24 hrs · 12 PM to 12 PM</strong>
                  </div>
                </div>

                {/* Synchronized Rate Plans */}
                {room.plans.length > 0 && (
                  <div className="room-plans" style={{ marginTop: 0, marginBottom: 26 }}>
                    <div className="room-plans__head">
                      <span>Synchronized Rate Plans</span>
                      <span className="room-avail">{availabilityText}</span>
                    </div>
                    <ul>
                      {room.plans.map((plan) => (
                        <li key={plan.code}>
                          <span className="room-plans__name">{plan.name}</span>
                          <span className="room-plans__meta">
                            {formatOccupancy(plan.minimumOccupancy, plan.maximumOccupancy)}
                          </span>
                          <strong>{formatINR(plan.amount)}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="room-showcase__actions">
                  <a
                    className="button"
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book now
                  </a>
                  {isRoomId(room.id) && (
                    <Link className="button button--outline button--ink" href={`/rooms-rates/${room.id}/`}>
                      View details
                    </Link>
                  )}
                  <a
                    className="outlet-call-link"
                    href={`tel:${property?.mobile || hotel.phoneHref}`}
                    style={{ marginLeft: 6 }}
                  >
                    Call front desk
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ─── Photo Gallery Strip ─── */}
      {allPropertyPhotos.length > 0 && (
        <section className="rooms-gallery-strip">
          {allPropertyPhotos.slice(0, 5).map((imgUrl, i) => (
            <img key={`api-gal-${i}`} src={imgUrl} alt={`Room interior perspective ${i + 1}`} />
          ))}
        </section>
      )}
    </>
  );
}
