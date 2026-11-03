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
          Beaches, sea forts, and coastal attractions — all a short scenic drive from Malhar Baug Resort. Read our full{' '}
          <Link href="/nearby/" className="text-brand-600 font-semibold underline hover:text-brand-700 dark:text-brand-400">
            nearby sightseeing guide
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {nearbyAttractions.slice(0, 8).map((attraction) => (
          <div
            key={attraction.id}
            className="card-shadow group flex flex-col justify-between overflow-hidden rounded-2xl border border-earth-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-earth-700 dark:bg-earth-800"
          >
            <div>
              {/* Image with Distance Pill */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-earth-100 dark:bg-earth-900">
                {attraction.image ? (
                  <Image
                    src={attraction.image}
                    alt={`${attraction.name} near Malhar Baug Resort`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <iconify-icon icon="solar:camera-bold" width="32" height="32" className="text-earth-400"></iconify-icon>
                  </div>
                )}
                <span className="absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2.5 py-0.5 font-sans text-[10px] font-semibold text-white backdrop-blur-md">
                  {attraction.category}
                </span>
                <span className="absolute right-2.5 top-2.5 rounded-full bg-brand-600/90 px-2.5 py-0.5 font-sans text-[10px] font-bold text-white shadow backdrop-blur-md">
                  {attraction.distance}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <span className="font-sans text-[10px] font-medium text-brand-600 dark:text-brand-400">
                  {attraction.driveTime} drive
                </span>
                <h3 className="font-serif text-base font-bold text-earth-900 dark:text-white mt-0.5 group-hover:text-brand-600 transition-colors">
                  {attraction.name}
                </h3>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-earth-600 dark:text-earth-300 line-clamp-2">
                  {attraction.description}
                </p>
              </div>
            </div>

            <div className="border-t border-earth-100 px-4 py-3 dark:border-earth-700/60 flex items-center justify-between">
              <Link
                href="/nearby/"
                className="inline-flex items-center gap-1 font-sans text-[11px] font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                <span>View Details</span>
                <iconify-icon icon="solar:arrow-right-linear" width="12" height="12"></iconify-icon>
              </Link>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  attraction.mapsQuery || attraction.name,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] font-medium text-earth-500 hover:text-earth-900 dark:text-earth-400"
              >
                Maps
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/nearby/"
          className="btn-primary"
        >
          <span>View All 12 Nearby Attractions &amp; Photos</span>
          <iconify-icon icon="solar:arrow-right-linear" width="18" height="18"></iconify-icon>
        </Link>
      </div>
    </section>
  );
}
