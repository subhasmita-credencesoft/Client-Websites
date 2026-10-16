'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { hotel } from '@/data/site';
import RoomCarousel from '@/components/rooms/RoomCarousel';
import { fetchAvailability } from '@/lib/api/hotel';
import { formatINR, isRoomId } from '@/lib/format';
import type { Availability, RoomOffer } from '@/types/hotel';

function occupancyLabel(min: number | null, max: number | null): string | null {
  if (!max) return null;
  if (min && min !== max) return `${min}–${max} guests`;
  if (min && min > 1) return `${min} guests`;
  return max === 1 ? '1 guest' : `up to ${max} guests`;
}

export default function RoomsList({
  withNote = false,
  compact = false,
}: {
  withNote?: boolean;
  compact?: boolean;
}) {
  const [rooms, setRooms] = useState<RoomOffer[]>([]);
  const [gstPercent, setGstPercent] = useState<number | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'live' | 'failed'>('idle');

  useEffect(() => {
    const controller = new AbortController();
    setState('loading');

    fetchAvailability(controller.signal)
      .then((data: Availability) => {
        if (controller.signal.aborted) return;
        setRooms(data.rooms);
        setGstPercent(data.gstPercent);
        setState('live');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return;
        setState('failed');
      });

    return () => controller.abort();
  }, []);

  const list = (
    <div className={`room-list${compact ? ' room-list--compact' : ''}`} data-rooms-source={state}>
      {!rooms.length && (
        <p className="room-list__status">
          {state === 'failed'
            ? 'Rooms are temporarily unavailable. Please refresh the page, or contact the hotel directly.'
            : 'Loading rooms…'}
        </p>
      )}
      {rooms.map((room) => {
        const hasPlans = room.plans.length > 0;
        const availability =
          room.available !== null && room.totalRooms ? `${room.available} of ${room.totalRooms} available` : null;

        return (
          <article className="room-card" key={room.id}>
            <RoomCarousel images={room.images} alt={room.name} />
            <div className="room-body">
              <div className="room-top">
                <h2>{room.name}</h2>
                <div className="price">
                  {formatINR(room.price)}
                  <small>{room.rateDetail}</small>
                </div>
              </div>
              <p>{room.description}</p>

              {compact && availability && (
                <p className="room-avail--compact">{availability}</p>
              )}

              {!compact && hasPlans && (
                <div className="room-plans">
                  <div className="room-plans__head">
                    <span>Rate plans</span>
                    {availability && <span className="room-avail">{availability}</span>}
                  </div>
                  <ul>
                    {room.plans.map((plan) => (
                      <li key={plan.code}>
                        <span className="room-plans__name">{plan.name}</span>
                        <span className="room-plans__meta">{occupancyLabel(plan.minimumOccupancy, plan.maximumOccupancy)}</span>
                        <strong>{formatINR(plan.amount)}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!compact && !hasPlans && availability && (
                <p className="room-avail room-avail--standalone">{availability}</p>
              )}

              <div className="room-actions">
                <a
                  className="button"
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book now
                </a>
                {isRoomId(room.id) && (
                  <Link className="text-link" href={`/rooms-rates/${room.id}/`}>View details</Link>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );

  if (!withNote) return list;

  return (
    <>
      {list}
      <div className="note">
        <strong>Tariff note.</strong>{' '}
        {gstPercent !== null
          ? `Published tariffs are per night and subject to change. Applicable GST is additional at ${gstPercent}% as shown on each room. Please contact the hotel to confirm current details.`
          : 'Published tariffs are subject to change. Please contact the hotel to confirm current details.'}
      </div>
    </>
  );
}
