import Image from 'next/image';
import Link from 'next/link';
import { nearbyAttractions } from '@/data/nearby';

export default function NearbyAttractionsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="section-subtitle">Explore Nearby</p>
        <h2 className="section-title">Places to Visit Near Nagaon Beach</h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
          Beaches, sea forts and sunset points — all a short drive from Malhar Baug Resort. Read our full{' '}
          <Link href="/travel-guide/things-to-do-in-alibaug" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
            list of things to do in Alibaug
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {nearbyAttractions.map((attraction) => (
          <div
            key={attraction.id}
            className="card-shadow group overflow-hidden rounded-2xl border border-brand-100 bg-white transition-shadow duration-200 hover:shadow-lg dark:border-brand-800/30 dark:bg-earth-800"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={attraction.image}
                alt={`${attraction.name} near Malhar Baug Resort, Alibaug – ${attraction.distance} away`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-brand-600 px-3 py-1 font-sans text-xs font-semibold text-white">
                {attraction.distance}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-serif text-base font-bold text-earth-900 dark:text-white">
                {attraction.name}
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {attraction.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/nearby" className="btn-secondary">
          Explore More
        </Link>
      </div>
    </section>
  );
}
