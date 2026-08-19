'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { HERO_SLIDES } from '@/data/hero-slides';
import { proxiedImage } from '@/lib/proxied-image';
import { Button } from '@/components/ui/Button';
import styles from './Hero.module.scss';

/**
 * HeroCarousel
 * Replicates the source site's Bootstrap hero slider exactly: three rotating
 * property/room photographs (550px tall), each with a bottom-left caption
 * containing a single `custom-btn` link into a page section. Autoplay uses
 * each slide's own `data-bs-interval` value (1s / 2s / 3s), pausing on pointer
 * hover, keyboard focus, and when the user requests reduced motion.
 *
 * Keyboard: Tab reaches Previous, Next, then each caption link in visual order.
 * Left/Right arrow keys move slides while focus is anywhere in the region.
 * On ≤576px the images are replaced by CSS backgrounds (matching `customstyle.css`).
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const slideCount = HERO_SLIDES.length;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = HERO_SLIDES[index]?.interval ?? 3000;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, interval);
    return () => clearInterval(timer);
  }, [index, isPaused, prefersReducedMotion, slideCount]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  }

  const active = HERO_SLIDES[index];

  return (
    <section
      ref={regionRef}
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Hotel K2 highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node)) setIsPaused(false);
      }}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.media}>
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.image}
            className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slideCount}`}
            aria-hidden={i !== index}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proxiedImage(slide.image)}
              alt={slide.alt}
              className={styles.image}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div
              className={styles.mobileBg}
              aria-hidden="true"
              style={{ backgroundImage: `url(${proxiedImage(slide.image)})` }}
            />
            <div className={styles.caption}>
              <Button href={slide.captionHref} variant="primary" className={styles.heroBtn}>
                {slide.captionLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.liveStatus} aria-live="polite" aria-atomic="true">
        {`Showing slide ${index + 1} of ${slideCount}: ${active?.captionLabel}`}
      </p>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={prev}
        aria-label="Previous slide"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={next}
        aria-label="Next slide"
      >
        <span aria-hidden="true">›</span>
      </button>
    </section>
  );
}
