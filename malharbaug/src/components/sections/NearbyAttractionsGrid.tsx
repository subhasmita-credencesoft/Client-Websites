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
            <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-ocean-50 dark:from-earth-700 dark:via-earth-800 dark:to-earth-900">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-sm dark:bg-earth-900/80">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-600 dark:text-brand-400">
                  {(attraction.id.includes('beach') || attraction.id.includes('nagaon') || attraction.id.includes('alibaug') || attraction.id.includes('varsoli') || attraction.id.includes('kihim') || attraction.id.includes('kashid')) ? (
                    <path d="M12 3L14.5 9H21L15.5 13L17.5 19L12 15L6.5 19L8.5 13L3 9H9.5L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  ) : (attraction.id.includes('fort') || attraction.id.includes('janjira') || attraction.id.includes('revdanda') || attraction.id.includes('kolaba')) ? (
                    <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (attraction.id.includes('jetty') || attraction.id.includes('mandwa')) ? (
                    <path d="M12 3v18M3 9l9-6 9 6M3 15l9-6 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (attraction.id.includes('market')) ? (
                    <path d="M6 6h15l-1.5 9h-13zM6 6L5 3H2M9 13v6M15 13v6M9 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (attraction.id.includes('water') || attraction.id.includes('sport')) ? (
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  ) : (attraction.id.includes('sunset')) ? (
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  )}
                </svg>
              </div>
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
