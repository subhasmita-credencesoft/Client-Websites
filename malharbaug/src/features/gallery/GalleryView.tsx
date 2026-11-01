'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { galleryCategories } from '@/data/gallery';

interface GalleryItem {
  src: string;
  categoryTitle: string;
  categoryId: string;
  alt: string;
}

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten and deduplicate all images for the "All" tab
  const allItems = useMemo<GalleryItem[]>(() => {
    const map = new Map<string, GalleryItem>();
    galleryCategories.forEach((category) => {
      category.images.forEach((img, idx) => {
        if (!map.has(img)) {
          map.set(img, {
            src: img,
            categoryTitle: category.title,
            categoryId: category.id,
            alt: `${category.title} at Malhar Baug Resort Alibaug – photo ${idx + 1}`,
          });
        }
      });
    });
    return Array.from(map.values());
  }, []);

  // Filtered images based on active tab
  const displayedItems = useMemo<GalleryItem[]>(() => {
    if (activeCategory === 'all') return allItems;
    const cat = galleryCategories.find((c) => c.id === activeCategory);
    if (!cat) return allItems;
    return cat.images.map((img, idx) => ({
      src: img,
      categoryTitle: cat.title,
      categoryId: cat.id,
      alt: `${cat.title} at Malhar Baug Resort Alibaug – photo ${idx + 1}`,
    }));
  }, [activeCategory, allItems]);

  // Lightbox navigation
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % displayedItems.length));
  }, [displayedItems.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + displayedItems.length) % displayedItems.length
    );
  }, [displayedItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-earth-50/40 dark:bg-earth-950">
        {/* Hero Section */}
        <section className="relative flex min-h-[420px] items-center overflow-hidden">
          <Image
            src="/heroimg2.jpeg"
            alt="Photo gallery of Malhar Baug Resort Alibaug – luxury rooms, swimming pool, gardens, and Konkan dining"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-brand-600/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Visual Tour
            </span>
            <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl">
              Resort Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Explore the serene greenery, crystal-clear swimming pool, private villas, and authentic dining at Malhar Baug Resort.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Responsive Category Tabs */}
          <div className="flex items-center justify-start gap-2 overflow-x-auto pb-4 pt-1 sm:flex-wrap sm:justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm ${
                activeCategory === 'all'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-white text-earth-700 hover:bg-earth-100 hover:text-earth-900 dark:bg-earth-800 dark:text-earth-200 dark:hover:bg-earth-700'
              }`}
            >
              All Photos
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  activeCategory === 'all'
                    ? 'bg-white/20 text-white'
                    : 'bg-earth-100 text-earth-600 dark:bg-earth-700 dark:text-earth-300'
                }`}
              >
                {allItems.length}
              </span>
            </button>

            {galleryCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'bg-white text-earth-700 hover:bg-earth-100 hover:text-earth-900 dark:bg-earth-800 dark:text-earth-200 dark:hover:bg-earth-700'
                  }`}
                >
                  {cat.title}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-earth-100 text-earth-600 dark:bg-earth-700 dark:text-earth-300'
                    }`}
                  >
                    {cat.images.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Heading & Stats */}
          <div className="mt-8 flex flex-col items-start justify-between gap-2 border-b border-earth-200/60 pb-4 dark:border-earth-800 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white sm:text-3xl">
                {activeCategory === 'all'
                  ? 'All Resort Photos'
                  : galleryCategories.find((c) => c.id === activeCategory)?.title}
              </h2>
              <p className="mt-1 font-sans text-xs text-earth-500 dark:text-earth-400">
                Click any image to view in high definition
              </p>
            </div>
            <span className="font-sans text-xs font-medium text-earth-600 dark:text-earth-400">
              Showing {displayedItems.length} photos
            </span>
          </div>

          {/* Fully Aligned Responsive Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {displayedItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-earth-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-earth-800"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-earth-900 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                      />
                    </svg>
                  </div>
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 font-sans text-[11px] font-medium text-white backdrop-blur-sm">
                    {item.categoryTitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fullscreen Interactive Lightbox Modal */}
        {lightboxIndex !== null && displayedItems[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-200"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div
              className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white">
                <p className="font-serif text-base font-semibold sm:text-lg">
                  {displayedItems[lightboxIndex].categoryTitle}
                </p>
                <p className="font-sans text-xs text-white/70">
                  Photo {lightboxIndex + 1} of {displayedItems.length}
                </p>
              </div>

              <button
                onClick={closeLightbox}
                aria-label="Close photo preview"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/25 sm:left-6"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Lightbox Image Container */}
            <div
              className="relative mx-auto flex h-[80vh] w-[90vw] max-w-5xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayedItems[lightboxIndex].src}
                alt={displayedItems[lightboxIndex].alt}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 90vw"
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/25 sm:right-6"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Bottom Counter Indicator */}
            <div
              className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 font-sans text-xs font-medium text-white/90 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              Use arrow keys (← →) or swipe to navigate • Esc to close
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
