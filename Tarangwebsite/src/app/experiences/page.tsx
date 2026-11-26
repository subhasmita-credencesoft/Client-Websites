import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { EXPERIENCES_DATA } from '@/data/experiencesData';
import styles from './ExperiencesPage.module.scss';

export const metadata: Metadata = {
  title: 'Experiences & Nagaon Water Sports | Tarangan Resort Nagaon-Alibag',
  description:
    'Discover top things to do near Tarangan Resort: Nagaon Beach water sports, parasailing, jet skiing, Akshi beach, Kolaba Sea Fort, and Revdanda fortress.',
};

export default function ExperiencesPage() {
  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Alibaug & Nagaon Adventures</span>
          </div>
          <h1 className={styles.bannerTitle}>Experiences & Attractions</h1>
          <p className={styles.bannerSub}>
            Discover adrenaline-filled beach watersports, secluded coastal shores, and historic Maratha naval forts just minutes away.
          </p>
        </div>
      </section>

      {/* Experiences Showcase */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.expList}>
            {EXPERIENCES_DATA.map((exp, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={exp.id}
                  className={`${styles.expRow} ${isEven ? styles.rowReverse : ''}`}
                >
                  <div className={styles.imageCol}>
                    <img src={exp.image} alt={exp.title} loading="lazy" />
                    <div className={styles.distanceBadge}>
                      <MapPin size={13} />
                      <span>{exp.distance}</span>
                    </div>
                  </div>

                  <div className={styles.textCol}>
                    <div className={styles.metaRow}>
                      <span className={styles.category}>{exp.category}</span>
                      <span className={styles.duration}>
                        <Clock size={13} /> {exp.duration}
                      </span>
                    </div>

                    <h2 className={styles.expTitle}>{exp.title}</h2>
                    <p className={styles.expFull}>{exp.fullDesc}</p>

                    <div className={styles.highlightsBox}>
                      <h4 className={styles.highlightsHeading}>Experience Highlights</h4>
                      <div className={styles.highlightsGrid}>
                        {exp.highlights.map((h, i) => (
                          <div key={i} className={styles.highlightItem}>
                            <CheckCircle2 size={16} color="#C59A78" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concierge Desk Banner */}
          <div className={styles.conciergeCard}>
            <div className={styles.conciergeContent}>
              <h3 className={styles.conciergeTitle}>Need Local Travel Guidance or Taxis?</h3>
              <p className={styles.conciergeText}>
                Our front desk team will happily coordinate reliable local auto-rickshaws, private tourist cabs, water sports combo discount passes, and Kolaba Fort tide schedules.
              </p>
            </div>
            <Link href="/contact" className={styles.contactBtn}>
              <span>Talk to Front Desk</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
