'use client';

import Link from 'next/link';
import type { PointerEvent } from 'react';
import { hotel } from '@/data/site';

export default function SiteFooter() {
  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <footer className="site-footer" onPointerMove={trackPointer}>
      {/* ─── Premium Animated Background SVG & Atmospheric Canvas ─── */}
      <div className="footer-backdrop" aria-hidden="true">
        <svg
          className="footer-canvas"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="footerGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cb6e26" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#e8a45e" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#cb6e26" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="footerWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8a45e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#964817" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="footerWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd8a8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#cb6e26" stopOpacity="0.0" />
            </linearGradient>
            <radialGradient id="footerGlowOrb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e8a45e" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#cb6e26" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#12130f" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Atmospheric ambient glow */}
          <circle cx="50%" cy="60%" r="340" fill="url(#footerGlowOrb)" className="footer-glow-pulse" />

          {/* Flowing animated heritage wave lines (Tungabhadra river contours) */}
          <path
            className="footer-wave footer-wave--1"
            d="M-80,290 C220,200 480,390 760,280 C1040,170 1260,350 1560,260"
            stroke="url(#footerGoldGrad)"
            strokeWidth="1.6"
          />
          <path
            className="footer-wave footer-wave--2"
            d="M-80,350 C260,420 540,250 840,360 C1140,470 1320,300 1560,350"
            stroke="url(#footerWaveGrad1)"
            strokeWidth="1.2"
            strokeDasharray="8 8"
          />
          <path
            className="footer-wave footer-wave--3"
            d="M-80,410 C320,340 620,480 920,390 C1220,300 1380,430 1560,400"
            stroke="url(#footerWaveGrad2)"
            strokeWidth="1"
          />

          {/* Royal Palace Heritage Mandala (Right) */}
          <g className="footer-mandala footer-mandala--right">
            <circle r="190" stroke="#e8a45e" strokeWidth="0.6" strokeDasharray="3 8" opacity="0.32" />
            <circle r="150" stroke="#e8a45e" strokeWidth="0.8" opacity="0.38" />
            <circle r="110" stroke="#e8a45e" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.28" />
            <circle r="70" stroke="#e8a45e" strokeWidth="0.8" opacity="0.45" />
            <circle r="24" stroke="#e8a45e" strokeWidth="1.2" opacity="0.6" />
            <path d="M0,-190 L16,-150 L0,-110 L-16,-150 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.4" />
            <path d="M0,190 L16,150 L0,110 L-16,150 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.4" />
            <path d="M-190,0 L-150,16 L-110,0 L-150,-16 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.4" />
            <path d="M190,0 L150,16 L110,0 L150,-16 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.4" />
            <path d="M-134,-134 L-106,-92 L-78,-78 L-92,-106 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.32" />
            <path d="M134,-134 L106,-92 L78,-78 L92,-106 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.32" />
            <path d="M-134,134 L-106,92 L-78,78 L-92,106 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.32" />
            <path d="M134,134 L106,92 L78,78 L92,106 Z" stroke="#e8a45e" strokeWidth="0.7" opacity="0.32" />
            <line x1="0" y1="-190" x2="0" y2="190" stroke="#e8a45e" strokeWidth="0.5" opacity="0.22" />
            <line x1="-190" y1="0" x2="190" y2="0" stroke="#e8a45e" strokeWidth="0.5" opacity="0.22" />
            <line x1="-134" y1="-134" x2="134" y2="134" stroke="#e8a45e" strokeWidth="0.5" opacity="0.22" />
            <line x1="-134" y1="134" x2="134" y2="-134" stroke="#e8a45e" strokeWidth="0.5" opacity="0.22" />
          </g>

          {/* Secondary Heritage Mandala (Left) */}
          <g className="footer-mandala footer-mandala--left">
            <circle r="140" stroke="#e8a45e" strokeWidth="0.5" strokeDasharray="2 7" opacity="0.2" />
            <circle r="95" stroke="#e8a45e" strokeWidth="0.6" opacity="0.25" />
            <circle r="45" stroke="#e8a45e" strokeWidth="0.7" opacity="0.3" />
            <line x1="0" y1="-140" x2="0" y2="140" stroke="#e8a45e" strokeWidth="0.4" opacity="0.18" />
            <line x1="-140" y1="0" x2="140" y2="0" stroke="#e8a45e" strokeWidth="0.4" opacity="0.18" />
          </g>

          {/* Twinkling star dust nodes */}
          <circle cx="140" cy="160" r="1.6" fill="#ffd8a8" className="footer-star footer-star--1" />
          <circle cx="360" cy="80" r="2.2" fill="#e8a45e" className="footer-star footer-star--2" />
          <circle cx="580" cy="210" r="1.8" fill="#ffd8a8" className="footer-star footer-star--3" />
          <circle cx="820" cy="100" r="2.4" fill="#ffffff" className="footer-star footer-star--4" />
          <circle cx="1020" cy="240" r="1.6" fill="#ffd8a8" className="footer-star footer-star--5" />
          <circle cx="1200" cy="70" r="2.2" fill="#e8a45e" className="footer-star footer-star--6" />
          <circle cx="1360" cy="180" r="1.8" fill="#ffffff" className="footer-star footer-star--7" />
          <circle cx="480" cy="370" r="1.5" fill="#ffd8a8" className="footer-star footer-star--8" />
          <circle cx="910" cy="450" r="2" fill="#e8a45e" className="footer-star footer-star--9" />
        </svg>
      </div>

      {/* ─── Top Regional Marquee Ribbon ─── */}
      <div className="footer-marquee" aria-label="Hosapete, Hampi, Anegundi, Aihole, Badami and Pattadakal">
        <div className="footer-marquee__track" aria-hidden="true">
          <span>Hosapete <i>·</i> Hampi <i>·</i> Anegundi <i>·</i> Aihole <i>·</i> Badami <i>·</i> Pattadakal <i>·</i> Tungabhadra <i>·</i></span>
          <span>Hosapete <i>·</i> Hampi <i>·</i> Anegundi <i>·</i> Aihole <i>·</i> Badami <i>·</i> Pattadakal <i>·</i> Tungabhadra <i>·</i></span>
        </div>
      </div>

      {/* ─── Redesigned 4-Column Luxury Editorial Grid ─── */}
      <div className="footer-main">
        {/* Col 1: Brand & Heritage */}
        <div className="footer-col footer-col--brand">
          <img src="/logo.jpg" alt="Hotel Krishna Palace Crest" className="footer-logo" />
          <div className="footer-brand">Krishna Palace</div>
          <span className="footer-subbrand">Hosapete · Karnataka</span>
          <p className="footer-brand-desc">
            An established landmark of royal hospitality on Station Road, welcoming travellers to the stone-carved heritage of Hampi and the Tungabhadra valley since 2008.
          </p>
          <a
            className="footer-book-cta"
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Book Your Stay</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Col 2: Navigation */}
        <div className="footer-col">
          <span className="footer-col__eyebrow">Explore</span>
          <h3>Find your way</h3>
          <ul className="footer-nav-list">
            <li><Link href="/">The Hotel Overview</Link></li>
            <li><Link href="/rooms-rates/">Rooms &amp; Tariffs</Link></li>
            <li><Link href="/banquet/">Banquets &amp; Events</Link></li>
            <li><Link href="/tourism/">Places to Explore</Link></li>
            <li><Link href="/contact/#contact-details">Location &amp; Contact</Link></li>
            <li><Link href="/#faq">Guest FAQs</Link></li>
          </ul>
        </div>

        {/* Col 3: Dining Collection */}
        <div className="footer-col">
          <span className="footer-col__eyebrow">Culinary</span>
          <h3>Dining &amp; Bar</h3>
          <ul className="footer-nav-list">
            <li><Link href="/dining/">The Dining Collection</Link></li>
            <li><Link href="/dining/fiesta/">Fiesta All-Day Dining</Link></li>
            <li><Link href="/dining/madira/">Madira The Bar &amp; Lounge</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact & Concierge */}
        <div className="footer-col footer-col--contact">
          <span className="footer-col__eyebrow">Reservations</span>
          <h3>Say hello</h3>
          <address>{hotel.address}</address>
          <div className="footer-contact-actions">
            <a href={`tel:${hotel.phoneHref}`} className="footer-contact-link">
              <span className="footer-contact-icon">📞</span>
              <span>{hotel.phoneDisplay}</span>
            </a>
            <a href={`mailto:${hotel.reservationEmail}`} className="footer-contact-link">
              <span className="footer-contact-icon">✉️</span>
              <span>{hotel.reservationEmail}</span>
            </a>
          </div>
          <div className="footer-stay-badge">
            <strong>24 hrs</strong>
            <span>Stay Policy · 12 PM Check-in</span>
          </div>
        </div>
      </div>

      {/* ─── Footer Bottom Ribbon ─── */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} Hotel Krishna Palace · Station Road, Hosapete, Karnataka 583201
        </span>
        <span className="footer-credits">
          Designed and Developed By{' '}
          <a href="https://credencesoft.in/" target="_blank" rel="noopener noreferrer">CredenceSoft</a>
          {' '}· Powered By{' '}
          <a href="https://bookonepms.com/" target="_blank" rel="noopener noreferrer">BookOne</a>
        </span>
      </div>
    </footer>
  );
}
