'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { bookingEngineUrl } from '@/config/booking';

const heroImages = [
  {
    src: '/hero1.jpeg',
    alt: 'Malhar Baug Resort garden and rooms in Nagaon, Alibaug',
  },
  {
    src: '/hero4.avif',
    alt: 'Beautiful Nagaon Beach near Malhar Baug Resort, Alibaug',
  },
  {
    src: '/hero3.jpeg',
    alt: 'Private villa stay at Malhar Baug Resort, family resort in Alibaug',
  },
  {
    src: '/hero2.jpeg',
    alt: 'Swimming pool at Malhar Baug Resort near Nagaon Beach, Alibaug',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  // Auto-advance slides every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      className="relative flex min-h-[540px] sm:min-h-[600px] md:min-h-[680px] lg:min-h-[82vh] w-full items-center justify-center overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16"
      aria-label="Malhar Baug Resort Home Banner"
    >
      {/* 4 Background Slides with Smooth Cross-Fade */}
      {heroImages.map((img, index) => {
        const isActive = index === current;
        return (
          <div
            key={img.src}
            className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        );
      })}

      {/* Subtle Transparent Overlay — Keeps Background Photos Bright, Clear & Full */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-transparent to-black/30" />

      {/* Hero Content — Authentic & Perfectly Centered */}
      <div className="relative z-20 mx-auto w-full max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 [text-shadow:_0_2px_10px_rgb(0_0_0_/_70%)]">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 backdrop-blur-md">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
            Where Nature Meets Comfort in Alibaug
          </span>
        </p>

        <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Malhar Baug Resort
        </h1>

        <p className="mt-2 font-serif text-lg font-normal text-brand-200 sm:text-2xl md:text-3xl">
          Family Resort in Alibaug Near Nagaon Beach
        </p>

        <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-neutral-100 sm:text-base md:text-lg">
          Stay at our garden resort in Nagaon, Palhe — comfortable luxury rooms, spacious private villas, swimming pool, and home-style Konkan dining, just 2 km from Nagaon Beach.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={bookingEngineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3 font-sans text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-brand-700 hover:scale-[1.02]"
          >
            Book Your Stay
          </a>
          <Link
            href="/rooms"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/70 bg-white/15 px-7 py-3 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-earth-900"
          >
            Explore Rooms
          </Link>
          <a
            href="https://wa.me/919987552273?text=Hi%20Malhar%20Baug%20Resort,%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-600/35 px-6 py-3 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-emerald-600"
          >
            <iconify-icon icon="logos:whatsapp-icon" width="16" height="16"></iconify-icon>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Left / Right Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/35 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/65 sm:left-6 sm:p-3"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/35 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/65 sm:right-6 sm:p-3"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators for all 4 images */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {heroImages.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
