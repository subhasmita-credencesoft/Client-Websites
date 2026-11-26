import React from 'react';
import type { Metadata } from 'next';
import { ROOMS_DATA } from '@/data/roomsData';
import RoomCard from '@/components/home/RoomCard';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import styles from './RoomsPage.module.scss';

export const metadata: Metadata = {
  title: 'Rooms & Deluxe Cottages | Tarangan Resort Nagaon-Alibag',
  description:
    'Browse 12 air-conditioned deluxe cottages and family suites at Tarangan Resort in Nagaon, Alibag. Featuring swimming pool views, split AC, king beds, and free Wi-Fi.',
};

export default function RoomsPage() {
  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>12 Deluxe Accommodations</span>
          </div>
          <h1 className={styles.bannerTitle}>Cottages & Suites</h1>
          <p className={styles.bannerSub}>
            Private standalone cottages and spacious suites designed for comfort, coastal breezes, and pool views.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className={styles.roomsSection}>
        <div className={styles.container}>
          {/* Key Inclusions Bar */}
          <div className={styles.inclusionsBar}>
            <div className={styles.incItem}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Whisper-Quiet Split AC in All 12 Rooms</span>
            </div>
            <div className={styles.incItem}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Crystal-Clear Swimming Pool Access</span>
            </div>
            <div className={styles.incItem}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>100% Uninterrupted Power Backup</span>
            </div>
            <div className={styles.incItem}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Daily Housekeeping & Fresh Linens</span>
            </div>
          </div>

          <div className={styles.grid}>
            {ROOMS_DATA.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
