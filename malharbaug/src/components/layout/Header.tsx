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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScrolled]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isScrolled
          ? 'border-neutral-200 bg-white/90 dark:border-neutral-800 dark:bg-earth-900/90'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Malhar Baug Resort – home">
          <Image
            src="/malharlogo.jpeg"
            alt="Malhar Baug Resort logo – family resort in Alibaug"
            width={70}
            height={70}
            priority
            className="rounded-full"
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
                  className="font-sans text-sm font-medium text-neutral-700 transition-colors duration-200 ease-out hover:text-brand-600 dark:text-neutral-200"
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveDropdown((prev) => (prev === item.label ? null : item.label))}
                  className="ml-1 flex items-center text-neutral-500 transition-colors hover:text-brand-600 dark:text-neutral-400"
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
                className="font-sans text-sm font-medium text-neutral-700 transition-colors duration-200 ease-out hover:text-brand-600 dark:text-neutral-200"
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
            className="hidden rounded-full bg-brand-600 px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-700 sm:inline-block"
          >
            Book Now
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 lg:hidden dark:text-white"
          >
            <iconify-icon icon="solar:hamburger-menu-linear" width="24" height="24"></iconify-icon>
          </button>
        </div>
      </div>
    </header>
  );
}
