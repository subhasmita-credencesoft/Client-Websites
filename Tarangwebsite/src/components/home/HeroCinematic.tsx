'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  Star,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useClickOutside } from '@/hooks';
import {
  getTodayDateString,
  getTomorrowDateString,
  generateBookingEngineUrl,
  HOTEL_API_CONFIG,
} from '@/services/hotelApi';
import styles from './HeroCinematic.module.scss';

const SLIDES = [
  {
    id: 1,
    titleLine1: 'WELCOME TO',
    titleLine2: 'TARANGAN RESORT',
    subtitle: 'Nagaon, Alibaug — 4.1 km from Nagaon Beach',
    captionHeading: 'Authentic Konkani Cottages',
    captionDesc:
      'Immerse in peaceful green orchards, stone walkways, and standalone deluxe cottages surrounded by coconut groves.',
    image: '/images/hero/hero-cottage-row.jpg',
    thumb: '/images/hero/hero-cottage-row.jpg',
    thumbLabel: 'Cottages',
  },
  {
    id: 2,
    titleLine1: 'AZURE POOL &',
    titleLine2: 'NATURE RETREAT',
    subtitle: 'Crystal-clear swimming pool & kids splash pool surrounded by palms',
    captionHeading: 'Lush Resort Grounds',
    captionDesc:
      'Daily filtered azure swimming pool, sun loungers, and expansive green orchards just minutes from Nagaon Beach.',
    image: '/images/hero/hero-drone-sunset.jpg',
    thumb: '/images/facilities/pool-day.jpg',
    thumbLabel: 'Swimming Pool',
  },
  {
    id: 3,
    titleLine1: 'DELUXE AC',
    titleLine2: 'COTTAGES & SUITES',
    subtitle: 'Private boutique cottages & spacious suites with nature views',
    captionHeading: 'Starlit Nature Ambiance',
    captionDesc:
      'Spacious standalone cottages featuring private verandas, split AC, instantaneous hot water geysers, and 24/7 power backup.',
    image: '/images/hero/hero-drone-night.jpg',
    thumb: '/images/facilities/pool-aerial-night.jpg',
    thumbLabel: 'Deluxe Suites',
  },
  {
    id: 4,
    titleLine1: 'AUTHENTIC',
    titleLine2: 'KONKANI SEAFOOD',
    subtitle: 'Fresh Surmai Rava Fry, Pomfret, Prawns & Solkadhi',
    captionHeading: 'Coastal Culinary Delight',
    captionDesc:
      'Savor authentic Maharashtrian coastal recipes prepared with freshly caught fish and traditional Malvani spices.',
    image: '/images/dining/surmai-rava-fry.jpg',
    thumb: '/images/dining/pomfret-fry-plate.jpg',
    thumbLabel: 'Konkani Seafood',
  },
];

