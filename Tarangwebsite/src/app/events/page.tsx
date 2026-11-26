import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PartyPopper,
  Sparkles,
  Users,
  Music,
  Flame,
  CheckCircle2,
  CalendarCheck,
  MessageCircle,
} from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './EventsPage.module.scss';

export const metadata: Metadata = {
  title: 'Events & Celebrations | Tarangan Resort Nagaon-Alibag',
  description:
    'Host unforgettable celebrations at Tarangan Resort in Nagaon, Alibag. Birthday lawn parties, poolside get-togethers, corporate offsites, and evening bonfire gatherings.',
};

export default function EventsPage() {
  const eventTypes = [
    {
      title: 'Birthday & Anniversary Celebrations',
      desc: 'Celebrate milestones under swaying coconut palms. We arrange festive lawn decorations, fairy lighting, poolside celebration setups, and evening snacks.',
      image: '/images/facilities/pool-aerial-night.jpg',
      features: [
        'Illuminated poolside party atmosphere with fairy lights',
        'Special birthday cake and celebration arrangements',
        'Poolside audio system for celebration music',
        'Buffet dining with fresh seafood and Konkani thalis',
      ],
    },
    {
      title: 'Family Reunions & Group Weekends',
      desc: 'With 12 private deluxe cottages sleeping up to 45 guests across the property, enjoy exclusive group privacy with children pool, games, and large communal dining.',
      image: '/images/facilities/lawn-lotus-pond.jpg',
      features: [
        'Interconnected and neighboring cottage clusters ("हेमंत", "वसंत", "शिशिर")',
        'Kids splash pool and open garden lawn',
        'Community dining with home-style Konkani dishes',
        'Group bonfire nights with roasted snacks',
      ],
    },
    {
      title: 'Corporate Day-Outs & Team Retreats',
      desc: 'Recharge your team away from stressful city screens. Combine morning water sports at Nagaon Beach with open-air team building workshops and relaxing evening pool dips.',
      image: '/images/hero/hero-drone-sunset.jpg',
      features: [
        'High-speed Wi-Fi across resort grounds',
        'Uninterrupted generator power backup',
        'Breakfast, buffet lunch, and evening tea breaks',
        'Flexible day-use and overnight package options',
      ],
    },
  ];

  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Memorable Moments</span>
          </div>
          <h1 className={styles.bannerTitle}>Events & Gatherings</h1>
          <p className={styles.bannerSub}>
            Celebrate life’s joyous occasions in our peaceful green coconut orchards and poolside lawns.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.eventsSection}>
        <div className={styles.container}>
          <div className={styles.eventsList}>
            {eventTypes.map((evt, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  className={`${styles.eventCard} ${isEven ? styles.cardReverse : ''}`}
                >
                  <div className={styles.imageCol}>
                    <img src={evt.image} alt={evt.title} loading="lazy" />
                  </div>

                  <div className={styles.textCol}>
                    <h2 className={styles.eventTitle}>{evt.title}</h2>
                    <p className={styles.eventDesc}>{evt.desc}</p>

                    <div className={styles.featuresBox}>
                      <h4 className={styles.featuresHeading}>Included Arrangements</h4>
                      <div className={styles.featuresGrid}>
                        {evt.features.map((f, i) => (
                          <div key={i} className={styles.featureItem}>
                            <CheckCircle2 size={16} color="#C59A78" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Group Booking Inquiry CTA */}
          <div className={styles.inquiryCard}>
            <div className={styles.inquiryContent}>
              <h3 className={styles.inquiryTitle}>Plan Your Group Event at Tarangan</h3>
              <p className={styles.inquiryText}>
                Contact our resort event manager directly to discuss custom guest capacity, tailored food menus, lawn decoration options, and special group package discounts.
              </p>
            </div>
            <div className={styles.inquiryButtons}>
              <a
                href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
                  'Hello Tarangan Resort! We are planning a group celebration / event and would like to discuss packages and availability.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Event Manager</span>
              </a>
              <a href={`tel:${RESORT_DATA.phone}`} className={styles.callBtn}>
                Call {RESORT_DATA.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
