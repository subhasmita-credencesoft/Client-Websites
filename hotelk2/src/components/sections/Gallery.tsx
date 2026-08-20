'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { GALLERY_IMAGES } from '@/data/gallery';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Gallery.module.scss';

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_IMAGES.length,
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const lightboxImage = lightboxIndex !== null ? GALLERY_IMAGES[lightboxIndex] : null;

  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-heading">
      <div className={styles.container}>
        <Reveal className={styles.headingWrap}>
          <p className={styles.subtitle}>Our Gallery</p>
          <h2 id="gallery-heading" className={styles.heading}>
            Explore Our Gallery
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {GALLERY_IMAGES.map((image, index) => (
            <Reveal as="li" key={`${image.src}-${index}`} delay={(index % 4) * 90} className={styles.itemWrap}>
              <button
                type="button"
                className={styles.item}
                onClick={() => openLightbox(index)}
                aria-label={`View ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className={styles.image}
                />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {lightboxImage && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close preview"
          >
            ✕
          </button>

          <button
            type="button"
            className={styles.lightboxPrev}
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              sizes="90vw"
              className={styles.lightboxImage}
              priority
            />
          </div>

          <button
            type="button"
            className={styles.lightboxNext}
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
          >
            ›
          </button>

          <p className={styles.lightboxCaption}>{lightboxImage.alt}</p>
        </div>
      )}
    </section>
  );
}
