'use client';

import { useEffect, useState } from 'react';
import { fetchAvailability } from '@/lib/api/hotel';
import { hotel } from '@/data/site';

interface NudgeData {
  lowestRate: number;
  currency: string;
  lowestRoomName: string;
}

export default function BookingNudge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [data, setData] = useState<NudgeData | null>(null);

  /* ── Fetch live API data ── */
  useEffect(() => {
    const controller = new AbortController();

    fetchAvailability(controller.signal)
      .then((avail) => {
        if (!avail.rooms.length) return;

        let lowestRate = Infinity;
        let lowestRoomName = '';

        avail.rooms.forEach((room) => {
          room.plans.forEach((plan) => {
            const rate = plan.amount;
            if (rate !== null && rate < lowestRate) {
              lowestRate = rate;
              lowestRoomName = room.name;
            }
          });
          if (room.price !== null && room.price < lowestRate) {
            lowestRate = room.price;
            lowestRoomName = room.name;
          }
        });

        if (!Number.isFinite(lowestRate)) return;

        setData({
          lowestRate,
          currency: avail.property.currency || 'INR',
          lowestRoomName,
        });
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  /* ── Show after 5 s delay, once data is ready ── */
  useEffect(() => {
    if (!data) return;
    const alreadyDismissed = sessionStorage.getItem('kp-nudge-dismissed');
    if (alreadyDismissed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [data]);

  function handleDismiss() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('kp-nudge-dismissed', '1');
  }

  if (dismissed || !data) return null;

  const symbol = data.currency === 'INR' ? '₹' : data.currency;

  return (
    <div
      className={`booking-nudge${visible ? ' booking-nudge--visible' : ''}`}
      role="complementary"
      aria-label="Book now offer"
    >
      {/* Pulsing live dot */}
      <span className="booking-nudge__dot" aria-hidden="true" />

      {/* Rate info */}
      <div className="booking-nudge__info">
        <span className="booking-nudge__from">From</span>
        <strong className="booking-nudge__rate">
          {symbol}{data.lowestRate.toLocaleString('en-IN')}
        </strong>
        <span className="booking-nudge__night">/ night</span>
      </div>

      {/* Divider */}
      <span className="booking-nudge__divider" aria-hidden="true" />

      {/* CTA */}
      <a
        className="booking-nudge__cta"
        href={hotel.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleDismiss}
      >
        Book Now
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* Dismiss */}
      <button className="booking-nudge__close" onClick={handleDismiss} aria-label="Dismiss">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
