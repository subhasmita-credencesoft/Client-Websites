'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeDrawer, setDrawerOpen, setDrawerRendered } from '@/store/slices/uiSlice';
import { primaryNav } from '@/data/navigation';
import { bookingEngineUrl } from '@/data/booking';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function MobileDrawer() {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state) => state.ui.isDrawerOpen);
  const isDrawerRendered = useAppSelector((state) => state.ui.isDrawerRendered);

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
        className={`absolute left-0 top-0 h-full w-[80%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 dark:bg-earth-900 ${
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
              alt="Malhar Baug Resort"
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

        <nav className="flex flex-col gap-1 px-6 py-6">
          {primaryNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleClose}
              className="min-h-[44px] rounded-lg px-2 py-3 font-sans text-base font-medium text-neutral-900 transition-colors duration-200 ease-out hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
            >
              {item.label}
            </a>
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
