'use client';

import { useState } from 'react';
import type { MenuCategory } from '@/types';

interface RestaurantMenuProps {
  categories: MenuCategory[];
}

export default function RestaurantMenu({ categories }: RestaurantMenuProps) {
  const [activeTab, setActiveTab] = useState(0);
  const currentCategory = categories[activeTab] || categories[0];

  return (
    <section className="bg-earth-100 py-24 dark:bg-earth-800/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="section-subtitle">Our Menu</p>
          <h2 className="section-title">Explore Our Offerings</h2>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat, i) => (
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
          <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">
            {currentCategory?.title}
          </h3>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {currentCategory?.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 font-sans text-sm text-earth-700 shadow-sm dark:bg-earth-800 dark:text-earth-200"
              >
                <iconify-icon
                  icon="solar:plate-bold"
                  width="18"
                  height="18"
                  className="text-brand-500 shrink-0"
                ></iconify-icon>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
