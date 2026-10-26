import Link from 'next/link';
import { ArrowRight, Bed } from 'lucide-react';

import type { HeroSlide as HeroSlideData } from '@/features/home/components/hero-slides';

export function HeroSlide({ slide, isActive }: { slide: HeroSlideData; isActive: boolean }) {
  return (
    <div
      aria-hidden={!isActive}
      className={`w-full flex flex-col items-center justify-center transition-all duration-700 ease-out ${
        isActive
          ? 'relative opacity-100 translate-y-0 pointer-events-auto z-10'
          : 'absolute inset-0 opacity-0 translate-y-3 pointer-events-none z-0'
      }`}
    >
      {/* 1. Authentic Luxury Eyebrow (Staggered Fade Up) */}
      <p
        className={`home-hero-eyebrow mb-3 sm:mb-4 m-0 ${isActive ? 'stagger-eyebrow' : ''}`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {slide.eyebrow}
      </p>

      {/* 2. Prestigious Hotel Headline (Staggered Word Reveal) */}
      <h1
        className="home-hero-heading text-2xl sm:text-4xl md:text-5xl lg:text-[4.25rem] m-0 max-w-4xl px-2 sm:px-3 text-balance font-medium tracking-wide"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {slide.heading.split(' ').map((word, wIdx) => (
          <span key={wIdx} className="stagger-word-wrap">
            <span
              className={isActive ? 'stagger-word' : ''}
              style={{ animationDelay: `${140 + wIdx * 65}ms` }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

      {/* 3. Classic Hotel Hairline Rule (Staggered Scale Expand) */}
      <div className={`home-hero-rule ${isActive ? 'stagger-rule' : ''}`} />

      {/* 4. Elegant Hotel Description (Staggered Fade Up) */}
      <p
        className={`home-hero-subtitle max-w-2xl text-sm sm:text-base md:text-[1.125rem] mb-5 sm:mb-8 m-0 px-2 sm:px-4 text-pretty ${
          isActive ? 'stagger-subtitle' : ''
        }`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {slide.description}
      </p>

      {/* 5. Clean Professional Actions (Staggered Fade Up) */}
      <div
        className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1 ${
          isActive ? 'stagger-actions' : ''
        }`}
      >
        <a
          href={slide.primaryHref}
          className="group inline-flex items-center gap-2 rounded-sm bg-[#ad3074] px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-[#26382e]"
          style={{ fontFamily: "'Cinzel', serif" }}
          data-testid="button-hero-book"
        >
          <span>{slide.primaryAction}</span>
          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        <Link
          href={slide.secondaryHref}
          className="inline-flex items-center gap-2 rounded-sm border border-white/70 bg-transparent px-4.5 sm:px-6 py-3 sm:py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#26382e]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <Bed size={14} className="text-[#d7b49a]" />
          <span>{slide.secondaryAction}</span>
        </Link>
      </div>
    </div>
  );
}
