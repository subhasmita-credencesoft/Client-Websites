import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Waves,
  Star,
  CheckCircle2,
  Users,
  Coffee,
  CalendarCheck,
} from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './AboutPage.module.scss';

export const metadata: Metadata = {
  title: 'About Us | Tarangan Resort Nagaon-Alibag',
  description:
    'Learn about Tarangan Resort on Sahan Bypass Road, Palhe, Nagaon. 12 deluxe AC cottages, a clean swimming pool, and authentic Maharashtrian Konkani hospitality.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Our Heritage & Philosophy</span>
          </div>
          <h1 className={styles.bannerTitle}>About Tarangan Resort</h1>
          <p className={styles.bannerSub}>
            A 3-star tranquil boutique haven nestled in the lush coconut palms of Palhe, Nagaon, Alibaug.
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <h2 className={styles.sectionHeading}>
                Welcome to Your Coastal Home Away From Home
              </h2>
              <p className={styles.leadParagraph}>
                Tarangan Resort was conceived as a peaceful respite from the chaotic pace of Mumbai and Pune. Situated on Sahan Bypass Road in Palhe, Nagaon, our property is surrounded by traditional Konkani betel nut (supari) groves and coconut orchards, offering cool sea air and quiet birdsong throughout the year.
              </p>
              <p className={styles.bodyParagraph}>
                Featuring 12 private air-conditioned deluxe cottages with king bedding and attached modern bathrooms, our resort centers around a crystal-clear outdoor swimming pool and separate kids splash pool. We pride ourselves on authentic Maharashtrian hospitality — where our cooperative staff and owners treat every guest with personalized warmth.
              </p>
              <p className={styles.bodyParagraph}>
                From our kitchen, guests delight in authentic coastal Konkani cuisine: daily fresh Surmai, Pomfret fry, juicy Prawns masala, country chicken Kombdi Vade, and freshly made Solkadhi. Whether you are traveling with family, planning a pet-friendly retreat, or gathering for an evening bonfire, Tarangan promises genuine relaxation.
              </p>

              <div className={styles.highlightsGrid}>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>
                    <Waves size={20} color="#C59A78" />
                  </div>
                  <div>
                    <h4>Clean Filtered Swimming Pool</h4>
                    <p>Maintained daily with safe children splash area & loungers.</p>
                  </div>
                </div>

                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>
                    <Coffee size={20} color="#C59A78" />
                  </div>
                  <div>
                    <h4>Authentic Maharashtrian Food</h4>
                    <p>Fresh local coastal catch cooked with Malvani stone-ground spices.</p>
                  </div>
                </div>

                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>
                    <Heart size={20} color="#C59A78" />
                  </div>
                  <div>
                    <h4>Warm & Cooperative Hosts</h4>
                    <p>Highly praised in 161+ Google reviews for caring, attentive service.</p>
                  </div>
                </div>

                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>
                    <ShieldCheck size={20} color="#C59A78" />
                  </div>
                  <div>
                    <h4>100% Power Backup & Wi-Fi</h4>
                    <p>Uninterrupted quiet generator backup ensuring seamless stays.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.storyImages}>
              <div className={styles.imageCardLarge}>
                <img
                  src="/images/rooms/deluxe-pool-view-1.jpg"
                  alt="Deluxe cottage at Tarangan Resort"
                />
              </div>
              <div className={styles.imageCardSmall}>
                <img
                  src="/images/facilities/pool-day.jpg"
                  alt="Poolside ambiance"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>12</span>
              <span className={styles.statLabel}>AC Deluxe Cottages</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>4.7 ★</span>
              <span className={styles.statLabel}>Google Rating (161+ Reviews)</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>4.1 km</span>
              <span className={styles.statLabel}>To Nagaon Beach Watersports</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Pet-Friendly Green Havens</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Experience Tarangan Firsthand</h2>
            <p className={styles.ctaSub}>
              Discover peaceful coastal cottages, cool off in the swimming pool, and relish fresh coastal seafood thalis.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/rooms" className={styles.primaryBtn}>
                View Cottages & Rates
              </Link>
              <Link href="/contact" className={styles.outlineBtn}>
                Contact Resort Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
