'use client';

import React from 'react';
import Link from 'next/link';
import {
  Waves,
  Smile,
  Utensils,
  Trees,
  Flame,
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { FACILITIES_DATA } from '@/data/facilitiesData';
import styles from './FacilitiesGrid.module.scss';

const iconMap: Record<string, React.ReactNode> = {
  Waves: <Waves size={19} />,
  Smile: <Smile size={19} />,
  Utensils: <Utensils size={19} />,
  Trees: <Trees size={19} />,
  Flame: <Flame size={19} />,
  Heart: <Heart size={19} />,
  ShieldCheck: <ShieldCheck size={19} />,
  Sparkles: <Sparkles size={19} />,
};

export default function FacilitiesGrid() {
  return (
    <section className={styles.section} id="amenities">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#C59A78" />
            <span>Resort Amenities</span>
          </div>
          <h2 className={styles.title}>Designed for Comfort, Leisure & Togetherness</h2>
          <p className={styles.subtitle}>
            From invigorating morning swims and authentic coastal feasts to crackling bonfires and open pet-friendly lawns.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className={styles.grid}>
          {FACILITIES_DATA.slice(0, 6).map((fac) => (
            <div key={fac.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${fac.image})` }}
                />
                <div className={styles.imageOverlay} />
                <span className={styles.categoryPill}>{fac.category}</span>
                <div className={styles.iconBadge} title={fac.name}>
                  {iconMap[fac.icon] || <Sparkles size={19} />}
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{fac.name}</h3>
                <p className={styles.cardDesc}>{fac.description}</p>

                <ul className={styles.detailList}>
                  {fac.details.slice(0, 2).map((d, i) => (
                    <li key={i}>
                      <CheckCircle2 size={13} className={styles.checkIcon} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link href="/facilities" className={styles.viewAllBtn}>
            <span>View All Facilities & Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
