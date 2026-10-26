'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

import { business } from '@/core/config/business';
import { useScrollLock, useEscapeKey } from '@/shared/hooks';

export type GalleryItem = {
  src: string;
  title: string;
  category: string;
};

type GallerySectionProps = {
  items?: readonly GalleryItem[];
  images?: readonly string[];
  alt?: string;
};

export function GallerySection({ items, images, alt = 'Hotel Sitara Residency' }: GallerySectionProps) {
  // Normalize items
  const allItems: readonly GalleryItem[] = useMemo(() => {
    if (items && items.length > 0) return items;
    if (images && images.length > 0) {
      return images.map((src, index) => ({
        src,
        title: `${alt} — Photo ${index + 1}`,
        category: 'Hotel Spaces',
      }));
    }
    return [];
  }, [items, images, alt]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    allItems.forEach((item) => set.add(item.category));
    return ['All', ...Array.from(set)];
  }, [allItems]);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [allItems, activeCategory]);

  const closeLightbox = useCallback(() => setActiveLightboxIndex(null), []);
  useScrollLock(activeLightboxIndex !== null);
  useEscapeKey(closeLightbox, activeLightboxIndex !== null);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length,
    );
  }, [activeLightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length,
    );
  }, [activeLightboxIndex, filteredItems.length]);

  if (allItems.length === 0) return null;

  const currentItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <>
      <section className="bg-cream px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          {/* ── Category Filter Tabs ── */}
          {categories.length > 2 && (
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? allItems.length
                    : allItems.filter((i) => i.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveLightboxIndex(null);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                      isActive
                        ? 'bg-forest text-cream shadow-md'
                        : 'border border-forest/15 bg-white text-forest hover:border-forest/40 hover:bg-forest/5'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono-label ${
                        isActive ? 'bg-terracotta text-white' : 'bg-forest/10 text-forest'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Photo Count Strip ── */}
          <div className="mb-6 flex items-center justify-between border-b border-forest/10 pb-4 text-xs">
            <span className="font-mono-label uppercase tracking-widest text-sage-muted">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'Photograph' : 'Photographs'}
            </span>
            <span className="font-mono-label text-[11px] text-terracotta">
              Click any photo to expand
            </span>
          </div>

          {/* ── Unified Grid (Pixel-Perfect Alignment) ── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <button
                type="button"
                key={`${item.src}-${index}`}
                data-testid={`button-gallery-${index}`}
                onClick={() => setActiveLightboxIndex(index)}
                aria-label={`View photo: ${item.title}`}
                className="group relative flex flex-col overflow-hidden rounded-xs border border-forest/15 bg-white text-left shadow-xs transition-all duration-300 hover:border-terracotta/60 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-terracotta"
              >
                {/* Media Container with 100% Uniform 4/3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest/10">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    priority={index < 6}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ imageRendering: '-webkit-optimize-contrast' as React.CSSProperties['imageRendering'] }}
                  />

                  {/* Dark Glass Hover Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Category Badge Pill */}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-forest/85 px-3 py-1 font-mono-label text-[9px] uppercase tracking-wider text-cream backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Expand Icon on Hover */}
                  <div className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-forest opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                    <Maximize2 size={16} className="text-forest" />
                  </div>
                </div>

                {/* Caption Strip */}
                <div className="flex items-center justify-between border-t border-forest/10 px-4 py-3 bg-white">
                  <span className="font-display text-sm font-medium text-forest truncate max-w-[85%]">
                    {item.title}
                  </span>
                  <span className="font-mono-label text-[10px] text-terracotta">
                    #{index + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Lightbox Modal ── */}
      {currentItem !== null && activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery Lightbox"
        >
          {/* Header Bar */}
          <div className="flex w-full max-w-[1200px] items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-1 font-mono-label text-[10px] uppercase tracking-wider text-apricot backdrop-blur-md">
                {currentItem.category}
              </span>
              <span className="text-xs font-mono-label text-white/70">
                {activeLightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>

            <button
              type="button"
              data-testid="button-close-lightbox"
              aria-label="Close lightbox"
              onClick={closeLightbox}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-terracotta hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Photo Viewport */}
          <div className="relative flex flex-1 w-full max-w-[1200px] items-center justify-center my-4 overflow-hidden">
            <div className="relative aspect-[16/10] max-h-[75vh] w-full max-w-[1100px] overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                priority
                sizes="(max-width: 1200px) 95vw, 1100px"
                className="object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  data-testid="button-gallery-previous"
                  aria-label="Previous photo"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-terracotta hover:scale-105"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  data-testid="button-gallery-next"
                  aria-label="Next photo"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-terracotta hover:scale-105"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Caption Footer */}
          <div className="w-full max-w-[1200px] text-center text-white pb-2">
            <h3 className="font-display text-lg sm:text-xl font-normal text-cream">
              {currentItem.title}
            </h3>
            <p className="font-mono-label text-[11px] text-white/60 mt-1">
              {business.name} · Kalamboli, Navi Mumbai
            </p>
          </div>
        </div>
      )}
    </>
  );
}
