'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Star, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './AboutSection.module.scss';

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Media Composition */}
          <div className={styles.mediaCol}>
            <div className={styles.imageMain}>
              <img
                src="/images/hero/hero-drone-sunset.jpg"
                alt="Tarangan Resort lush pool and coconut grove"
                loading="lazy"
              />
            </div>
            <div className={styles.imageSecondary}>
              <img
                src="/images/facilities/pool-day.jpg"
                alt="Swimming pool at Tarangan Resort Nagaon"
                loading="lazy"
              />
            </div>

            {/* Floating Experience Card */}
            <div className={styles.floatingCard}>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F7C325" color="#F7C325" />
                ))}
              </div>
              <div className={styles.floatTitle}>4.7 Google Rating</div>
              <p className={styles.floatDesc}>
                161+ verified reviews admiring our peaceful cottages, prompt staff, and authentic seafood.
              </p>
            </div>
          </div>

          {/* Right Text Content */}
          <div className={styles.textCol}>
            <div className={styles.tagBadge}>
              <Sparkles size={13} color="#C59A78" />
              <span>About Tarangan Resort</span>
            </div>

            <h2 className={styles.title}>
              A Peaceful Coastal Oasis in Nagaon, Alibaug
            </h2>

            <p className={styles.leadText}>
              Discover a sanctuary of peace and comfort on the serene outskirts of Alibag near Sahan Bypass Road, Palhe. Tucked away from urban congestion amidst swaying coconut palms and green betel nut orchards, Tarangan Resort offers a restful retreat designed for families, couples, and friends.
            </p>

            <p className={styles.bodyText}>
              Featuring 12 air-conditioned deluxe cottage-style rooms overlooking our crystal-clear outdoor swimming pool and children pool, we blend nature tranquility with thoughtful hospitality. Here, every morning greets you with refreshing coastal breezes, and every evening invites you to relax by our open lawns, savor fresh Arabian Sea seafood thalis, and share stories around a crackling bonfire.
            </p>

            {/* Key Value Points */}
            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <CheckCircle2 size={18} color="#C59A78" />
                <div>
                  <strong>12 AC Deluxe Cottages:</strong> King beds, geysers, pool views & private sit-outs.
                </div>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle2 size={18} color="#C59A78" />
                <div>
                  <strong>Authentic Maharashtrian Food:</strong> Fresh Surmai, Pomfret fry, Solkadhi & veg thalis.
                </div>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle2 size={18} color="#C59A78" />
                <div>
                  <strong>4.1 km from Nagaon Beach:</strong> Quick 8-minute drive to Alibag top water sports hub.
                </div>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle2 size={18} color="#C59A78" />
                <div>
                  <strong>Pet-Friendly Green Haven:</strong> Open garden lawns and round-the-clock power backup.
                </div>
              </div>
            </div>

            <div className={styles.btnRow}>
              <Link href="/about" className={styles.primaryBtn}>
                <span>Read Full Story</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/facilities" className={styles.outlineBtn}>
                <span>Explore Facilities</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
