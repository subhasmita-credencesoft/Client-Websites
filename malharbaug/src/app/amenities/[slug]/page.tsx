import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { resortFacilities } from '@/data/amenities';
import { bookingEngineUrl } from '@/data/booking';
import { breadcrumbSchema } from '@/lib/schema';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return resortFacilities.map((facility) => ({ slug: facility.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const facility = resortFacilities.find((f) => f.slug === params.slug);
  if (!facility) return { title: 'Facility Not Found' };
  return {
    title: `${facility.title} at the Resort`,
    description: `${facility.title} at Malhar Baug Resort, Alibaug — ${facility.description} Book your stay near Nagaon Beach with direct booking rates.`,
    alternates: { canonical: `/amenities/${facility.slug}` },
  };
}

export default function AmenityDetailPage({ params }: Props) {
  const facility = resortFacilities.find((f) => f.slug === params.slug);
  if (!facility) notFound();

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Amenities', url: '/amenities' },
          { name: facility.title, url: `/amenities/${facility.slug}` },
        ])}
      />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden bg-gradient-to-br from-brand-900 to-earth-900">
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur-sm">
                <iconify-icon icon={facility.icon} width="52" height="52"></iconify-icon>
              </div>
            </div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">{facility.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">{facility.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-subtitle">Amenities &amp; Facilities</p>
            <h2 className="section-title">{facility.title} at Malhar Baug</h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              {facility.description} Our {facility.title.toLowerCase()} is designed to make your stay
              comfortable and memorable, whether you are here for a family vacation, a romantic getaway,
              or a corporate retreat. Browse our{' '}
              <Link href="/rooms" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                rooms and villas
              </Link>{' '}
              to plan your stay.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Book Now
              </a>
              <Link
                href="/amenities"
                className="rounded-full border-2 border-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white dark:border-brand-400 dark:text-brand-400"
              >
                View All Amenities
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
