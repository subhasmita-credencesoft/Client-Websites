'use client';

import { useState, type FormEvent } from 'react';
import { business } from '@/core/config/business';

type BookingStripLabels = {
  arrivalLabel: string;
  departureLabel: string;
  guestsLabel: string;
  guestPlaceholder: string;
  action: string;
};

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildEngineUrl(arrival: string, departure: string, guests: number): string {
  const checkin = new Date(`${arrival}T00:00:00`);
  const checkout = new Date(`${departure}T00:00:00`);
  const nights = Math.max(1, Math.round((checkout.getTime() - checkin.getTime()) / 86_400_000));
  const params = new URLSearchParams();
  params.set('checkinDay', String(checkin.getDate()));
  params.set('checkinMonth', String(checkin.getMonth() + 1));
  params.set('checkinYear', String(checkin.getFullYear()));
  params.set('checkoutDay', String(checkout.getDate()));
  params.set('checkoutMonth', String(checkout.getMonth() + 1));
  params.set('checkoutYear', String(checkout.getFullYear()));
  params.set('checkOut', departure);
  params.set('toDate', departure);
  params.set('date_to', departure);
  params.set('nights', String(nights));
  params.set('numGuests', String(guests));
  params.set('numAdults', String(guests));
  params.set('Children', '0');
  params.set('rooms', '1');
  return `${business.bookingEngineBaseUrl}?${params.toString()}`;
}

export function BookingStrip({ labels }: { labels: BookingStripLabels }) {
  const [arrival, setArrival] = useState(() => toISODate(new Date()));
  const [departure, setDeparture] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return toISODate(tomorrow);
  });
  const [departureMin, setDepartureMin] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return toISODate(tomorrow);
  });
  const [guests, setGuests] = useState('2');
  const todayISO = toISODate(new Date());

  function handleArrivalChange(value: string) {
    setArrival(value);
    if (!value) return;
    const next = new Date(`${value}T00:00:00`);
    next.setDate(next.getDate() + 1);
    setDepartureMin(toISODate(next));
    if (departure && departure <= value) setDeparture(toISODate(next));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const checkin = arrival || todayISO;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkout = departure || toISODate(tomorrow);
    if (checkout <= checkin) {
      const next = new Date(`${checkin}T00:00:00`);
      next.setDate(next.getDate() + 1);
      window.location.assign(buildEngineUrl(checkin, toISODate(next), Number(guests) || 2));
      return;
    }
    window.location.assign(buildEngineUrl(checkin, checkout, Number(guests) || 2));
  }

  return (
    <form className="booking-strip hidden lg:block" aria-label="Quick booking" onSubmit={handleSubmit}>
      <div className="booking-strip__inside">
        <div>
          <span>{labels.arrivalLabel}</span>
          <input
            type="date"
            value={arrival}
            min={todayISO}
            aria-label={labels.arrivalLabel}
            onChange={(e) => handleArrivalChange(e.target.value)}
          />
        </div>
        <div>
          <span>{labels.departureLabel}</span>
          <input
            type="date"
            value={departure}
            min={departureMin || todayISO}
            aria-label={labels.departureLabel}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </div>
        <div>
          <span>{labels.guestsLabel}</span>
          <select value={guests} aria-label={labels.guestsLabel} onChange={(e) => setGuests(e.target.value)}>
            {['1', '2', '3', '4'].map((n) => (
              <option key={n} value={n}>
                {n} Guest{n === '1' ? '' : 's'}
              </option>
            ))}
          </select>
        </div>
        <button className="button" type="submit">
          {labels.action}
        </button>
      </div>
    </form>
  );
}