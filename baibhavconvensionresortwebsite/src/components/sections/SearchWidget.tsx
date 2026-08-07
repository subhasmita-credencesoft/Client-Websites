'use client';

import { useEffect } from 'react';

import styles from '@/styles/SearchWidget.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDates, setGuests } from '@/store/slices/bookingSlice';
import { SITE } from '@/data/site';

const pad2 = (n: number) => String(n).padStart(2, '0');

const toIso = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const addDays = (d: Date, n: number) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
};

const parseIso = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return { year, month, day };
};

export default function SearchWidget() {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);

  // Prefill today -> tomorrow as sensible defaults once mounted.
  useEffect(() => {
    if (!booking.checkIn && !booking.checkOut) {
      const now = new Date();
      dispatch(setDates({ checkIn: toIso(now), checkOut: toIso(addDays(now, 1)) }));
    }
  }, [dispatch, booking.checkIn, booking.checkOut]);

  const minCheckIn = toIso(new Date());

  const handleSearch = () => {
    // Open the external BookOne booking engine, forwarding the selected dates and guests.
    const base = SITE.bookingEngine;
    const guests = Math.max(1, booking.guests);
    const params = new URLSearchParams();

    if (booking.checkIn && booking.checkOut) {
      const ci = parseIso(booking.checkIn);
      const co = parseIso(booking.checkOut);
      const checkInDate = new Date(ci.year, ci.month - 1, ci.day);
      const checkOutDate = new Date(co.year, co.month - 1, co.day);
      const nights = Math.max(
        1,
        Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000)
      );

      params.set('checkin', booking.checkIn);
      params.set('checkout', booking.checkOut);
      params.set('checkinDay', String(ci.day));
      params.set('checkinMonth', String(ci.month));
      params.set('checkinYear', String(ci.year));
      params.set('checkoutDay', String(co.day));
      params.set('checkoutMonth', String(co.month));
      params.set('checkoutYear', String(co.year));
      params.set('fromDate', `${pad2(ci.day)}-${pad2(ci.month)}-${ci.year}`);
      params.set('toDate', `${pad2(co.day)}-${pad2(co.month)}-${co.year}`);
      params.set('nights', String(nights));
    }

    params.set('adults', String(guests));
    params.set('numAdults', String(guests));
    params.set('children', '0');
    params.set('Children', '0');
    params.set('numGuests', String(guests));
    params.set('noOfPersons', String(guests));
    params.set('rooms', '1');
    params.set('noOfRooms', '1');

    const separator = base.includes('?') ? '&' : '?';
    window.open(`${base}${separator}${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.widget} role="search" aria-label="Search room availability">
      <div className={styles.field}>
        <span className={styles.label}>
          <iconify-icon icon="solar:calendar-bold" aria-hidden="true" />
          Check-in
        </span>
        <input
          className={styles.input}
          type="date"
          value={booking.checkIn}
          min={minCheckIn}
          onChange={(e) => {
            const checkIn = e.target.value;
            if (!checkIn) {
              dispatch(setDates({ checkIn, checkOut: booking.checkOut }));
              return;
            }
            const suggested = toIso(addDays(new Date(`${checkIn}T00:00:00`), 1));
            dispatch(
              setDates({
                checkIn,
                checkOut:
                  !booking.checkOut || booking.checkOut < suggested ? suggested : booking.checkOut,
              })
            );
          }}
          aria-label="Check-in date"
        />
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.field}>
        <span className={styles.label}>
          <iconify-icon icon="solar:calendar-bold" aria-hidden="true" />
          Check-out
        </span>
        <input
          className={styles.input}
          type="date"
          value={booking.checkOut}
          min={toIso(addDays(new Date(`${(booking.checkIn || minCheckIn)}T00:00:00`), 1))}
          onChange={(e) => dispatch(setDates({ checkIn: booking.checkIn, checkOut: e.target.value }))}
          aria-label="Check-out date"
        />
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.field}>
        <span className={styles.label}>Guests</span>
        <div className={styles.guestsRow}>
          <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Decrease guests"
              onClick={() => dispatch(setGuests(booking.guests - 1))}
            >
              &minus;
            </button>
            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Increase guests"
              onClick={() => dispatch(setGuests(booking.guests + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button type="button" className={styles.searchButton} onClick={handleSearch}>
        <iconify-icon icon="solar:magnifer-linear" aria-hidden="true" />
        Search Rooms
      </button>
    </div>
  );
}
