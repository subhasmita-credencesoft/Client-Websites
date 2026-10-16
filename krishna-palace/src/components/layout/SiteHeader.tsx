'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { hotel } from '@/data/site';

const links = [
  ['Stay', '/rooms-rates/'],
  ['Dining & Bar', '/dining/'],
  ['Banquet', '/banquet/'],
  ['Explore Hampi', '/tourism/'],
  ['Contact', '/contact/#contact-details'],
];

export default function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(solid);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(solid || window.scrollY > 28);
    update();
    window.addEventListener('scroll', update, { passive: true });
    const savedTheme = window.localStorage.getItem('kp-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setDark(initialDark);
    document.documentElement.dataset.theme = initialDark ? 'dark' : 'light';
    return () => window.removeEventListener('scroll', update);
  }, [solid]);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    window.localStorage.setItem('kp-theme', nextDark ? 'dark' : 'light');
  };

  return (
    <header className={`site-header${solid ? ' site-header--solid' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <Link href="/" className="brand" aria-label="Hotel Krishna Palace home" onClick={() => setOpen(false)}>
        <img src="/images/krishna-palace-crest-logo.png" alt="Hotel Krishna Palace" />
        {/* <span className="brand-label">Hosapete · Karnataka</span> */}
      </Link>

      <div className="header-actions">
        <a
          className="header-book-btn"
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book now
        </a>
        <button
          className={`menu-toggle${open ? ' is-open' : ''}`}
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <span className="menu-toggle__box" aria-hidden="true">
            <span className="menu-toggle__line" />
            <span className="menu-toggle__line" />
            <span className="menu-toggle__line" />
          </span>
        </button>
      </div>

      <nav id="primary-navigation" className={`nav${open ? ' nav--open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => {
              setOpen(false);
              if (href.includes('#')) {
                const id = href.split('#')[1];
                const target = document.getElementById(id);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            {label}
          </Link>
        ))}
        <a className="nav-contact" href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Book now</a>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} aria-pressed={dark}>
          <span>{dark ? 'Night' : 'Day'}</span><span className="theme-switch" aria-hidden="true"><i /></span>
        </button>
      </nav>
    </header>
  );
}
