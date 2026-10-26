import Link from 'next/link';
import { AirVent, Bed, ChevronRight, Coffee, MapPin, Phone, Users, Wifi } from 'lucide-react';

import { business } from '@/core/config/business';
import type { DetailContent } from '@/shared/types/content';

export function RoomDetailHeader({ detail }: { detail: DetailContent }) {
  return (
    <>
      {/* ── Breadcrumb Bar ── */}
      <nav aria-label="Breadcrumb" className="border-b border-forest/10 bg-white/60 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-3.5 md:px-8 lg:px-10 overflow-hidden">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between text-xs min-w-0 gap-3">
          <ol className="flex items-center gap-1.5 sm:gap-2 text-sage-muted overflow-x-auto whitespace-nowrap min-w-0 py-0.5 [scrollbar-width:none]">
            <li className="shrink-0">
              <Link href="/" className="hover:text-forest transition-colors">
                Home
              </Link>
            </li>
            <li className="shrink-0">
              <ChevronRight size={12} className="text-forest/30" />
            </li>
            <li className="shrink-0">
              <Link href="/bedrooms" className="hover:text-forest transition-colors">
                Rooms &amp; Suites
              </Link>
            </li>
            <li className="shrink-0">
              <ChevronRight size={12} className="text-forest/30" />
            </li>
            <li className="font-semibold text-forest truncate max-w-[140px] sm:max-w-[200px] md:max-w-[320px] shrink min-w-0" aria-current="page">
              {detail.title}
            </li>
          </ol>

          <a
            href={`tel:${business.phones.primary}`}
            className="hidden items-center gap-1.5 font-mono-label text-[11px] text-forest hover:text-terracotta transition-colors md:flex shrink-0 ml-4"
          >
            <Phone size={12} className="text-terracotta" />
            Concierge: {business.phones.primaryDisplay}
          </a>
        </div>
      </nav>

      {/* ── Header Title & Badges ── */}
      <header className="border-b border-forest/10 bg-white px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10 lg:px-10 overflow-hidden">
        <div className="mx-auto max-w-[1400px] min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-mono-label text-[10px] sm:text-[11px] uppercase tracking-widest text-terracotta font-bold">
                  {detail.eyebrow}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-forest/5 px-2.5 py-0.5 font-mono-label text-[10px] text-forest">
                  <MapPin size={10} className="text-terracotta" />
                  Kalamboli, Navi Mumbai
                </span>
              </div>
              <h1 className="mt-2 font-display text-2xl sm:text-4xl text-forest font-normal tracking-tight md:text-5xl lg:text-6xl break-words">
                {detail.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-sage-muted">
                {detail.intro}
              </p>
            </div>

            <div className="flex w-full sm:w-auto flex-col items-start sm:items-end gap-1 border-t border-forest/10 pt-4 sm:border-t-0 sm:pt-0 shrink-0">
              <span className="font-mono-label text-[10px] uppercase text-sage-muted">Starting Rate</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-semibold text-forest md:text-4xl">
                  {detail.price || 'Direct Rate'}
                </span>
                <span className="text-xs text-sage-muted">/ night</span>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium">✓ Best Rate Direct Guarantee</span>
            </div>
          </div>

          {/* Quick Highlight Pills Bar */}
          <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5 border-t border-forest/10 pt-5 text-xs text-forest min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-cream px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono-label text-[10px] sm:text-[11px]">
              <Users size={13} className="text-terracotta shrink-0" />
              {detail.occupancy || 'Sleeps 2-6 Guests'}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-cream px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono-label text-[10px] sm:text-[11px]">
              <Bed size={13} className="text-terracotta shrink-0" />
              Comfort King Bedding
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-cream px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono-label text-[10px] sm:text-[11px]">
              <AirVent size={13} className="text-terracotta shrink-0" />
              Climate Controlled AC
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-cream px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono-label text-[10px] sm:text-[11px]">
              <Wifi size={13} className="text-terracotta shrink-0" />
              High-Speed Wi-Fi
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-cream px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono-label text-[10px] sm:text-[11px]">
              <Coffee size={13} className="text-terracotta shrink-0" />
              24-Hour Room Service
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
