'use client';

import React from 'react';
import Link from 'next/link';
import { Utensils, ArrowRight, Sparkles, Flame, Clock } from 'lucide-react';
import { DINING_DATA } from '@/data/diningData';
import styles from './DiningSpotlight.module.scss';

export default function DiningSpotlight() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#C59A78" />
            <span>Coastal Culinary Feast</span>
          </div>
          <h2 className={styles.title}>Authentic Maharashtrian & Fresh Coastal Seafood</h2>
          <p className={styles.subtitle}>
            Cooked with daily fresh catch from local coastal harbors, fragrant Malvani spices, and freshly grated coconut.
          </p>
        </div>

        {/* Featured Dishes Showcase */}
        <div className={styles.dishGrid}>
          {DINING_DATA.specialties.slice(0, 4).map((dish, i) => (
            <div key={i} className={styles.dishCard}>
              <div
                className={styles.dishImg}
                style={{ backgroundImage: `url(${dish.image})` }}
              >
                {dish.isSpecial && (
                  <div className={styles.specialTag}>Chef’s Special</div>
                )}
              </div>

              <div className={styles.dishContent}>
                <span className={styles.dishCategory}>{dish.category}</span>
                <h3 className={styles.dishName}>{dish.name}</h3>
                <p className={styles.dishDesc}>{dish.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner / Chef Note */}
        <div className={styles.chefBanner}>
          <div className={styles.chefContent}>
            <div className={styles.chefIcon}>
              <Utensils size={28} color="#C59A78" />
            </div>
            <div>
              <h4 className={styles.chefTitle}>Pure Home-Style Konkani Hospitality</h4>
              <p className={styles.chefText}>{DINING_DATA.chefNote}</p>
              <div className={styles.timingPills}>
                <span className={styles.timeItem}>
                  <Clock size={13} /> Lunch: 12:30 PM – 03:30 PM
                </span>
                <span className={styles.timeItem}>
                  <Clock size={13} /> Dinner: 08:00 PM – 11:00 PM
                </span>
              </div>
            </div>
          </div>

          <Link href="/dining" className={styles.menuBtn}>
            <span>Explore Full Restaurant Menu</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
