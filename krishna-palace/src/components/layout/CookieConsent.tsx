'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { fetchAvailability } from '@/lib/api/hotel';
import { hotel } from '@/data/site';

export default function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lowestRate, setLowestRate] = useState<number | null>(null);
  const [currency, setCurrency] = useState('₹');

  /* ── Fetch live rate from API ── */
  useEffect(() => {
    const controller = new AbortController();
    fetchAvailability(controller.signal)
      .then((avail) => {
        let lowest = Infinity;
        avail.rooms.forEach((room) => {
          room.plans.forEach((plan) => {
            if (plan.amount !== null && plan.amount < lowest) lowest = plan.amount;
          });
          if (room.price !== null && room.price < lowest) lowest = room.price;
        });
        if (Number.isFinite(lowest)) {
          setLowestRate(lowest);
          setCurrency(avail.property.currency === 'INR' ? '₹' : avail.property.currency);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  /* ── Show after short delay (once per session) ── */
  useEffect(() => {
    const skip = sessionStorage.getItem('kp-booking-bar-dismissed');
    if (skip) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  /* ── Track scroll for background ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('kp-booking-bar-dismissed', '1');
  }

  if (dismissed || pathname?.startsWith('/dining') || pathname?.startsWith('/restaurant')) return null;

  return (
    <div
      className={[
        'booking-bar',
        visible ? 'booking-bar--visible' : '',
        scrolled ? 'booking-bar--scrolled' : '',
      ].join(' ').trim()}
      role="complementary"
      aria-label="Book your stay"
    >
      {/* Left: hotel info */}
      <div className="booking-bar__info">
        <span className="booking-bar__hotel">Hotel Krishna Palace</span>
        <span className="booking-bar__sep" aria-hidden="true">·</span>
        <span className="booking-bar__tagline">
          Book direct for the best available rate
          {lowestRate !== null && (
            <> &nbsp;—&nbsp; from <strong>{currency}{lowestRate.toLocaleString('en-IN')}</strong> / night</>
          )}
        </span>
      </div>

      {/* Right: actions */}
      <div className="booking-bar__actions">
        <a
          className="booking-bar__btn booking-bar__btn--solid"
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
        >
          Book Now
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <button className="booking-bar__close" onClick={dismiss} aria-label="Dismiss">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <line x1="1" y1="1" x2="10" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="10" y1="1" x2="1" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
