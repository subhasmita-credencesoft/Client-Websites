'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUI, useRooms } from '@/hooks';
import { buildPrimaryNav } from '@/config/navigation';
import { bookingEngineUrl } from '@/config/booking';
import ThemeToggle from '@/components/ui/ThemeToggle';
import NavDropdown from './NavDropdown';

export default function Header() {
  const { isScrolled, openDrawer, setScrolled } = useUI();
  const rooms = useRooms();
  const nav = buildPrimaryNav(rooms);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScrolled]);

  const navLinkClass = isScrolled
    ? 'font-sans text-sm font-medium text-neutral-700 transition-colors duration-200 ease-out hover:text-brand-600 dark:text-neutral-200'
    : 'font-sans text-sm font-medium text-white/95 transition-colors duration-200 ease-out hover:text-white drop-shadow-sm';

  const iconClass = isScrolled
    ? 'text-neutral-500 hover:text-brand-600 dark:text-neutral-400'
    : 'text-white/80 hover:text-white';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-neutral-200/60 bg-white/95 shadow-md backdrop-blur-md dark:border-neutral-800 dark:bg-earth-900/95'
          : 'border-transparent bg-gradient-to-b from-black/60 via-black/20 to-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link href="/" aria-label="Malhar Baug Resort – home">
          <Image
            src="/malharlogo.jpeg"
            alt="Malhar Baug Resort logo – family resort in Alibaug"
            width={64}
            height={64}
            priority
            className="rounded-full shadow-md"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative flex items-center"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={navLinkClass}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveDropdown((prev) => (prev === item.label ? null : item.label))}
                  className={`ml-1 flex items-center transition-colors ${iconClass}`}
                  aria-expanded={activeDropdown === item.label}
                  aria-label={`Toggle ${item.label} menu`}
                >
                  <iconify-icon icon="solar:alt-arrow-down-linear" width="14" height="14"></iconify-icon>
                </button>
                <NavDropdown
                  open={activeDropdown === item.label}
                  items={item.children}
                  onClose={() => setActiveDropdown(null)}
                />
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={navLinkClass}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={bookingEngineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-brand-600 px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-md transition-all duration-200 ease-out hover:bg-brand-700 hover:shadow-brand-600/30 sm:inline-block"
          >
            Book Now
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              isScrolled ? 'text-neutral-700 dark:text-white' : 'text-white'
            }`}
          >
            <iconify-icon icon="solar:hamburger-menu-linear" width="24" height="24"></iconify-icon>
          </button>
        </div>
      </div>
    </header>
  );
}
