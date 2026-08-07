'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from '@/styles/GalleryPage.module.scss';
import { GalleryItem } from '@/types';

const FILTERS = ['All', 'Rooms', 'Lawns'] as const;

export default function GalleryFilters({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>('All');
  const visible = active === 'All' ? items : items.filter((item) => item.category === active);

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
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {visible.map((item) => (
          <figure key={item.id} className={styles.item}>
            <Image
              src={item.src}
              alt={item.alt}
              className={styles.image}
              loading="lazy"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className={styles.caption}>
              <span className={styles.captionTag}>{item.category}</span>
              {item.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
