'use client';

import { useState, type FormEvent } from 'react';
import { Calendar, Users, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { business } from '@/core/config/business';

type RatePlan = {
  name: string;
  amount: string;
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

export function RoomBookingWidget({
  roomTitle,
  price,
  occupancy,
  rates,
  availability,
}: {
  roomTitle: string;
  price?: string;
  occupancy?: string;
  rates?: readonly RatePlan[];
  availability?: string;
}) {
  const todayISO = toISODate(new Date());

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
  const [selectedPlan, setSelectedPlan] = useState<string>(rates?.[0]?.name ?? 'Standard');

  function handleArrivalChange(value: string) {
    setArrival(value);
    if (!value) return;
    const next = new Date(`${value}T00:00:00`);
    next.setDate(next.getDate() + 1);
    setDepartureMin(toISODate(next));
    if (departure && departure <= value) {
      setDeparture(toISODate(next));
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const checkin = arrival || todayISO;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkout = departure || toISODate(tomorrow);
    window.location.assign(buildEngineUrl(checkin, checkout, Number(guests) || 2));
  }

  return (
    <div className="rounded-sm border border-forest/15 bg-white p-4 sm:p-5 lg:p-5 xl:p-6 shadow-xl min-w-0 max-w-full overflow-hidden">
      {/* Price Header */}
      <div className="border-b border-forest/10 pb-4 sm:pb-5 min-w-0">
        <span className="font-mono-label text-[10px] text-terracotta uppercase tracking-wider block">
          Direct Booking Best Rate
        </span>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-display text-3xl sm:text-4xl text-forest font-semibold">{price || 'Best Rate'}</span>
          <span className="text-xs sm:text-sm text-sage-muted">/ night + taxes</span>
        </div>
        {occupancy && (
          <p className="mt-1 text-xs text-sage-muted break-words">
            Recommended: {occupancy}
          </p>
        )}
      </div>

      {/* Live Rate Plans */}
      {rates && rates.length > 0 && (
        <div className="mt-4 sm:mt-5 border-b border-forest/10 pb-4 sm:pb-5 min-w-0">
          <p className="font-mono-label text-[10px] uppercase tracking-wider text-forest/70 mb-2.5">
            Available Rate Options
          </p>
          <div className="space-y-2">
            {rates.map((rate) => {
              const isSelected = selectedPlan === rate.name;
              return (
                <button
                  key={rate.name}
                  type="button"
                  onClick={() => setSelectedPlan(rate.name)}
                  className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-sm border text-left text-xs transition-all ${
                    isSelected
                      ? 'border-terracotta bg-terracotta/5 text-forest font-medium shadow-xs'
                      : 'border-forest/10 hover:border-forest/30 text-sage-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`h-3.5 w-3.5 shrink-0 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-terracotta bg-terracotta' : 'border-forest/30'
                      }`}
                    >
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="truncate">{rate.name}</span>
                  </div>
                  <strong className="text-forest font-semibold text-xs shrink-0 ml-2">{rate.amount}</strong>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4 min-w-0">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="min-w-0">
            <label className="mb-1 flex items-center gap-1 text-[10px] font-mono-label uppercase text-forest/70">
              <Calendar size={12} className="text-terracotta shrink-0" />
              <span>Check-in</span>
            </label>
            <input
              type="date"
              value={arrival}
              min={todayISO}
              onChange={(e) => handleArrivalChange(e.target.value)}
              required
              className="w-full min-w-0 max-w-full rounded-sm border border-forest/20 bg-cream/50 px-2.5 py-2 text-xs font-sans text-forest outline-none focus:border-terracotta transition-colors"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 flex items-center gap-1 text-[10px] font-mono-label uppercase text-forest/70">
              <Calendar size={12} className="text-terracotta shrink-0" />
              <span>Check-out</span>
            </label>
            <input
              type="date"
              value={departure}
              min={departureMin || todayISO}
              onChange={(e) => setDeparture(e.target.value)}
              required
              className="w-full min-w-0 max-w-full rounded-sm border border-forest/20 bg-cream/50 px-2.5 py-2 text-xs font-sans text-forest outline-none focus:border-terracotta transition-colors"
            />
          </div>
        </div>

        <div className="min-w-0">
          <label className="mb-1 flex items-center gap-1 text-[10px] font-mono-label uppercase text-forest/70">
            <Users size={12} className="text-terracotta shrink-0" />
            <span>Guests</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full min-w-0 max-w-full rounded-sm border border-forest/20 bg-cream/50 px-2.5 py-2 text-xs font-sans text-forest outline-none focus:border-terracotta transition-colors"
          >
            {['1', '2', '3', '4', '5', '6'].map((num) => (
              <option key={num} value={num}>
                {num} Guest{num === '1' ? '' : 's'} (1 Suite)
              </option>
            ))}
          </select>
        </div>

        {availability && (
          <p className="rounded-sm bg-forest/5 p-2.5 text-center text-[11px] font-mono-label text-forest">
            ⚡ {availability}
          </p>
        )}

        <button
          type="submit"
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-terracotta px-5 py-3.5 font-mono-label text-xs uppercase tracking-widest text-cream transition-all hover:bg-forest hover:shadow-lg active:scale-[0.99]"
        >
          Book {roomTitle.split(' ')[0]} Now
          <ArrowRight size={14} />
        </button>
      </form>

      {/* Perks Badges */}
      <div className="mt-6 border-t border-forest/10 pt-5 space-y-2 text-xs text-sage-muted">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
          <span>Best Rate Guarantee when booking direct</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
          <span>Zero reservation fees &amp; instant booking confirmation</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
          <span>24/7 Front Desk concierge assistance</span>
        </div>
      </div>

      {/* Phone Hotline */}
      <div className="mt-5 border-t border-forest/10 pt-4 text-center">
        <p className="text-[11px] text-sage-muted">Prefer to reserve over phone?</p>
        <a
          href={`tel:${business.phones.primary}`}
          className="mt-1 inline-flex items-center gap-1.5 font-mono-label text-xs font-bold text-forest hover:text-terracotta transition-colors"
        >
          <Phone size={12} className="text-terracotta" />
          {business.phones.primaryDisplay}
        </a>
      </div>
    </div>
  );
}
