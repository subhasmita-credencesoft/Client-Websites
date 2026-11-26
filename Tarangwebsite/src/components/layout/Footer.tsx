'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ExternalLink,
  Star,
  Waves,
  ShieldCheck,
  Heart,
  CalendarCheck,
} from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Wave / Curved Border Accent */}
      <div className={styles.waveBorder} aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path
            d="M0 60 C360 10 1080 10 1440 60 L1440 0 L0 0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Main Footer Grid */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandLockup}>
              <img
                src="/logo.png"
                alt="Tarangan Resort Official Logo"
                className={styles.footerLogoImg}
                width={52}
                height={52}
              />
              <div className={styles.brandText}>
                <h3 className={styles.brandName}>TARANGAN</h3>
                <span className={styles.brandSub}>RESORT • NAGAON-ALIBAG</span>
              </div>
            </div>

            <p className={styles.brandBlurb}>
              A serene 3-star boutique sanctuary nestled amidst lush coconut and betel nut groves on Sahan Bypass Road, Palhe. Featuring 12 deluxe AC cottages, a crystal-clear swimming pool, and authentic coastal Konkani cuisine.
            </p>

            {/* Google Rating Badge */}
            <div className={styles.ratingBadge}>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F7C325" color="#F7C325" />
                ))}
              </div>
              <span className={styles.ratingText}>
                <strong>{RESORT_DATA.rating}</strong> / 5.0 (161+ Google Reviews)
              </span>
            </div>

            {/* Contact Rows */}
            <div className={styles.contacts}>
              <a href={`tel:${RESORT_DATA.phone}`} className={styles.contactRow}>
                <Phone size={16} />
                <span>{RESORT_DATA.formattedPhone}</span>
              </a>
              <a href={`mailto:${RESORT_DATA.email}`} className={styles.contactRow}>
                <Mail size={16} />
                <span>{RESORT_DATA.email}</span>
              </a>
              <div className={styles.contactRow}>
                <MapPin size={16} />
                <span>{RESORT_DATA.address.full}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Stays & Cottages */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Cottages & Suites</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/rooms/deluxe-pool-view-cottage">Deluxe Pool View Cottage</Link>
              </li>
              <li>
                <Link href="/rooms/premium-garden-cottage">Premium Garden Cottage</Link>
              </li>
              <li>
                <Link href="/rooms/executive-family-suite">Executive Family Suite</Link>
              </li>
              <li>
                <Link href="/rooms/deluxe-ac-cottage-room">Deluxe AC Cottage Room</Link>
              </li>
              <li>
                <Link href="/rooms">View All Accommodations</Link>
              </li>
              <li>
                <a
                  href="https://bookone.io/Tarangan-Resort?bookingEngine=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check Rates & Availability
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resort Experiences */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Experiences</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/facilities">Outdoor Swimming Pool</Link>
              </li>
              <li>
                <Link href="/dining">Authentic Seafood Thalis</Link>
              </li>
              <li>
                <Link href="/experiences">Nagaon Beach Water Sports</Link>
              </li>
              <li>
                <Link href="/experiences">Kolaba Sea Fort Tour</Link>
              </li>
              <li>
                <Link href="/events">Bonfires & Celebrations</Link>
              </li>
              <li>
                <Link href="/location">Ro-Ro Ferry Travel Guide</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Legal */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about">About Tarangan</Link>
              </li>
              <li>
                <Link href="/gallery">Photo Gallery</Link>
              </li>
              <li>
                <Link href="/reviews">Guest Testimonials</Link>
              </li>
              <li>
                <Link href="/faq">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/contact">Directions & Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Booking & Highlights */}
          <div className={styles.bookingCol}>
            <h4 className={styles.colTitle}>Direct Reservation</h4>
            <p className={styles.bookingText}>
              Enjoy guaranteed best rates, zero convenience fees, and personal assistance when booking directly with the resort.
            </p>

            <a
              href="https://bookone.io/Tarangan-Resort?bookingEngine=true"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerBookBtn}
            >
              <CalendarCheck size={16} />
              <span>Book Online (Best Rates)</span>
            </a>

            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <Waves size={15} color="#C59A78" />
                <span>Daily Sanitized Pool</span>
              </div>
              <div className={styles.trustItem}>
                <ShieldCheck size={15} color="#C59A78" />
                <span>100% Power Backup</span>
              </div>
              <div className={styles.trustItem}>
                <Heart size={15} color="#C59A78" />
                <span>Pet-Friendly Resort</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.socialLinks}>
            <a
              href={RESORT_DATA.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialIcon}
            >
              <Instagram size={18} />
            </a>
            <a
              href={RESORT_DATA.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.socialIcon}
            >
              <Facebook size={18} />
            </a>
            <a
              href={RESORT_DATA.social.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tripadvisor"
              className={styles.socialIcon}
            >
              <ExternalLink size={18} />
            </a>
          </div>

          <p className={styles.copyright}>
            Designed and Developed By{' '}
            <a href="https://credencesoft.in/" target="_blank" rel="noopener noreferrer">
              CredenceSoft
            </a>
            , Powered By{' '}
            <a href="https://bookonepms.com/" target="_blank" rel="noopener noreferrer">
              BookOne
            </a>
            .
          </p>

          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Notice</Link>
            <span className={styles.dot}>•</span>
            <Link href="/terms-and-conditions">Terms of Stay</Link>
            <span className={styles.dot}>•</span>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
