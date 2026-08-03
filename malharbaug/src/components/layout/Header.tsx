'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openDrawer, setScrolled } from '@/store/slices/uiSlice';
import { primaryNav } from '@/data/navigation';
import { bookingEngineUrl } from '@/data/booking';
import ThemeToggle from '@/components/ui/ThemeToggle';
import NavDropdown from './NavDropdown';

export default function Header() {
  const dispatch = useAppDispatch();
  const isScrolled = useAppSelector((state) => state.ui.isScrolled);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => dispatch(setScrolled(window.scrollY > 8));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dispatch]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isScrolled
          ? 'border-neutral-200 bg-white/90 dark:border-neutral-800 dark:bg-earth-900/90'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/">
          <Image
            src="/malharlogo.jpeg"
            alt="Malhar Baug Resort"
            width={70}
            height={70}
            className="rounded-full"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 font-sans text-sm font-medium text-neutral-700 transition-colors duration-200 ease-out hover:text-brand-600 dark:text-neutral-200"
                  aria-expanded={activeDropdown === item.label}
                >
                  {item.label}
                  <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16"></iconify-icon>
                </button>
                <NavDropdown open={activeDropdown === item.label} items={item.children} />
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-sm font-medium text-neutral-700 transition-colors duration-200 ease-out hover:text-brand-600 dark:text-neutral-200"
              >
                {item.label}
              </a>
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
            onClick={() => dispatch(openDrawer())}
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
