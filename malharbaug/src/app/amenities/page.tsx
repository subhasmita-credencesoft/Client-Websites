import Image from 'next/image';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { resortFacilities } from '@/data/amenities';

export const metadata: Metadata = {
  title: 'Resort Amenities',
  description:
    'Explore amenities at Malhar Baug Resort, Alibaug — swimming pool, garden lawns, indoor & outdoor games, rain dance, BBQ area, free WiFi, parking and 24-hour room service.',
  alternates: { canonical: '/amenities/' },
};

export default function AmenitiesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=2068"
            alt="Resort amenities at Malhar Baug Resort Alibaug – swimming pool and gardens"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Amenities &amp; Facilities</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Everything you need for a comfortable and memorable stay.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {resortFacilities.map((facility, index) => (
              <a
                key={facility.slug}
                href={`/amenities/${facility.slug}`}
                className={`animate-on-scroll stagger-${(index % 3) + 1} group rounded-2xl bg-white p-8 card-shadow transition-all duration-300 hover:-translate-y-1 dark:bg-earth-800/50`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                  <iconify-icon icon={facility.icon} width="28" height="28"></iconify-icon>
                </div>
                <h3 className="font-serif text-xl font-semibold text-earth-900 dark:text-white">{facility.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">{facility.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand-600 dark:text-brand-400">
                  Learn More
                  <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
