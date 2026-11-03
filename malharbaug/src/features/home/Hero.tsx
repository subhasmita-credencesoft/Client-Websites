'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { bookingEngineUrl } from '@/config/booking';

interface HeroSlide {
  src: string;
  alt: string;
  tag: string;
  tagIcon: string;
  tabLabel: string;
  heading: string;
  highlight: string;
  subtitle: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  isExternalPrimary: boolean;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const slides: HeroSlide[] = [
  {
    src: '/hero1.jpeg',
    alt: 'Malhar Baug Resort garden and rooms in Nagaon, Alibaug',
    tag: '2-Acre Coconut Grove Sanctuary • Alibaug',
    tagIcon: 'solar:leaf-bold',
    tabLabel: 'Resort Overview',
    heading: 'Welcome to',
    highlight: 'Malhar Baug Resort',
    subtitle: 'Where Nature Meets Warm Konkan Comfort',
    description:
      'Escape into lush green coconut orchards in Nagaon, Alibaug. Experience peaceful deluxe rooms, private family villas, a swimming pool, and authentic home-style Konkan dining since 2018.',
    primaryCtaText: 'Book Your Stay',
    primaryCtaLink: bookingEngineUrl,
    isExternalPrimary: true,
    secondaryCtaText: 'Explore Rooms',
    secondaryCtaLink: '/rooms/',
  },
  {
    src: '/hero4.avif',
    alt: 'Beautiful Nagaon Beach and coastal waters near Malhar Baug Resort, Alibaug',
    tag: 'Just 2 km • 5 Minutes From Nagaon Beach',
    tagIcon: 'solar:water-sun-bold',
    tabLabel: 'Beach Proximity',
    heading: 'Minutes From The',
    highlight: 'Golden Sands',
    subtitle: 'Sun, Surf & Thrilling Water Sports',
    description:
      'Stay just 5 minutes away from the pristine shores of Nagaon and Akshi beaches. Enjoy jet skiing, banana rides, and coastal sunsets, then return to peaceful garden tranquility at night.',
    primaryCtaText: 'Plan Beach Trip',
    primaryCtaLink: bookingEngineUrl,
    isExternalPrimary: true,
    secondaryCtaText: 'Explore Activities',
    secondaryCtaLink: '/nearby/',
  },
  {
    src: '/hero3.jpeg',
    alt: 'Private villa stay surrounded by palm trees at Malhar Baug Resort, Alibaug',
    tag: 'Spacious 2 BHK & 4 BHK Private Villas',
    tagIcon: 'solar:home-smile-bold',
    tabLabel: 'Private Villas',
    heading: 'Peaceful Stays For',
    highlight: 'Families & Groups',
    subtitle: 'Your Private Sanctuary Under The Palms',
    description:
      'Spacious independent villas with private balconies, garden sit-outs, air conditioning, and room for all generations. Ideal for family gatherings, weddings, and group reunions.',
    primaryCtaText: 'Reserve A Villa',
    primaryCtaLink: bookingEngineUrl,
    isExternalPrimary: true,
    secondaryCtaText: 'View Villa Details',
    secondaryCtaLink: '/rooms/',
  },
  {
    src: '/hero2.jpeg',
    alt: 'Swimming pool and relaxation at Malhar Baug Resort near Nagaon Beach, Alibaug',
    tag: 'Clean Swimming Pool & Rain Dance',
    tagIcon: 'solar:swimming-bold',
    tabLabel: 'Pool & Recreation',
    heading: 'Dive Into Pure',
    highlight: 'Tropical Relaxation',
    subtitle: 'Sparkling Pool & Fun For All Ages',
    description:
      'Cool off with refreshing swims under swaying coconut trees, enjoy lively rain dance sessions with music, and unwind on comfortable pool loungers in a peaceful green setting.',
    primaryCtaText: 'Book Poolside Stay',
    primaryCtaLink: bookingEngineUrl,
    isExternalPrimary: true,
    secondaryCtaText: 'Resort Amenities',
    secondaryCtaLink: '/amenities/',
  },
];

const SLIDE_DURATION = 5500; // 5.5 seconds per slide

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(nextSlide, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, current]);

  const activeSlide = slides[current];

  return (
    <section
      className="relative flex min-h-[580px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[86vh] w-full items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
      aria-label="Malhar Baug Resort Home Banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 4 Background Slides with Ken Burns Smooth Pan/Zoom Effect */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Balanced Transparent Gradient Overlay — Keeps photos vivid & bright while ensuring sharp text */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />

      {/* Animated Hero Text Container — Keyed to `current` so it re-animates smoothly on every slide change */}
      <div
        key={current}
        className="relative z-20 mx-auto w-full max-w-4xl px-4 py-8 text-center sm:px-6 sm:py-12"
      >
        {/* Animated Badge */}
        <div className="animate-hero-scale-in mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-4 py-1.5 backdrop-blur-md shadow-lg">
          <iconify-icon
            icon={activeSlide.tagIcon}
            width="16"
            height="16"
            className="text-brand-300"
          ></iconify-icon>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
            {activeSlide.tag}
          </span>
        </div>

        {/* Animated Main Heading with Highlight */}
        <h1
          className="animate-hero-fade-up font-serif text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl"
          style={{ animationDelay: '80ms' }}
        >
          <span>{activeSlide.heading} </span>
          <span className="block text-brand-300 sm:inline sm:text-brand-300">
            {activeSlide.highlight}
          </span>
        </h1>

        {/* Animated Subtitle */}
        <p
          className="animate-hero-fade-up mt-2 font-serif text-lg font-medium text-earth-100 drop-shadow sm:text-2xl md:text-3xl"
          style={{ animationDelay: '160ms' }}
        >
          {activeSlide.subtitle}
        </p>

        {/* Animated Description */}
        <p
          className="animate-hero-fade-up mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-neutral-100 drop-shadow sm:text-base md:text-lg"
          style={{ animationDelay: '240ms' }}
        >
          {activeSlide.description}
        </p>

        {/* Animated Action Buttons */}
        <div
          className="animate-hero-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: '320ms' }}
        >
          <a
            href={activeSlide.primaryCtaLink}
            target={activeSlide.isExternalPrimary ? '_blank' : undefined}
            rel={activeSlide.isExternalPrimary ? 'noopener noreferrer' : undefined}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-sans text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:bg-brand-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{activeSlide.primaryCtaText}</span>
            <iconify-icon icon="solar:calendar-bold" width="18" height="18"></iconify-icon>
          </a>

          <Link
            href={activeSlide.secondaryCtaLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-white/15 px-7 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-earth-900"
          >
            <span>{activeSlide.secondaryCtaText}</span>
            <iconify-icon icon="solar:arrow-right-linear" width="18" height="18"></iconify-icon>
          </Link>

          <a
            href="https://wa.me/919987552273?text=Hi%20Malhar%20Baug%20Resort,%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-600/40 px-6 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-emerald-600 shadow-md"
          >
            <iconify-icon icon="logos:whatsapp-icon" width="18" height="18"></iconify-icon>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Navigation Arrows — Premium Glassmorphic */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2.5 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/60 sm:left-6 sm:p-3.5"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2.5 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/60 sm:right-6 sm:p-3.5"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Premium Multi-Slide Tabs & Progress Indicator at Bottom */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:gap-3 px-4">
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
              className={`group relative flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-300 ${
                isActive
                  ? 'border border-white/40 bg-black/60 backdrop-blur-md text-white shadow-lg'
                  : 'border border-transparent bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/50 hover:text-white'
              }`}
            >
              {/* Slide Number */}
              <span className="font-sans text-[11px] sm:text-xs font-bold tracking-wider">
                0{idx + 1}
              </span>

              {/* Slide Label (Visible on small screens and up) */}
              <span className="hidden sm:inline font-sans text-xs font-medium">
                {slide.tabLabel}
              </span>

              {/* Active Progress Bar Underline */}
              {isActive && (
                <span
                  key={`progress-${current}-${isPaused}`}
                  className="absolute bottom-0 left-0 h-[2px] rounded-full bg-brand-400 animate-hero-progress"
                  style={{
                    animationDuration: `${SLIDE_DURATION}ms`,
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
