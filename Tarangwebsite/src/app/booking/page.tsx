'use client';

import React, { useEffect } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import styles from './BookingPage.module.scss';

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL ||
  'https://bookone.io/Tarangan-Resort?bookingEngine=True';

export default function BookingPage() {
  useEffect(() => {
    // Immediate client-side redirection to official BookOne booking engine
    if (typeof window !== 'undefined') {
      window.location.replace(BOOKING_URL);
    }
  }, []);

  return (
    <div className={styles.redirectWrapper}>
      <div className={styles.redirectCard}>
        <div className={styles.iconCircle}>
          <Sparkles size={28} color="#C59A78" />
        </div>
        <span className={styles.badge}>Tarangan Resort Official Booking</span>
        <h1 className={styles.title}>Redirecting to Booking Engine</h1>
        <p className={styles.subtitle}>
          Transferring you directly to our live booking portal for real-time room availability, best rates, and instant reservation confirmation.
        </p>
        <div className={styles.spinner} />
        <a
          href={BOOKING_URL}
          className={styles.manualBtn}
          rel="noopener noreferrer"
        >
          <span>Click here if not redirected automatically</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
