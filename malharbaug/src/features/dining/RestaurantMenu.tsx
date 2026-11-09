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
        {/* Heading */}
        <div className="text-center">
          <p className="section-subtitle">Our Menu</p>
          <h2 className="section-title">Explore Our Offerings</h2>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 font-sans text-sm font-medium transition-colors ${
                activeTab === i
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white text-earth-700 hover:bg-brand-50 dark:bg-earth-800 dark:text-earth-200 dark:hover:bg-earth-700'
              }`}
            >
              {cat.icon && (
                <iconify-icon icon={cat.icon} width="16" height="16"></iconify-icon>
              )}
              {cat.title}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <div className="mt-10 animate-on-scroll">
          <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-white mb-6">
            {currentCategory?.title}
          </h3>

          {/* Sections layout */}
          {currentCategory?.sections && currentCategory.sections.length > 0 ? (
            <div className="space-y-8">
              {currentCategory.sections.map((section) => (
                <div key={section.heading}>
                  {/* Section sub-heading */}
                  <h4 className="mb-4 inline-block rounded-md bg-brand-600 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-white">
                    {section.heading}
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 font-sans text-sm shadow-sm dark:bg-earth-800"
                      >
                        <span className="flex items-center gap-2 text-earth-700 dark:text-earth-200">
                          <iconify-icon
                            icon="solar:plate-bold"
                            width="16"
                            height="16"
                            className="text-brand-500 shrink-0"
                          ></iconify-icon>
                          {item.name}
                          {item.note && (
                            <span className="text-xs text-earth-400 dark:text-earth-500">
                              ({item.note})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            /* Flat items fallback */
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(currentCategory?.items ?? []).map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 font-sans text-sm shadow-sm dark:bg-earth-800"
                >
                  <span className="flex items-center gap-2 text-earth-700 dark:text-earth-200">
                    <iconify-icon
                      icon="solar:plate-bold"
                      width="16"
                      height="16"
                      className="text-brand-500 shrink-0"
                    ></iconify-icon>
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
