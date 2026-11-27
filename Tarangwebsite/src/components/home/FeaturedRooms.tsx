'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { useHotelRooms } from '@/hooks';
import { Room } from '@/types';
import RoomCard from './RoomCard';
import styles from './FeaturedRooms.module.scss';

interface FeaturedRoomsProps {
  initialRooms?: Room[];
}

export default function FeaturedRooms({ initialRooms }: FeaturedRoomsProps) {
  const { rooms, loading } = useHotelRooms({ initialRooms });
  const [filter, setFilter] = useState<string>('All');

  // Compute dynamic category pills from live API rooms
  const categories = useMemo(() => {
    const cats = new Set(rooms.map((r) => r.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    if (filter === 'All') return rooms;
    return rooms.filter((r) => r.category.toLowerCase() === filter.toLowerCase());
  }, [rooms, filter]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.headerRow}>
          <div>
            <div className={styles.tagBadge}>
              <Sparkles size={13} color="#C59A78" />
              <span>AC Cottages & Suites</span>
            </div>
            <h2 className={styles.title}>Recommended Places to Stay</h2>
            <p className={styles.subtitle}>
              Handpicked deluxe rooms and standalone cottages featuring pool views, split AC, and private sit-outs.
            </p>
          </div>

          <div className={styles.headerActions}>
            {/* Category Filter Pills */}
            <div className={styles.filterPills}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Link href="/rooms" className={styles.seeAllBtn}>
              <span>See All ({rooms.length} Accommodations)</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C59A78', margin: '16px 0' }}>
            <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '13px', letterSpacing: '0.5px' }}>Checking live availability & rates...</span>
          </div>
        )}

        {/* Room Grid */}
        <div className={styles.grid}>
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
