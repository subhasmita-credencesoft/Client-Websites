'use client';

import Link from 'next/link';
import { resortFacilities } from '@/data/amenities';

export default function AmenitiesGrid() {
  return (
    <section className="bg-white px-6 py-24 dark:bg-earth-900">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="section-subtitle">Amenities</p>
          <h2 className="section-title">Everything You Need for a Perfect Stay</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {resortFacilities.map((facility) => (
            <div
              key={facility.title}
              className="rounded-2xl border border-brand-100 bg-white p-6 text-center transition-shadow duration-200 hover:shadow-lg dark:border-brand-800/30 dark:bg-earth-800"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                <iconify-icon icon={facility.icon} width="24" height="24"></iconify-icon>
              </div>
              <h3 className="font-sans text-sm font-semibold text-earth-900 dark:text-white">
                {facility.title}
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {facility.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/amenities" className="btn-secondary">
            Explore All Amenities
          </Link>
        </div>
      </div>
    </section>
  );
}
