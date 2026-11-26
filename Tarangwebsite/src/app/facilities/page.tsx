import React from 'react';
import type { Metadata } from 'next';
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
  Wifi,
  Car,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { FACILITIES_DATA } from '@/data/facilitiesData';
import styles from './FacilitiesPage.module.scss';

export const metadata: Metadata = {
  title: 'Facilities & Amenities | Tarangan Resort Nagaon-Alibag',
  description:
    'Explore on-site amenities at Tarangan Resort in Nagaon, Alibag. Clean outdoor swimming pool, kids splash pool, in-house coastal seafood restaurant, lush lawns, bonfire, pet-friendly stay, and power backup.',
};

const iconMap: Record<string, React.ReactNode> = {
  Waves: <Waves size={26} />,
  Smile: <Smile size={26} />,
  Utensils: <Utensils size={26} />,
  Trees: <Trees size={26} />,
  Flame: <Flame size={26} />,
  Heart: <Heart size={26} />,
  ShieldCheck: <ShieldCheck size={26} />,
  Sparkles: <Sparkles size={26} />,
};

export default function FacilitiesPage() {
  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Unmatched Leisure Amenities</span>
          </div>
          <h1 className={styles.bannerTitle}>Resort Facilities & Services</h1>
          <p className={styles.bannerSub}>
            Designed to pamper you with refreshing swims, mouth-watering Konkani meals, starry bonfires, and pet-friendly lawns.
          </p>
        </div>
      </section>

      {/* Facilities Deep List */}
      <section className={styles.facilitiesSection}>
        <div className={styles.container}>
          <div className={styles.facilitiesList}>
            {FACILITIES_DATA.map((fac, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={fac.id}
                  className={`${styles.facilityRow} ${isEven ? styles.rowReverse : ''}`}
                >
                  <div className={styles.imageCol}>
                    <img src={fac.image} alt={fac.name} loading="lazy" />
                    <div className={styles.iconFloating}>
                      {iconMap[fac.icon] || <Sparkles size={24} />}
                    </div>
                  </div>

                  <div className={styles.textCol}>
                    <span className={styles.categoryBadge}>{fac.category}</span>
                    <h2 className={styles.facilityName}>{fac.name}</h2>
                    <h4 className={styles.facilityTagline}>{fac.tagline}</h4>
                    <p className={styles.facilityDesc}>{fac.description}</p>

                    <div className={styles.detailsBox}>
                      <h5 className={styles.detailsHeading}>Highlights & Guidelines</h5>
                      <ul className={styles.bulletList}>
                        {fac.details.map((item, i) => (
                          <li key={i}>
                            <CheckCircle2 size={16} color="#C59A78" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Summary Grid */}
      <section className={styles.summaryBarSection}>
        <div className={styles.container}>
          <h3 className={styles.quickTitle}>Complimentary For All Resident Guests</h3>
          <div className={styles.quickGrid}>
            <div className={styles.quickItem}>
              <Wifi size={24} color="#C59A78" />
              <span>High-Speed Wi-Fi</span>
            </div>
            <div className={styles.quickItem}>
              <Car size={24} color="#C59A78" />
              <span>Free On-Site Parking</span>
            </div>
            <div className={styles.quickItem}>
              <ShieldCheck size={24} color="#C59A78" />
              <span>24/7 Power Backup</span>
            </div>
            <div className={styles.quickItem}>
              <Heart size={24} color="#C59A78" />
              <span>Pet-Friendly Grounds</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
