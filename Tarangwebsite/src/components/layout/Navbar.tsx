'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X, CalendarCheck, MapPin, Sparkles } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Rooms & Cottages', href: '/rooms' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Dining', href: '/dining' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Location', href: '/location' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`${styles.navbar} ${
          scrolled || !isHome ? styles.scrolled : styles.transparent
        }`}
      >
        <div className={styles.container}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Tarangan Resort Home">
            <div className={styles.logoMark}>
              <img
                src="/logo.png"
                alt="Tarangan Resort Official Logo"
                className={styles.brandLogoImg}
                width={46}
                height={46}
              />
              <div className={styles.logoText}>
                <span className={styles.brandTitle}>TARANGAN</span>
                <span className={styles.brandSubtitle}>RESORT • NAGAON, ALIBAG</span>
              </div>
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {navLinks.slice(0, 7).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className={styles.navItem}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    >
                      {item.label}
                      <span className={styles.underlineIndicator} />
                    </Link>
                  </li>
                );
              })}
              {/* More dropdown or secondary links */}
              <li className={styles.navItem}>
                <Link
                  href="/gallery"
                  className={`${styles.navLink} ${pathname === '/gallery' ? styles.active : ''}`}
                >
                  Gallery
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  href="/contact"
                  className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Action Buttons */}
          <div className={styles.rightActions}>
            <a
              href={`tel:${RESORT_DATA.phone}`}
              className={styles.phoneLink}
              title="Call Resort Reception"
            >
              <Phone size={15} />
              <span className={styles.phoneText}>{RESORT_DATA.phone}</span>
            </a>

            <a
              href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
                RESORT_DATA.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappPill}
              title="Chat on WhatsApp"
            >
              <MessageCircle size={16} />
              <span className={styles.whatsappText}>WhatsApp</span>
            </a>

            <a
              href="https://bookone.io/Tarangan-Resort?bookingEngine=true"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookNowBtn}
              title="Book Online - Tarangan Booking Engine"
              aria-label="Book Online"
            >
              <CalendarCheck size={16} />
              <span className={styles.bookNowText}>Book Now</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`${styles.mobileDrawer} ${
          mobileMenuOpen ? styles.mobileDrawerOpen : ''
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.mobileDrawerContent}>
          <div className={styles.mobileHeader}>
            <div className={styles.logoMark}>
              <img
                src="/logo.png"
                alt="Tarangan Resort Logo"
                className={styles.brandLogoImg}
                width={40}
                height={40}
              />
              <span className={styles.brandTitle}>TARANGAN RESORT</span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className={styles.mobileRatingBadge}>
            <Sparkles size={14} color="#F7C325" />
            <span>4.7 ★ Rated on Google (161+ Reviews)</span>
          </div>

          <nav className={styles.mobileNavList}>
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${
                    isActive ? styles.mobileActive : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className={styles.arrowIcon}>→</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.mobileDrawerFooter}>
            <div className={styles.mobileContactItem}>
              <MapPin size={16} />
              <span>Sahan Bypass Rd, Palhe, Nagaon, Alibaug</span>
            </div>
            <div className={styles.mobileActionButtons}>
              <a
                href={`tel:${RESORT_DATA.phone}`}
                className={styles.mobileCallBtn}
              >
                <Phone size={16} />
                <span>Call {RESORT_DATA.phone}</span>
              </a>
              <a
                href="https://bookone.io/Tarangan-Resort?bookingEngine=true"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileBookBtn}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CalendarCheck size={16} />
                <span>Book Direct & Save</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
