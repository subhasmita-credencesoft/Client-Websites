'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/GalleryPage.module.scss';
import { GalleryItem } from '@/types';

const FILTERS = ['All', 'Rooms', 'Lawns'] as const;

export default function GalleryFilters({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = active === 'All' ? items : items.filter((item) => item.category === active);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        return (current + dir + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  // Scroll lock, keyboard navigation + focus trap while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);

      // Keep Tab cycling within the dialog (index-based, handles focus on the dialog itself)
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const activeIndex = focusables.indexOf(document.activeElement as HTMLElement);
        const nextIndex =
          activeIndex === -1
            ? e.shiftKey
              ? focusables.length - 1
              : 0
            : (activeIndex + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
        e.preventDefault();
        focusables[nextIndex].focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, step]);

  // Move focus into the dialog when it opens
  useEffect(() => {
    if (lightboxIndex !== null) {
      dialogRef.current?.focus();
    }
  }, [lightboxIndex]);

  const current = lightboxIndex !== null ? visible[lightboxIndex] : null;

  return (
    <div data-reveal>
      <div className={styles.filters} role="tablist" aria-label="Filter gallery">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            className={`${styles.filter} ${active === filter ? styles.filterActive : ''}`}
            onClick={() => {
              setActive(filter);
              setLightboxIndex(null);
            }}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {visible.map((item, index) => (
          <figure key={item.id} className={styles.item}>
            <button
              type="button"
              className={styles.itemButton}
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setLightboxIndex(index);
              }}
              aria-label={`View photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                className={styles.image}
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </button>
            <figcaption className={styles.caption}>
              <span className={styles.captionTag}>{item.category}</span>
              {item.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && current
        ? createPortal(
            <div
              ref={dialogRef}
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`${current.category} photo: ${current.alt}`}
              tabIndex={-1}
              onClick={closeLightbox}
            >
              <div className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={styles.lightboxClose}
                  onClick={closeLightbox}
                  aria-label="Close preview"
                >
                  <iconify-icon icon="solar:close-circle-bold" width="28" aria-hidden="true" />
                </button>

                {visible.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                    >
                      <iconify-icon icon="solar:alt-arrow-left-linear" width="22" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                      onClick={() => step(1)}
                      aria-label="Next photo"
                    >
                      <iconify-icon icon="solar:alt-arrow-right-linear" width="22" aria-hidden="true" />
                    </button>
                  </>
                )}

                <div className={styles.lightboxImageWrap}>
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    className={styles.lightboxImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority
                  />
                </div>

                <div className={styles.lightboxInfo}>
                  <span className={styles.lightboxTag}>{current.category}</span>
                  <p className={styles.lightboxCaption}>{current.alt}</p>
                  <span className={styles.lightboxCounter}>
                    {String(lightboxIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
