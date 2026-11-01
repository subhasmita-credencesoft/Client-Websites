'use client';

import Link from 'next/link';
import { resortFacilities } from '@/data/amenities';
import AmenityCard from './AmenityCard';

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
            <AmenityCard key={facility.title} amenity={facility} />
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
