'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { nearbyAttractions } from '@/data/nearby';
import { NearbyAttraction } from '@/types';
import { bookingEngineUrl } from '@/config/booking';

const categories = ['All', 'Beach', 'Fort & Heritage', 'Transport & Ferry', 'Experience'] as const;

export default function NearbyView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeAttraction, setActiveAttraction] = useState<NearbyAttraction | null>(null);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState<number>(0);

  const filteredAttractions = selectedCategory === 'All'
    ? nearbyAttractions
    : nearbyAttractions.filter((item) => item.category === selectedCategory);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveAttraction(null);
    };

    if (activeAttraction) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeAttraction]);

  const handleOpenModal = (attraction: NearbyAttraction) => {
    setActiveAttraction(attraction);
    setActiveModalImageIndex(0);
  };

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-earth-900">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[460px] sm:min-h-[520px] md:min-h-[580px] w-full items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
          aria-label="Nearby Attractions near Malhar Baug Resort"
        >
          <Image
            src="/hero4.avif"
            alt="Pristine Nagaon Beach near Malhar Baug Resort, Alibaug"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover object-center"
          />
          {/* Subtle Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/50 to-black/60" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              <iconify-icon icon="solar:map-point-wave-bold" width="16" height="16" className="text-brand-400"></iconify-icon>
              <span>Explore Alibaug &amp; Konkan Coast</span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-md">
              Nearby Attractions &amp; Sightseeing
            </h1>

            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-earth-100 sm:text-lg">
              From the water sports of Nagaon Beach just 2 km away to 300-year-old island sea forts and peaceful casuarina groves — discover the finest attractions around Malhar Baug Resort.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shadow-lg"
              >
                <span>Book Stay Near Nagaon Beach</span>
                <iconify-icon icon="solar:calendar-bold" width="18" height="18"></iconify-icon>
              </a>
              <Link
                href="/rooms/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-7 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-earth-900"
              >
                <span>Explore Rooms &amp; Villas</span>
                <iconify-icon icon="solar:arrow-right-linear" width="18" height="18"></iconify-icon>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Highlights Bar */}
        <section className="border-b border-earth-100 bg-earth-50 py-8 dark:border-earth-800 dark:bg-earth-800/40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400">2.0 km</p>
                <p className="font-sans text-xs sm:text-sm text-earth-700 dark:text-earth-300">To Nagaon Beach (5 mins)</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400">4.2 km</p>
                <p className="font-sans text-xs sm:text-sm text-earth-700 dark:text-earth-300">To Akshi Beach (8 mins)</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400">9.0 km</p>
                <p className="font-sans text-xs sm:text-sm text-earth-700 dark:text-earth-300">To Kolaba Sea Fort (18 mins)</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400">28.0 km</p>
                <p className="font-sans text-xs sm:text-sm text-earth-700 dark:text-earth-300">To Mandwa Ro-Ro Jetty (45 mins)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-earth-200/60 pb-8 dark:border-earth-800">
            <div>
              <p className="section-subtitle">Local Destination Guide</p>
              <h2 className="section-title">Places to Visit Near Nagaon</h2>
              <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">
                Click any attraction to view high-resolution photos, in-depth travel tips, and visitor guides.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-2 font-sans text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-earth-100 text-earth-700 hover:bg-earth-200 dark:bg-earth-800 dark:text-earth-200 dark:hover:bg-earth-700'
                  }`}
                >
                  {cat === 'All' ? 'All Places (12)' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Attractions Grid with Unsplash Images */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAttractions.map((attraction: NearbyAttraction) => (
              <div
                key={attraction.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-earth-200/80 card-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-earth-800 dark:border-earth-700"
              >
                <div>
                  {/* Image with Badges */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-earth-100 dark:bg-earth-900">
                    {attraction.image ? (
                      <Image
                        src={attraction.image}
                        alt={`${attraction.name} near Malhar Baug Resort Alibaug`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <iconify-icon icon="solar:camera-bold" width="36" height="36" className="text-earth-400"></iconify-icon>
                      </div>
                    )}
                    {/* Category Tag */}
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-black/60 px-3 py-1 font-sans text-xs font-semibold text-white backdrop-blur-md">
                      {attraction.category}
                    </span>
                    {/* Distance Tag */}
                    <span className="absolute right-3.5 top-3.5 rounded-full bg-brand-600/95 px-3 py-1 font-sans text-xs font-bold text-white shadow-md backdrop-blur-md">
                      {attraction.distance}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-brand-600 dark:text-brand-400">
                      <iconify-icon icon="solar:clock-circle-bold" width="14" height="14"></iconify-icon>
                      <span>{attraction.driveTime} drive from Malhar Baug Resort</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-white mt-1.5 group-hover:text-brand-600 transition-colors">
                      {attraction.name}
                    </h3>

                    <p className="mt-2.5 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300 line-clamp-3">
                      {attraction.description}
                    </p>

                    {/* Highlights Tags */}
                    {attraction.highlights && attraction.highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {attraction.highlights.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-earth-100 px-2.5 py-1 font-sans text-[11px] font-medium text-earth-700 dark:bg-earth-700/60 dark:text-earth-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="border-t border-earth-100 px-6 py-4 dark:border-earth-700/60 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(attraction)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 font-sans text-xs font-bold text-brand-700 hover:bg-brand-600 hover:text-white transition-all dark:bg-brand-950 dark:text-brand-300 dark:hover:bg-brand-600 dark:hover:text-white"
                  >
                    <span>View Details &amp; Photos</span>
                    <iconify-icon icon="solar:eye-bold" width="14" height="14"></iconify-icon>
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      attraction.mapsQuery || attraction.name,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-earth-500 hover:text-earth-900 dark:text-earth-400 dark:hover:text-white"
                    title={`Directions to ${attraction.name}`}
                  >
                    <iconify-icon icon="solar:routing-2-bold" width="16" height="16"></iconify-icon>
                    <span>Maps</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Modal / Drawer when clicking "View Details" */}
        {activeAttraction && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveAttraction(null)}
          >
            <div
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-earth-900 border border-earth-200 dark:border-earth-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveAttraction(null)}
                aria-label="Close attraction details"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black transition-colors"
              >
                <iconify-icon icon="solar:close-circle-bold" width="24" height="24"></iconify-icon>
              </button>

              {/* Modal Main Image & Gallery */}
              <div className="relative">
                <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-earth-950">
                  <Image
                    src={
                      activeAttraction.galleryImages && activeAttraction.galleryImages[activeModalImageIndex]
                        ? activeAttraction.galleryImages[activeModalImageIndex]
                        : activeAttraction.image || '/hero4.avif'
                    }
                    alt={activeAttraction.name}
                    fill
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Header overlay info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-full bg-brand-600 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-white">
                        {activeAttraction.category}
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 font-sans text-xs font-semibold backdrop-blur-md">
                        {activeAttraction.distance} from Malhar Baug Resort
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-4xl font-bold">
                      {activeAttraction.name}
                    </h2>
                  </div>
                </div>

                {/* Gallery Thumbnails if multiple images exist */}
                {activeAttraction.galleryImages && activeAttraction.galleryImages.length > 1 && (
                  <div className="flex items-center gap-3 px-6 py-3 bg-earth-50 dark:bg-earth-800/80 border-b border-earth-100 dark:border-earth-700 overflow-x-auto">
                    <span className="font-sans text-xs font-bold text-earth-500 uppercase tracking-wider shrink-0">
                      Photos ({activeAttraction.galleryImages.length}):
                    </span>
                    {activeAttraction.galleryImages.map((imgUrl, i) => (
                      <button
                        key={imgUrl}
                        type="button"
                        onClick={() => setActiveModalImageIndex(i)}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                          activeModalImageIndex === i
                            ? 'border-brand-600 scale-105 shadow-md'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image src={imgUrl} alt={`${activeAttraction.name} preview ${i + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Content Details */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Distance & Quick Info Badges */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl bg-earth-50 p-4 dark:bg-earth-800/60 border border-earth-100 dark:border-earth-700 text-center">
                  <div>
                    <span className="block font-sans text-[11px] font-semibold text-earth-500 uppercase">Distance</span>
                    <span className="font-serif text-lg font-bold text-earth-900 dark:text-white">{activeAttraction.distance}</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[11px] font-semibold text-earth-500 uppercase">Drive Time</span>
                    <span className="font-serif text-lg font-bold text-brand-600 dark:text-brand-400">{activeAttraction.driveTime}</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[11px] font-semibold text-earth-500 uppercase">Ideal Time</span>
                    <span className="font-serif text-lg font-bold text-earth-900 dark:text-white">{activeAttraction.duration || '2-3 Hours'}</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[11px] font-semibold text-earth-500 uppercase">Best Visiting Hours</span>
                    <span className="font-sans text-xs font-bold text-earth-900 dark:text-white mt-1 block">
                      {activeAttraction.bestTime ? activeAttraction.bestTime.split('(')[0] : 'Morning / Sunset'}
                    </span>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-white mb-2">
                    About {activeAttraction.name}
                  </h3>
                  <div className="font-sans text-sm leading-relaxed text-earth-700 dark:text-earth-300 space-y-3 whitespace-pre-line">
                    {activeAttraction.longDescription || activeAttraction.description}
                  </div>
                </div>

                {/* Things to Do & Activities */}
                {activeAttraction.activities && activeAttraction.activities.length > 0 && (
                  <div className="rounded-2xl bg-brand-50/70 p-6 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900">
                    <h4 className="font-serif text-lg font-bold text-brand-950 dark:text-brand-200 mb-3 flex items-center gap-2">
                      <iconify-icon icon="solar:stars-minimalistic-bold" width="20" height="20" className="text-brand-600 dark:text-brand-400"></iconify-icon>
                      <span>Top Things to Do &amp; Experience</span>
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {activeAttraction.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2 text-sm text-earth-800 dark:text-earth-200">
                          <iconify-icon icon="solar:check-circle-bold" width="18" height="18" className="text-brand-600 dark:text-brand-400 shrink-0 mt-0.5"></iconify-icon>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Travel & Visitor Tips */}
                {activeAttraction.travelTips && activeAttraction.travelTips.length > 0 && (
                  <div>
                    <h4 className="font-serif text-lg font-bold text-earth-900 dark:text-white mb-3 flex items-center gap-2">
                      <iconify-icon icon="solar:info-circle-bold" width="20" height="20" className="text-brand-600"></iconify-icon>
                      <span>Helpful Visitor Tips from Malhar Baug Team</span>
                    </h4>
                    <div className="space-y-2">
                      {activeAttraction.travelTips.map((tip) => (
                        <div key={tip} className="flex items-start gap-2.5 rounded-xl bg-earth-50 p-3.5 dark:bg-earth-800 border border-earth-100 dark:border-earth-700">
                          <iconify-icon icon="solar:lightbulb-bolt-bold" width="18" height="18" className="text-amber-500 shrink-0 mt-0.5"></iconify-icon>
                          <span className="font-sans text-xs sm:text-sm text-earth-700 dark:text-earth-300">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal SEO Link & Booking CTA Box */}
                <div className="rounded-2xl bg-gradient-to-br from-earth-900 to-earth-950 p-6 sm:p-7 text-white shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div>
                      <span className="font-sans text-xs uppercase tracking-wider text-brand-300 font-semibold">
                        Stay Near {activeAttraction.name}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white">
                        Book Your Stay at Malhar Baug Resort
                      </h4>
                      <p className="mt-1.5 font-sans text-xs sm:text-sm text-earth-200 max-w-lg leading-relaxed">
                        Located only {activeAttraction.distance} ({activeAttraction.driveTime}) away in Palhe, Nagaon. Enjoy private family villas, swimming pool, and authentic Konkan cuisine.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href={bookingEngineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <span>Book Room Online</span>
                        <iconify-icon icon="solar:calendar-bold" width="16" height="16"></iconify-icon>
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          activeAttraction.mapsQuery || activeAttraction.name,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-5 py-3 font-sans text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                      >
                        <iconify-icon icon="solar:routing-2-bold" width="16" height="16"></iconify-icon>
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Travel Tips Section */}
        <section className="bg-earth-100/60 py-20 dark:bg-earth-800/40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle">Local Tips &amp; Insights</p>
              <h2 className="section-title">Tips for Exploring Alibaug</h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-earth-600 dark:text-earth-300">
                Helpful advice from our local resort team to help you make the most of your stay near Nagaon Beach.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: 'solar:ferry-bold',
                  title: 'Mandwa Ro-Ro Ferry (M2M)',
                  desc: 'Drive your vehicle directly onto the ship at Bhaucha Dhakka, Mumbai; arrive in Mandwa in 60 minutes, bypassing highway jams.',
                },
                {
                  icon: 'solar:water-sun-bold',
                  title: 'Nagaon Beach Water Sports',
                  desc: 'Water sports operate daily 9:00 AM – 6:00 PM. Morning tides offer the calmest waters and shortest queues for jet skiing & parasailing.',
                },
                {
                  icon: 'solar:castle-bold',
                  title: 'Kolaba Fort Low Tide Walking',
                  desc: 'Kolaba Fort is in the middle of the sea. Check local low-tide schedules so you can walk or ride a horse cart right across the seabed.',
                },
                {
                  icon: 'solar:chef-hat-bold',
                  title: 'Authentic Konkan Food',
                  desc: 'Don’t miss fresh Surmai/Pomfret coastal thalis, sweet Alibaug white onions, and Solkadhi served at Malhar Baug Resort’s kitchen.',
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="rounded-2xl bg-white p-7 card-shadow dark:bg-earth-800/80 border border-earth-100 dark:border-earth-700"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <iconify-icon icon={tip.icon} width="24" height="24"></iconify-icon>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">
                    {tip.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-900 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              Stay Close to Everything, Sleep in Peace
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-brand-100 sm:text-lg">
              Book your stay at Malhar Baug Resort — nestled in a peaceful coconut orchard just 5 minutes from Nagaon Beach.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-semibold text-brand-900 shadow-xl transition-all duration-200 hover:bg-brand-50"
              >
                <span>Book Direct Online</span>
                <iconify-icon icon="solar:arrow-right-linear" width="18" height="18"></iconify-icon>
              </a>
              <Link
                href="/rooms/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 font-sans text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-brand-900"
              >
                <iconify-icon icon="solar:bed-bold" width="18" height="18"></iconify-icon>
                <span>View Rooms &amp; Villas</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
