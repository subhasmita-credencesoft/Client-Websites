'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { NEARBY_PLACES, CATEGORY_LABELS } from '@/data/nearby-places';
import type { NearbyCategory } from '@/types';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import styles from './NearbyPlaces.module.scss';

const CATEGORY_ICONS: Record<NearbyCategory, string> = {
  transport: 'train',
  landmark: 'temple',
  nature: 'tree',
  market: 'shop',
};

const CATEGORY_BADGES: Record<NearbyCategory, string> = {
  transport: 'Transport',
  landmark: 'Heritage',
  nature: 'Nature',
  market: 'Market',
};

export function NearbyPlaces() {
  const featured = NEARBY_PLACES.filter((p) => p.featured);
  const regular = NEARBY_PLACES.filter((p) => !p.featured);
  const allPlaces = [...featured, ...regular];

  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const openLightbox = useCallback((index: number) => {
    setLightbox({ open: true, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, index: 0 });
  }, []);

  const prev = useCallback(() => {
    setLightbox((s) => ({
      open: true,
      index: s.index === 0 ? allPlaces.length - 1 : s.index - 1,
    }));
  }, [allPlaces.length]);

  const next = useCallback(() => {
    setLightbox((s) => ({
      open: true,
      index: s.index === allPlaces.length - 1 ? 0 : s.index + 1,
    }));
  }, [allPlaces.length]);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox.open, closeLightbox, prev, next]);

  const current = allPlaces[lightbox.index];

  return (
    <section id="nearby" className={styles.section} aria-labelledby="nearby-heading">
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <Reveal className={styles.header}>
          <span className={styles.kicker}>Explore the Region</span>
          <h2 id="nearby-heading" className={styles.heading}>
            Nearby Places
          </h2>
          <p className={styles.subtitle}>
            Discover the natural beauty, sacred temples, and vibrant culture
            surrounding Hotel K2 in Chakradharpur.
          </p>
        </Reveal>

        {/* Featured cards */}
        <div className={styles.featuredGrid}>
          {featured.map((place, i) => (
            <Reveal key={place.name} delay={i * 150} className={styles.featuredCard}>
              <div
                className={styles.cardInner}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                <Image
                  src={place.image}
                  alt={place.name}
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.categoryBadge}>
                    <Icon name={CATEGORY_ICONS[place.category]} size={12} />
                    {CATEGORY_BADGES[place.category]}
                  </span>
                  <h3 className={styles.cardTitle}>{place.name}</h3>
                  {place.description && (
                    <p className={styles.cardDesc}>{place.description}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Regular cards */}
        <div className={styles.regularGrid}>
          {regular.map((place, i) => (
            <Reveal key={place.name} delay={(i % 4) * 100} className={styles.card}>
              <div
                className={styles.cardInner}
                onClick={() => openLightbox(featured.length + i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(featured.length + i)}
              >
                <Image
                  src={place.image}
                  alt={place.name}
                  width={600}
                  height={400}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.categoryBadge}>
                    <Icon name={CATEGORY_ICONS[place.category]} size={12} />
                    {CATEGORY_BADGES[place.category]}
                  </span>
                  <h3 className={styles.cardTitle}>{place.name}</h3>
                  {place.distance && (
                    <span className={styles.distanceBadge}>{place.distance}</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && current && (
        <div
          className={`${styles.lightboxOverlay} ${lightbox.open ? styles.open : ''}`}
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image preview"
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              ✕
            </button>
            <button className={`${styles.lightboxNav} ${styles.prev}`} onClick={prev} aria-label="Previous">
              ‹
            </button>
            <Image
              src={current.image}
              alt={current.name}
              width={1200}
              height={900}
              className={styles.lightboxImage}
              priority
            />
            <button className={`${styles.lightboxNav} ${styles.next}`} onClick={next} aria-label="Next">
              ›
            </button>
            <div className={styles.lightboxCaption}>{current.name}</div>
            <span className={styles.lightboxBadge}>
              {CATEGORY_BADGES[current.category]}
            </span>
            <div className={styles.lightboxCounter}>
              {lightbox.index + 1} / {allPlaces.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
