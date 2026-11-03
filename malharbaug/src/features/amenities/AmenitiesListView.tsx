import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { resortFacilities } from '@/data/amenities';
import { breadcrumbSchema } from '@/lib/schema';

export default function AmenitiesListView() {
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Amenities & Facilities', url: '/amenities' },
        ])}
      />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[460px] items-center overflow-hidden pt-28 pb-16">
          <Image
            src="/swimmingpool.jpeg"
            alt="Swimming pool and resort facilities at Malhar Baug Resort, Alibaug – garden, pool, lawn and outdoor amenities near Nagaon Beach"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-brand-600/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Resort Amenities
            </span>
            <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl">
              Amenities &amp; Facilities
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Everything you need for a comfortable, fun and memorable stay at Malhar Baug Resort in Alibaug.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/rooms/"
                className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                View Rooms &amp; Villas
              </Link>
              <Link
                href="/contact/"
                className="rounded-full border-2 border-white px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Intro Text */}
        <section className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="section-subtitle">What We Offer</p>
          <h2 className="section-title">World-Class Amenities in Konkan</h2>
          <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
            Malhar Baug Resort in Nagaon, Alibaug offers a wide range of resort amenities designed for families, couples and corporate groups. From a crystal-clear swimming pool and lush open lawns to indoor games, rain dance, BBQ evenings and free WiFi — every detail is crafted for your comfort. All primary amenities are complimentary for resort guests.
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
            Located just 2 km from Nagaon Beach and 9 km from Alibaug town, our resort is the ideal base for exploring the Konkan coast. Explore our{' '}
            <Link href="/nearby/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              nearby attractions
            </Link>{' '}
            or unwind by the pool with our{' '}
            <Link href="/restaurant/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              home-style Konkan cuisine
            </Link>.
          </p>
        </section>

        {/* Amenities Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {resortFacilities.map((facility, index) => (
              <Link
                key={facility.slug}
                href={`/amenities/${facility.slug}`}
                className={`animate-on-scroll stagger-${(index % 3) + 1} group rounded-2xl bg-white p-8 card-shadow transition-all duration-300 hover:-translate-y-1 dark:bg-earth-800/50`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                  <iconify-icon icon={facility.icon} width="28" height="28"></iconify-icon>
                </div>
                <h3 className="font-serif text-xl font-semibold text-earth-900 dark:text-white">
                  {facility.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                  {facility.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand-600 dark:text-brand-400">
                  Learn More
                  <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-brand-700 py-16 text-center dark:bg-brand-900">
          <h2 className="font-serif text-3xl font-bold text-white">Ready to Experience It All?</h2>
          <p className="mx-auto mt-3 max-w-xl px-6 font-sans text-base text-brand-100">
            Book a room at Malhar Baug Resort and enjoy complimentary access to all amenities — pool, lawns, gardens and more.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/rooms/"
              className="rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Browse Rooms &amp; Villas
            </Link>
            <Link
              href="/contact/"
              className="rounded-full border-2 border-white px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Enquire Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
