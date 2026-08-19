'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/data/testimonials';
import styles from './Testimonials.module.scss';
const AUTOPLAY_MS = 5000;

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

/**
 * Testimonials — matches the source site: guest quotes over a fixed photograph
 * background, in an auto-advancing slider. Autoplay pauses on hover/focus and
 * under `prefers-reduced-motion` (in which case slides still change via the
 * controls, just without motion).
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || reduce) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, count]);

  function goTo(next: number) {
    setIndex(((next % count) + count) % count);
  }

  return (
    <section
      ref={regionRef}
      className={styles.section}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node)) setIsPaused(false);
      }}
    >
      <div className={styles.media} aria-hidden="true" />

      <div className={styles.container}>
        <h2 id="testimonials-heading" className={styles.heading}>
          From Our Guests
        </h2>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.author} className={styles.slide} role="group" aria-label={`Testimonial ${index + 1} of ${count}`}>
                <figure className={styles.card}>
                  <Image
                    src={testimonial.avatar ?? ''}
                    alt=""
                    width={72}
                    height={72}
                    className={styles.avatar}
                  />
                  <figcaption className={styles.caption}>
                    <p className={styles.author}>{testimonial.author}</p>
                    <Stars rating={testimonial.rating} />
                    <blockquote className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <div className={styles.dots} role="group" aria-label="Choose testimonial">
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.author}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                aria-label={`Go to testimonial ${i + 1}: ${testimonial.author}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.control}
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
