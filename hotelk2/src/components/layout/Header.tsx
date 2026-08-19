'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HEADER_CONTACTS, NAV_LINKS, SITE } from '@/data/site';
import { Icon } from '@/components/ui/Icon';
import styles from './Header.module.scss';

const [BRAND_WORD, BRAND_ACCENT] = SITE.name.split(' ');

/**
 * Header (site navigation)
 * Mirrors the source site: a dark top contact bar (phone / email / address),
 * a brand-logo row, primary links, a "Book Now" CTA, and a mobile disclosure toggle.
 * Keyboard: Tab moves through logo → links → CTA → menu toggle (mobile).
 * Escape closes the mobile menu and returns focus to the toggle button.
 * Responsive: the top bar and link list collapse below the `lg` breakpoint.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function close() {
    setIsOpen(false);
  }

  function handleNavKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      close();
      toggleRef.current?.focus();
    }
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          {HEADER_CONTACTS.map((item) => {
            const content = (
              <>
                <Icon name={item.icon} size={14} className={styles.topbarIcon} />
                <span>{item.value}</span>
              </>
            );
            return item.href ? (
              <a key={item.label} className={styles.topbarItem} href={item.href}>
                {content}
              </a>
            ) : (
              <span key={item.label} className={styles.topbarItem}>
                {content}
              </span>
            );
          })}
        </div>
      </div>

      <div className={styles.bar}>
        <div className={styles.barInner}>
          <Link href="/" className={styles.logo} onClick={close} aria-label={`${SITE.name} home`}>
            <span className={styles.logoText}>{BRAND_WORD}</span>
            <span className={styles.logoTextAccent}>{BRAND_ACCENT}</span>
          </Link>

          <nav
            className={styles.nav}
            aria-label="Primary"
            onKeyDown={handleNavKeyDown}
          >
            <ul id="primary-nav-list" className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink} onClick={close}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className={styles.navCta}>
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bookingBtn}
                >
                  Book Now
                </a>
              </li>
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={isOpen}
            aria-controls="primary-nav-list"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className={styles.toggleBar} aria-hidden="true" />
            <span className={styles.toggleBar} aria-hidden="true" />
            <span className={styles.toggleBar} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
