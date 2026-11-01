'use client';

import { whyChooseItems } from '@/data/amenities';

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-50 px-6 py-24 dark:bg-brand-900/10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="section-subtitle">Why Choose Us</p>
          <h2 className="section-title">Experience the Best of Nature & Comfort</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseItems.map((item) => (
            <div
              key={item.title}
              className="card-shadow rounded-2xl border border-brand-100 bg-white p-6 transition-shadow duration-200 hover:shadow-lg dark:border-brand-800/30 dark:bg-earth-800"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                <iconify-icon icon={item.icon} width="22" height="22"></iconify-icon>
              </div>
              <h3 className="font-sans text-base font-semibold text-earth-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
