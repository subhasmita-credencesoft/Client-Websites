'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, CalendarCheck, Sparkles, ShieldCheck } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './QuickBookingBanner.module.scss';

export default function QuickBookingBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.bgOverlay} />
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <div className={styles.tagBadge}>
            <Sparkles size={14} color="#F7D9C6" />
            <span>Direct Booking Privilege</span>
          </div>

          <h2 className={styles.title}>
            Ready for a Refreshing Weekend at Tarangan?
          </h2>

          <p className={styles.subtitle}>
            Book directly with us for guaranteed lowest rates, complimentary breakfast, early check-in priority, and fresh Solkadhi on arrival.
          </p>

          <div className={styles.badgesRow}>
            <span className={styles.badgeItem}>
              <ShieldCheck size={14} /> Free Cancellation up to 72 hrs
            </span>
            <span className={styles.badgeItem}>
              <ShieldCheck size={14} /> 100% Power Backup & Wi-Fi
            </span>
            <span className={styles.badgeItem}>
              <ShieldCheck size={14} /> No Hidden Convenience Fees
            </span>
          </div>

          <div className={styles.actionButtons}>
            <Link
              href="/booking"
              className={styles.primaryBtn}
            >
              <CalendarCheck size={18} />
              <span>Book Online Instant</span>
            </Link>

            <a
              href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
                'Hi Tarangan Resort, I would like to book a cottage for my upcoming visit to Nagaon Alibaug!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Reservation</span>
            </a>

            <a href={`tel:${RESORT_DATA.phone}`} className={styles.phoneBtn}>
              <Phone size={18} />
              <span>Call: {RESORT_DATA.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
