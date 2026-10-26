'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export function RoomGalleryViewer({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-3 min-w-0 max-w-full overflow-hidden">
      {/* Main Viewport */}
      <div
        className="group relative w-full overflow-hidden rounded-sm bg-[#17221b] shadow-xl touch-pan-y select-none"
        style={{ aspectRatio: '16/10' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={currentImage}
          alt={`${title} - Photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 65vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ imageRendering: 'auto' }}
        />

        {/* Ambient Gradient Overlays — subtle at bottom for controls */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute left-3 top-3 sm:left-4 sm:top-4 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono-label text-[9px] sm:text-[10px] uppercase tracking-wider text-cream backdrop-blur-md">
            <Eye size={11} className="text-apricot shrink-0" />
            Verified Suite Photography
          </span>
        </div>

        {/* Bottom Metadata & Controls */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between">
          <span className="rounded-sm bg-black/70 px-2.5 py-1 font-mono-label text-[10px] sm:text-[11px] text-cream backdrop-blur-md">
            {activeIndex + 1} / {images.length}
          </span>

          {images.length > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo"
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-terracotta hover:scale-105 active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo"
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-terracotta hover:scale-105 active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] touch-pan-x snap-x snap-mandatory w-full max-w-full min-w-0">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
              className={`relative shrink-0 overflow-hidden rounded-sm transition-all snap-start w-20 h-14 sm:w-24 sm:h-16 ${
                activeIndex === i
                  ? 'ring-2 ring-terracotta ring-offset-2 ring-offset-cream brightness-100 opacity-100'
                  : 'opacity-60 brightness-90 hover:opacity-90 hover:brightness-100'
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="100px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
