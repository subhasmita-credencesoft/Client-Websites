'use client';

import React, { useState } from 'react';
import { GALLERY_DATA, GalleryImage } from '@/data/galleryData';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './GalleryPage.module.scss';

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Rooms', 'Pool', 'Dining', 'Resort Grounds', 'Nearby'];

  const filteredImages =
    activeCategory === 'All'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Visual Showcase</span>
          </div>
          <h1 className={styles.bannerTitle}>Tarangan Photo Gallery</h1>
          <p className={styles.bannerSub}>
            Take a visual tour through our swimming pool, deluxe cottage interiors, delicious Konkani seafood, and tranquil garden grounds.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          {/* Category Filter Pills */}
          <div className={styles.filterPills}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.filterBtn} ${
                  activeCategory === cat ? styles.activeFilter : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          <div className={styles.galleryGrid}>
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                className={styles.imageCard}
                onClick={() => openLightbox(idx)}
              >
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className={styles.imageHoverOverlay}>
                  <div className={styles.zoomIcon}>
                    <Maximize2 size={20} color="#FFFFFF" />
                  </div>
                  <div className={styles.imageMeta}>
                    <span className={styles.imgCategory}>{img.category}</span>
                    <h4 className={styles.imgTitle}>{img.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Close image lightbox"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className={styles.navBtnPrev}
            onClick={prevImage}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            className={styles.navBtnNext}
            onClick={nextImage}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].title}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCaption}>
              <span className={styles.lightboxCategory}>
                {filteredImages[lightboxIndex].category}
              </span>
              <h3 className={styles.lightboxTitle}>
                {filteredImages[lightboxIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
