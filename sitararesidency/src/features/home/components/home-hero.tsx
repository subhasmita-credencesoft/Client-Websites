'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { BookingStrip } from '@/features/booking';
import { heroSlides } from '@/features/home/components/hero-slides';
import { HeroSlide } from '@/features/home/components/hero-slide';
import { HeroControls } from '@/features/home/components/hero-controls';

type HomeHeroCopy = {
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    action: string;
    scrollLabel: string;
  };
  booking: {
    arrival: string;
    departure: string;
    guests: string;
    datePlaceholder: string;
    guestPlaceholder: string;
    action: string;
  };
};

export function HomeHero({ copy }: { copy: HomeHeroCopy }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure autoplay works reliably across mobile browsers (Safari/Chrome)
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.defaultMuted = true;
      vid.muted = true;
      vid.play().catch(() => {
        // Autoplay policy prevented playback until user interaction
      });
    }
  }, []);

  // Auto-advance every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <>
      <section
        className="home-hero"
        aria-label="Welcome banner"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Hero Image Fallback (Ensures hero image always displays) */}
        <Image
          src="/Hotel Sitara Residency Kalamboli Reception (5).avif"
          alt="Hotel Sitara Residency Reception"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none -z-10"
        />

        {/* Background Video */}
        <video
          ref={videoRef}
          className="home-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          poster="/Hotel Sitara Residency Kalamboli Reception (5).avif"
          aria-hidden="true"
        >
          <source src="https://bookonelocal.in/cdn/Sitara+Residency+Property+Website+Video+1.mp4" type="video/mp4" />
          <source src="https://bookonelocal.in/cdn/Sitara+Residency+Property+Website+Video+1.mp4" type="video/mp4" />
          <source src="/videos/sitarahero.mp4" type="video/mp4" />
        </video>

        {/* Luminous Cinematic Shade Overlay */}
        <div className="home-hero__shade" />

        {/* Hero Carousel Stage */}
        <div className="home-hero__copy">
          {/* Slides Stack Container with Stable Minimum Height to eliminate CLS */}
          <div className="relative w-full min-h-[280px] xs:min-h-[320px] sm:min-h-[340px] md:min-h-[320px] flex items-center justify-center">
            {heroSlides.map((slide, index) => (
              <HeroSlide key={index} slide={slide} isActive={currentSlide === index} />
            ))}
          </div>

          {/* Interactive Carousel Navigation Controls (Anchored Stably Below Copy) */}
          <HeroControls
            currentSlide={currentSlide}
            total={heroSlides.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={setCurrentSlide}
          />
        </div>
      </section>

      {/* Booking Strip Placed Cleanly Below Hero to Avoid Content Clipping */}
      <BookingStrip
        labels={{
          arrivalLabel: copy.booking.arrival,
          departureLabel: copy.booking.departure,
          guestsLabel: copy.booking.guests,
          guestPlaceholder: copy.booking.guestPlaceholder,
          action: copy.booking.action,
        }}
      />
    </>
  );
}
