'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { menuCategories, diningDescription } from '@/data/dining';

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2068"
            alt="Restaurant"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Restaurant &amp; Dining</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Savour authentic Maharashtrian flavours and more at our multi-cuisine restaurant.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-subtitle">Culinary Journey</p>
            <h2 className="section-title">A Taste of the Konkan Coast</h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              {diningDescription}
            </p>
          </div>
        </section>

        <section className="bg-earth-100 py-24 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle">Our Menu</p>
              <h2 className="section-title">Explore Our Offerings</h2>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {menuCategories.map((cat, i) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveTab(i)}
                  className={`rounded-full px-5 py-2 font-sans text-sm font-medium transition-colors ${
                    activeTab === i
                      ? 'bg-brand-600 text-white'
                      : 'bg-white text-earth-700 hover:bg-brand-50 dark:bg-earth-800 dark:text-earth-200 dark:hover:bg-earth-700'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
            <div className="mt-10 animate-on-scroll">
              <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">{menuCategories[activeTab].title}</h3>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {menuCategories[activeTab].items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 font-sans text-sm text-earth-700 shadow-sm dark:bg-earth-800 dark:text-earth-200"
                  >
                    <iconify-icon icon="solar:plate-bold" width="18" height="18" className="text-brand-500 shrink-0"></iconify-icon>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">Book a Table</h2>
          <p className="mt-2 font-sans text-base text-earth-600 dark:text-earth-300">
            Call us to reserve your dining experience.
          </p>
          <a
            href="tel:+919876543210"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Call to Reserve
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
