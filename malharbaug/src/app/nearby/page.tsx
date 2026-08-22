import Image from 'next/image';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { nearbyAttractions } from '@/data/nearby';

export const metadata: Metadata = {
  title: 'Places to Visit Near Nagaon Beach',
  description:
    'Discover the best places to visit near Malhar Baug Resort — Nagaon Beach (2 km), Alibaug Beach, Kolaba Fort, Kihim Beach, Kashid Beach, Murud Janjira and top things to do in Alibaug.',
  alternates: { canonical: '/nearby/' },
};

export default function NearbyPage() {
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
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
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
