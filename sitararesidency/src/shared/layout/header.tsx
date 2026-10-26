'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { navItems } from '@/core/constants/nav';
import { business } from '@/core/config/business';
import { useScrolled, useScrollLock, useEscapeKey } from '@/shared/hooks';

export function Header() {
  const [open, setOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const scrolled = useScrolled(10);

  useScrollLock(open);
  useEscapeKey(
    useCallback(() => setOpen(false), []),
    open,
  );

  const toggleSubmenu = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <header
        className={`site-nav ${scrolled ? 'site-nav--solid' : ''}`}
        role="banner"
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <div className="site-nav__bar">
          {/* Left: Hamburger menu toggle + desktop concierge phone */}
          <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-3 md:gap-5">
            <button
              type="button"
              className="site-nav__menu-btn group"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              data-testid="button-menu-toggle"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-black/20 backdrop-blur-md transition-all group-hover:border-terracotta group-hover:bg-terracotta">
                <Menu size={19} className="text-white transition-transform group-hover:scale-110" />
              </div>
              <span className="hidden sm:inline font-mono-label text-[10px] uppercase tracking-widest text-white/90 group-hover:text-apricot transition-colors">
                Menu
              </span>
            </button>

            <a
              href={`tel:${business.phones.primary}`}
              className="hidden lg:flex items-center gap-1.5 font-mono-label text-[11px] text-white/80 hover:text-apricot transition-colors"
            >
              <Phone size={13} className="text-apricot" />
              <span>{business.phones.primaryDisplay}</span>
            </a>
          </div>

          {/* Center: Emblem Logo (always centrally balanced) */}
          <Link
            href="/"
            className="site-nav__logo-wrapper col-start-2 row-start-1"
            aria-label={`${business.name} home`}
            onClick={() => setOpen(false)}
          >
            <div className="site-nav__logo">
              <Image
                src={business.logo}
                alt={business.name}
                width={86}
                height={86}
                priority
              />
            </div>
          </Link>

          {/* Right: Desktop Links + Prominent Book Direct Button */}
          <div className="col-start-3 row-start-1 flex min-w-0 items-center justify-end gap-5">
            <nav className="hidden xl:flex items-center gap-6" aria-label="Quick navigation">
              <Link
                href="/bedrooms"
                className="font-mono-label text-[11px] uppercase tracking-widest text-white/90 hover:text-apricot transition-colors"
              >
                Rooms &amp; Suites
              </Link>
              <Link
                href="/gallery"
                className="font-mono-label text-[11px] uppercase tracking-widest text-white/90 hover:text-apricot transition-colors"
              >
                Gallery
              </Link>
            
              <Link
                href="/location"
                className="font-mono-label text-[11px] uppercase tracking-widest text-white/90 hover:text-apricot transition-colors"
              >
                Location
              </Link>
            </nav>

            <a
              href={business.bookingUrl}
              className="site-nav__book-btn"
              data-testid="button-header-book"
            >
              <span>Book Direct</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Slide-Out Drawer Backdrop ── */}
      <div
        className={`nav-drawer-backdrop ${open ? 'nav-drawer-backdrop--open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Premium Navigation Drawer ── */}
      <aside
        className={`nav-drawer-panel ${open ? 'nav-drawer-panel--open' : ''}`}
        aria-hidden={!open}
        aria-modal="true"
        role="dialog"
        aria-label="Site navigation drawer"
      >
        {/* Drawer Header */}
        <div className="nav-drawer-panel__header">
          <Link
            href="/"
            className="flex items-center gap-3.5 text-white"
            onClick={() => setOpen(false)}
          >
            <div className="site-nav__logo" style={{ width: 60, height: 60 }}>
              <Image
                src={business.logo}
                alt={business.name}
                width={60}
                height={60}
              />
            </div>
            <div>
              <strong className="block font-display text-lg tracking-tight text-white leading-tight">
                {business.name}
              </strong>
              <span className="text-[10px] font-mono-label tracking-widest text-apricot uppercase">
                Kalamboli · Navi Mumbai
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-all hover:bg-terracotta hover:border-terracotta hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Direct Booking Highlight Banner */}
        <div className="mx-6 mt-4 rounded-sm border border-apricot/25 bg-black/30 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="flex items-center gap-1 text-[10px] font-mono-label text-apricot uppercase tracking-wider font-bold">
                <ShieldCheck size={12} className="text-apricot" />
                Best Direct Rate
              </span>
              <p className="text-xs text-white/70 mt-0.5">
                Instant confirmation &amp; zero reservation fees
              </p>
            </div>
            <a
              href={business.bookingUrl}
              onClick={() => setOpen(false)}
              className="rounded-sm bg-terracotta px-3.5 py-2 text-[10px] font-mono-label font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-forest"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Drawer Accordion Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin"
          aria-label="Drawer navigation menu"
        >
          <ul className="space-y-1 list-none p-0 m-0">
            {navItems.map((item, index) => {
              const hasSub = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedIndex === index;

              return (
                <li
                  key={item.href}
                  className="border-b border-white/10 pb-2 pt-1"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl text-white/95 hover:text-apricot transition-colors py-1 flex-1"
                    >
                      {item.label}
                    </Link>

                    {hasSub && (
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(index)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${item.label} submenu`}
                        className="grid h-9 w-9 place-items-center text-white/70 hover:text-apricot transition-colors"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-apricot' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu with animation */}
                  {hasSub && (
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100 mt-2 pb-2'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="min-h-0 pl-4 border-l border-apricot/30 space-y-2">
                        {item.subItems!.map((sub) => (
                          <Link
                            key={`${sub.href}-${sub.label}`}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between text-xs text-white/70 hover:text-apricot transition-colors py-1"
                          >
                            <span>{sub.label}</span>
                            <ArrowRight size={11} className="opacity-40" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer Bottom Concierge Details */}
        <div className="border-t border-white/15 bg-black/40 p-6 space-y-4">
          <div className="flex items-start gap-3 text-xs text-white/80">
            <MapPin size={16} className="text-apricot shrink-0 mt-0.5" />
            <p className="m-0 leading-relaxed text-[11px] text-white/70">
              {business.address.streetAddress}, {business.address.locality} - {business.address.postalCode}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10">
            <a
              href={`tel:${business.phones.primary}`}
              className="flex items-center gap-2 text-xs font-mono-label text-white hover:text-apricot transition-colors"
            >
              <Phone size={14} className="text-terracotta" />
              <span>{business.phones.primaryDisplay}</span>
            </a>

            <a
              href={business.bookingUrl}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 font-mono-label text-[10px] uppercase tracking-wider text-apricot hover:underline"
            >
              <Calendar size={13} />
              <span>Reservations</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}