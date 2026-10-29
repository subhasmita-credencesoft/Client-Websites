'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';

interface EventCinematicGalleryProps {
  images: string[];
  title: string;
}

export function EventCinematicGallery({ images, title }: EventCinematicGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const safeImages = images.length > 0 ? images : ['/Hotel Sitara Residency Kalamboli Reception (1).avif'];
  const activeImage = safeImages[activeIndex] ?? safeImages[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* ─── Main Cinematic Viewport ─── */}
      <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden border border-forest/20 bg-black shadow-xl group">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${title} - View ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover transition-all duration-700 ease-out animate-fadeIn group-hover:scale-103"
        />

        {/* Ambient Vignette & Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-2">
            <span className="font-mono-label text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/15 text-cream flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-apricot" /> Gallery Perspective
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono-label text-[11px] bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/15 text-cream">
              {activeIndex + 1} / {safeImages.length}
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              aria-label="View Fullscreen"
              className="grid h-8 w-8 place-items-center bg-black/60 backdrop-blur-md border border-white/15 text-cream hover:bg-terracotta transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center bg-black/50 backdrop-blur-md text-white hover:bg-terracotta transition-all opacity-80 hover:opacity-100 z-10"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center bg-black/50 backdrop-blur-md text-white hover:bg-terracotta transition-all opacity-80 hover:opacity-100 z-10"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}

        {/* Bottom Title Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className="font-serif text-lg sm:text-xl text-cream font-medium italic drop-shadow-md">
            {title}
          </p>
        </div>
      </div>

      {/* ─── Filmstrip Thumbnails ─── */}
      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative h-16 w-24 sm:h-20 sm:w-32 flex-shrink-0 overflow-hidden border transition-all duration-300 ${
                activeIndex === idx
                  ? 'border-terracotta ring-2 ring-terracotta scale-102 opacity-100'
                  : 'border-forest/20 opacity-60 hover:opacity-90'
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ─── Fullscreen Lightbox Modal ─── */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-lg animate-fadeIn"
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-terracotta transition-colors z-50"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={activeImage}
              alt={`${title} Fullscreen View`}
              fill
              className="object-contain"
            />
          </div>

          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-terracotta transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-terracotta transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-0 right-0 text-center font-mono-label text-xs text-white/70">
            {title} · {activeIndex + 1} of {safeImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
