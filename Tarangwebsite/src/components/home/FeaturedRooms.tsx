'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROOMS_DATA } from '@/data/roomsData';
import RoomCard from './RoomCard';
import styles from './FeaturedRooms.module.scss';

export default function FeaturedRooms() {
  const [filter, setFilter] = useState<'All' | 'Cottage' | 'Deluxe' | 'Family'>('All');

  const filteredRooms = filter === 'All' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter((r) => r.category === filter);

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
              {(['All', 'Cottage', 'Deluxe', 'Family'] as const).map((cat) => (
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
              <span>See All (12 Rooms)</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

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