export default function HeroCinematic() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isWiping, setIsWiping] = useState(false);

  // Dynamic Booking Dates & Guests
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);

  useEffect(() => {
    setCheckIn(getTodayDateString());
    setCheckOut(getTomorrowDateString());
  }, []);

  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close guest popover on outside click
  useClickOutside(searchBarRef, () => {
    setGuestPickerOpen(false);
  });

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = (index: number) => {
    if (index === currentSlide || isWiping) return;
    setIsWiping(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsWiping(false);
    }, 900);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className={styles.heroSection}>
      {/* Background Slides Stack */}
      <div className={styles.slideStack}>
        {SLIDES.map((s, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={s.id}
              className={`${styles.slideLayer} ${isActive ? styles.active : ''}`}
              style={{
                backgroundImage: `url(${s.image})`,
              }}
            >
              {/* Clean Subtle Tint Without Smog / Muddy Haze */}
              <div className={styles.slideOverlay} />
            </div>
          );
        })}
      </div>

      {/* Slide Content */}
      <div className={styles.heroContent}>
        <div className={styles.badgeRow}>
          <div className={styles.pillBadge}>
            <Star size={14} fill="#F7C325" color="#F7C325" />
            <span>4.7 Google Rated Resort • 161+ Reviews</span>
          </div>
          <div className={styles.locationPill}>
            <MapPin size={13} color="#C59A78" />
            <span>Sahan Bypass Rd, Nagaon, Alibaug</span>
          </div>
        </div>

        {/* Giant Frosted Titles */}
        <div className={styles.titleWrap}>
          <h1 className={styles.giantTitle}>
            <span className={styles.wordLine}>{slide.titleLine1}</span>
            <span className={styles.wordLineAccent}>{slide.titleLine2}</span>
          </h1>
          <p className={styles.heroSubtitle}>{slide.subtitle}</p>
        </div>

        {/* Quick Highlights Pills */}
        <div className={styles.quickFeatures}>
          <span className={styles.featPill}>
            <Sparkles size={13} color="#C59A78" /> Swimming Pool & Kids Pool
          </span>
          <span className={styles.featPill}>
            <ShieldCheck size={13} color="#C59A78" /> 100% Power Backup
          </span>
          <span className={styles.featPill}>
            <MapPin size={13} color="#C59A78" /> 4.1 km to Nagaon Beach
          </span>
        </div>

        {/* Mobile Quick Book CTA Button (shown when booking bar is hidden) */}
        <div className={styles.mobileHeroCtaWrap}>
          <Link
            href={`/booking?checkIn=${checkIn || getTodayDateString()}&checkOut=${checkOut || getTomorrowDateString()}&adults=${adults}&children=${children}`}
            className={styles.mobileHeroBookBtn}
          >
            <span>Book Online (Best Rates)</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Right Rail: Interactive Thumbnails with Concentric Halo Rings */}
      <div className={styles.rightRail}>
        {/* Active Caption Block */}
        <div className={styles.captionBlock}>
          <div className={styles.captionAccentLine} />
          <div className={styles.captionText}>
            <span className={styles.captionHeading}>{slide.captionHeading}</span>
            <p className={styles.captionDesc}>{slide.captionDesc}</p>
          </div>
        </div>

        {/* Connector Line */}
        <div className={styles.connectorLine} />

        {/* Thumbnails Column */}
        <div className={styles.thumbColumn}>
          {SLIDES.map((s, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={s.id}
                type="button"
                className={`${styles.thumbBtn} ${isActive ? styles.activeThumb : ''}`}
                onClick={() => handleSlideChange(idx)}
                aria-label={`Switch to slide ${idx + 1}: ${s.captionHeading}`}
              >
                <div
                  className={styles.thumbImg}
                  style={{ backgroundImage: `url(${s.thumb})` }}
                />
                {isActive && <div className={styles.haloRing} />}
                <span className={styles.thumbLabel}>{s.thumbLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Search Bar: Floating prominently at the bottom of the Hero */}
      <div className={styles.searchBarWrapper} ref={searchBarRef}>
        <div className={styles.searchBar}>
          {/* Check-in Date */}
          <div className={styles.searchField}>
            <div className={styles.fieldIcon}>
              <Calendar size={18} color="#C59A78" />
            </div>
            <div className={styles.fieldContent}>
              <span className={styles.fieldLabel}>Check-in</span>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className={styles.dateInput}
                aria-label="Check-in date"
              />
            </div>
          </div>

          <div className={styles.fieldDivider} />

          {/* Check-out Date */}
          <div className={styles.searchField}>
            <div className={styles.fieldIcon}>
              <Calendar size={18} color="#C59A78" />
            </div>
            <div className={styles.fieldContent}>
              <span className={styles.fieldLabel}>Check-out</span>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className={styles.dateInput}
                aria-label="Check-out date"
              />
            </div>
          </div>

          <div className={styles.fieldDivider} />

          {/* Guests Popover */}
          <div className={styles.searchField} style={{ position: 'relative' }}>
            <button
              type="button"
              className={styles.guestSelectBtn}
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              aria-expanded={guestPickerOpen}
              aria-label="Select number of guests"
            >
              <div className={styles.fieldIcon}>
                <Users size={18} color="#C59A78" />
              </div>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Guests</span>
                <div className={styles.fieldValueWithChevron}>
                  <span className={styles.fieldValue}>
                    {adults} Adults{children > 0 ? `, ${children} Kids` : ''}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${guestPickerOpen ? styles.chevronRotated : ''}`}
                  />
                </div>
              </div>
            </button>

            {guestPickerOpen && (
              <div className={styles.guestsPopover}>
                <div className={styles.popoverHeader}>
                  <span className={styles.popoverTitle}>Guests & Rooms</span>
                </div>

                <div className={styles.guestRow}>
                  <div>
                    <div className={styles.guestType}>Adults</div>
                    <div className={styles.guestNote}>Ages 12+</div>
                  </div>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(adults - 1)}
                      aria-label="Decrease adults"
                    >
                      -
                    </button>
                    <span>{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 10}
                      onClick={() => setAdults(adults + 1)}
                      aria-label="Increase adults"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.guestRow}>
                  <div>
                    <div className={styles.guestType}>Children</div>
                    <div className={styles.guestNote}>Ages 2-11</div>
                  </div>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(children - 1)}
                      aria-label="Decrease children"
                    >
                      -
                    </button>
                    <span>{children}</span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={() => setChildren(children + 1)}
                      aria-label="Increase children"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.popoverFooter}>
                  <button
                    type="button"
                    className={styles.applyBtn}
                    onClick={() => setGuestPickerOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search / Book CTA */}
          <Link
            href={`/booking?checkIn=${checkIn || getTodayDateString()}&checkOut=${checkOut || getTomorrowDateString()}&adults=${adults}&children=${children}`}
            className={styles.searchSubmitBtn}
            title="Check Room Availability & Rates"
          >
            <span>Check Rates</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
