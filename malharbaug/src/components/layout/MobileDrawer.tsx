'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeDrawer, setDrawerOpen, setDrawerRendered } from '@/store/slices/uiSlice';
import { buildPrimaryNav } from '@/config/navigation';
import { useRooms } from '@/components/providers/PropertyProvider';
import { bookingEngineUrl } from '@/config/booking';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function MobileDrawer() {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state) => state.ui.isDrawerOpen);
  const isDrawerRendered = useAppSelector((state) => state.ui.isDrawerRendered);
  const nav = buildPrimaryNav(useRooms());
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    if (isDrawerRendered && !isDrawerOpen) {
      const raf = requestAnimationFrame(() => {
        dispatch(setDrawerOpen(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isDrawerRendered, isDrawerOpen, dispatch]);

  const handleClose = () => {
    dispatch(closeDrawer());
    window.setTimeout(() => {
      dispatch(setDrawerRendered(false));
    }, 350);
  };

  const toggleSubmenu = (label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    document.body.style.overflow = isDrawerRendered ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerRendered]);

  if (!isDrawerRendered) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={`absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 dark:bg-earth-900 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Image
              src="/malharlogo.jpeg"
              alt="Malhar Baug Resort logo – Alibaug resort near Nagaon Beach"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-serif text-lg font-bold tracking-tight text-brand-900 dark:text-white">
              Malhar Baug
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 dark:text-white"
            >
              <iconify-icon icon="solar:close-circle-linear" width="24" height="24"></iconify-icon>
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile Primary">
          {nav.map((item) => (
            <div key={item.label} className="flex flex-col">
              {item.children && item.children.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="font-sans text-base font-medium text-neutral-900 dark:text-white"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(item.label)}
                      aria-expanded={expandedSection === item.label}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700"
                    >
                      <iconify-icon
                        icon="solar:alt-arrow-down-linear"
                        width="16"
                        height="16"
                        className={`transition-transform duration-200 ${
                          expandedSection === item.label ? 'rotate-180' : ''
                        }`}
                      ></iconify-icon>
                    </button>
                  </div>
                  {expandedSection === item.label && (
                    <div className="ml-4 flex flex-col space-y-1 border-l-2 border-brand-200 py-1 pl-3 dark:border-brand-800">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={handleClose}
                          className="rounded-lg px-2 py-2 font-sans text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-brand-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-brand-400"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={handleClose}
                  className="min-h-[44px] rounded-lg px-3 py-2.5 font-sans text-base font-medium text-neutral-900 transition-colors duration-200 ease-out hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="px-6 pb-8">
          <a
            href={bookingEngineUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="block min-h-[44px] rounded-full bg-brand-600 px-5 py-3 text-center font-sans text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-700"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
