'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { EXPERIENCES_DATA } from '@/data/experiencesData';
import styles from './ExperiencesShowcase.module.scss';

export default function ExperiencesShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#C59A78" />
            <span>Alibaug & Nagaon Wonders</span>
          </div>
          <h2 className={styles.title}>Experiences Just Minutes Away</h2>
          <p className={styles.subtitle}>
            From high-octane water adventures at Nagaon Beach to tranquil shoreline walks and historic Maratha sea citadels.
          </p>
        </div>

        <div className={styles.grid}>
          {EXPERIENCES_DATA.map((exp) => (
            <div key={exp.id} className={styles.expCard}>
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${exp.image})` }}
              >
                <div className={styles.imageOverlay} />
                <div className={styles.distBadge}>
                  <MapPin size={12} />
                  <span>{exp.distance}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.categoryRow}>
                  <span className={styles.category}>{exp.category}</span>
                  <span className={styles.duration}>
                    <Clock size={12} /> {exp.duration}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{exp.title}</h3>
                <p className={styles.cardDesc}>{exp.shortDesc}</p>

                <div className={styles.highlights}>
                  {exp.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className={styles.highlightPill}>
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link href="/experiences" className={styles.exploreAllBtn}>
            <span>Explore All Alibaug Sightseeing Tours</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
