'use client';

import React from 'react';
import { useHotelRooms } from '@/hooks';
import { Room } from '@/types';
import RoomCard from '@/components/home/RoomCard';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './RoomsPage.module.scss';

interface RoomsClientProps {
  initialRooms?: Room[];
}

export default function RoomsClient({ initialRooms }: RoomsClientProps) {
  const { rooms, loading } = useHotelRooms({ initialRooms });

  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Deluxe Accommodations</span>
          </div>
          <h1 className={styles.bannerTitle}>Cottages & Suites</h1>
          <p className={styles.bannerSub}>
            Private standalone cottages and spacious suites designed for comfort, coastal breezes, and nature views.
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
              <span>Whisper-Quiet Split AC in All Rooms</span>
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

          {/* Loading status */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C59A78', marginBottom: '20px' }}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '14px' }}>Updating live room tariffs from hotel API...</span>
            </div>
          )}

          <div className={styles.grid}>
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
