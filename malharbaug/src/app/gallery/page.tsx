'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { galleryCategories } from '@/data/gallery';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0].id);

  const currentCategory = galleryCategories.find((c) => c.id === activeCategory) || galleryCategories[0];

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=2068"
            alt="Gallery"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Gallery</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Explore the beauty of Malhar Baug Resort through our photo collection.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap justify-center gap-2">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 font-sans text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-earth-100 text-earth-700 hover:bg-brand-50 dark:bg-earth-800 dark:text-earth-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="animate-on-scroll font-serif text-3xl font-bold text-earth-900 dark:text-white">{currentCategory.title}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentCategory.images.map((img, i) => (
                <div
                  key={i}
                  className={`animate-on-scroll stagger-${(i % 3) + 1} relative h-72 overflow-hidden rounded-2xl ${
                    i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${currentCategory.title} image ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
