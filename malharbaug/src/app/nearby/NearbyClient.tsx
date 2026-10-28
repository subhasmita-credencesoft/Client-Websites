'use client';

import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { nearbyAttractions } from '@/data/nearby';

export default function NearbyClient() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2068"
            alt="Nagaon Beach near Malhar Baug Resort Alibaug – places to visit around the resort"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Nearby Attractions</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Explore the best of Alibaug and the surrounding Konkan region.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-subtitle">Explore Alibaug</p>
            <h2 className="section-title">Discover Hidden Gems</h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              Malhar Baug Resort is perfectly located near some of the most beautiful beaches, historic forts,
              and cultural attractions that Alibaug and the Konkan coast have to offer.
            </p>
          </div>
        </section>

        <section className="bg-earth-100 pb-24 pt-12 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {nearbyAttractions.map((attraction, index) => (
                <div
                  key={attraction.id}
                  className={`animate-on-scroll stagger-${(index % 3) + 1} group overflow-hidden rounded-2xl bg-white card-shadow transition-all duration-300 hover:-translate-y-1 dark:bg-earth-800/50`}
                >
                  <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-ocean-50 dark:from-earth-700 dark:via-earth-800 dark:to-earth-900">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 dark:bg-earth-900/80">
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-600 dark:text-brand-400">
                        {attraction.id.includes('beach') || attraction.id.includes('nagaon') || attraction.id.includes('alibaug') || attraction.id.includes('varsoli') || attraction.id.includes('kihim') || attraction.id.includes('kashid') ? (
                          <path d="M12 3L14.5 9H21L15.5 13L17.5 19L12 15L6.5 19L8.5 13L3 9H9.5L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        ) : attraction.id.includes('fort') || attraction.id.includes('janjira') || attraction.id.includes('revdanda') || attraction.id.includes('kolaba') ? (
                          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : attraction.id.includes('jetty') || attraction.id.includes('mandwa') ? (
                          <path d="M12 3v18M3 9l9-6 9 6M3 15l9-6 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : attraction.id.includes('market') ? (
                          <path d="M6 6h15l-1.5 9h-13zM6 6L5 3H2M9 13v6M15 13v6M9 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : attraction.id.includes('water') || attraction.id.includes('sport') ? (
                          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        ) : attraction.id.includes('sunset') ? (
                          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : (
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        )}
                      </svg>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">{attraction.name}</h3>
                      <span className="rounded-full bg-ocean-100 px-3 py-0.5 font-sans text-xs font-medium text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-300">
                        {attraction.distance}
                      </span>
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
