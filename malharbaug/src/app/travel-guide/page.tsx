import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { travelGuides } from '@/data/travelGuide';
import { breadcrumbSchema } from '@/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alibaug Travel Guide',
  description:
    'Free Alibaug travel guides — things to do in Alibaug, Nagaon Beach guide, Mumbai & Pune weekend trip plans, best time to visit and a 2-day itinerary by Malhar Baug Resort.',
  alternates: { canonical: '/travel-guide/' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function TravelGuidePage() {
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Alibaug Travel Guide', url: '/travel-guide' },
        ])}
      />
      <main>
        <section className="relative flex min-h-[300px] items-center overflow-hidden bg-gradient-to-br from-brand-900 to-earth-900">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Alibaug Travel Guide</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-earth-100">
              Plan your trip with our local guides — beaches, forts, food, routes from Mumbai &amp; Pune and honest seasonal advice,
              written by the team at Malhar Baug Resort in Nagaon.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {travelGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/travel-guide/${guide.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-earth-900"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-sans text-xs uppercase tracking-wide text-earth-500 dark:text-earth-400">
                    {formatDate(guide.date)} · {guide.readTime}
                  </p>
                  <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-earth-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                    {guide.title}
                  </h2>
                  <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                    {guide.excerpt}
                  </p>
                  <span className="mt-4 font-sans text-sm font-semibold text-brand-600 dark:text-brand-400">
                    Read the guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-brand-200 bg-white p-8 text-center dark:border-brand-800 dark:bg-earth-900">
            <h2 className="font-serif text-xl font-bold text-earth-900 dark:text-white">Planning a Group Trip or Celebration?</h2>
            <p className="mx-auto mt-2 max-w-xl font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
              Read our planning guides on the{' '}
              <Link href="/blog" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                Malhar Baug blog
              </Link>{' '}
              — family stays, group villas, corporate offsites and birthday celebrations.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-brand-700 p-10 text-center dark:bg-brand-900">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Reading About Alibaug? Come Stay in It.
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-brand-100">
              Malhar Baug Resort is a family-friendly garden resort just 2 km from Nagaon Beach — rooms, villas, pool and home-style Konkan food.
            </p>
            <Link
              href="/rooms"
              className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Explore Rooms &amp; Villas
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
