'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const restaurantHeroImages = [
  {
    src: '/dininghero.jpeg',
    alt: 'Garden restaurant at Malhar Baug Resort Alibaug serving authentic Konkan and Maharashtrian cuisine',
  },
  {
    src: '/dininghero2.jpeg',
    alt: 'Outdoor garden dining lawn and seating at Malhar Baug Resort Nagaon Alibaug',
  },
];

export default function RestaurantHero() {
  const [current, setCurrent] = useState(0);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % restaurantHeroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + restaurantHeroImages.length) % restaurantHeroImages.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % restaurantHeroImages.length);
  };

  return (
    <section className="relative flex min-h-[500px] items-center overflow-hidden sm:min-h-[560px]">
      {/* Background Slides with Smooth Cross-Fade */}
      {restaurantHeroImages.map((img, index) => (
        <div
          key={img.src}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-16 text-center">
        <span className="inline-block rounded-full bg-brand-600/90 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
          Malhar Baug Kitchen
        </span>
        <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          Restaurant &amp; Dining
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100 sm:text-xl">
          Savour authentic Maharashtrian coastal flavours, fresh seafood thalis, and multi-cuisine delights in our peaceful garden setting.
        </p>

        {/* Quick CTA */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#menu"
            className="rounded-full bg-brand-600 px-7 py-3 font-sans text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-700"
          >
            Explore Menu
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/60 bg-white/10 px-7 py-3 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-earth-900"
          >
            Reserve Table
          </a>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        type="button"
        onClick={goToPrev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/60 sm:left-6"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={goToNext}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/60 sm:right-6"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {restaurantHeroImages.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to restaurant slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
