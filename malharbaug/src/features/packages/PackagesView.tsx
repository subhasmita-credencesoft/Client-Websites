import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { packages, offers } from '@/data/packages';
import { bookingEngineUrl } from '@/data/booking';
import { getContact } from '@/lib/api';
import { breadcrumbSchema } from '@/lib/schema';

export default async function PackagesView() {
  const contact = await getContact();

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Packages & Offers', url: '/packages' },
        ])}
      />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[460px] items-center overflow-hidden pt-28 pb-16">
          <Image
            src="/hero3.jpeg"
            alt="Resort stay packages and special offers at Malhar Baug Resort, Alibaug – family packages, group deals near Nagaon Beach"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-brand-600/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Best Rates Guaranteed
            </span>
            <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl">
              Packages &amp; Offers
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Choose from our curated packages and special offers for an unforgettable stay at Malhar Baug Resort, Alibaug.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Book Now – Best Price
              </a>
              <a
                href={`tel:${contact.phone || '+919320062613'}`}
                className="rounded-full border-2 border-white px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call for Group Rates
              </a>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="section-subtitle">Stay Packages</p>
            <h2 className="section-title">Choose Your Perfect Getaway</h2>
            <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              Whether you are planning a family vacation, a couple&apos;s retreat, a group getaway or a corporate offsite, our curated packages include accommodation, meals and resort amenities for a hassle-free experience. All packages include complimentary access to the swimming pool, gardens and outdoor spaces. Check our{' '}
              <Link href="/rooms/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                rooms &amp; villas
              </Link>{' '}
              or{' '}
              <Link href="/contact/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                contact us for customised group deals
              </Link>.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`animate-on-scroll stagger-${(index % 2) + 1} group overflow-hidden rounded-2xl bg-white card-shadow transition-all duration-300 hover:-translate-y-1 dark:bg-earth-800/50`}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.title} – stay package at Malhar Baug Resort Alibaug near Nagaon Beach`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-brand-600 px-4 py-1.5 font-sans text-sm font-bold text-white">
                    {pkg.price}
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {pkg.duration}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-earth-900 dark:text-white">
                    {pkg.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm italic text-earth-500">{pkg.tagline}</p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                    {pkg.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-earth-500">
                      Includes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 font-sans text-xs text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                        >
                          <iconify-icon icon="solar:check-circle-bold" width="14" height="14"></iconify-icon>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={bookingEngineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-brand-600 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      Book Now
                    </a>
                    <a
                      href={`tel:${contact.phone || '+919320062613'}`}
                      className="rounded-full border-2 border-brand-600 px-6 py-2.5 font-sans text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white dark:border-brand-400 dark:text-brand-400"
                    >
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="bg-ocean-50 py-24 dark:bg-ocean-900/20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle">Special Offers</p>
              <h2 className="section-title">Limited Time Deals</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  className={`animate-on-scroll stagger-${(index % 3) + 1} group overflow-hidden rounded-2xl bg-white card-shadow transition-all duration-300 hover:-translate-y-1 dark:bg-earth-800/50`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={offer.image}
                      alt={`${offer.title} – special offer at Malhar Baug Resort Alibaug`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">
                      {offer.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                      {offer.description}
                    </p>
                    <p className="mt-3 font-sans text-xs font-medium text-ocean-600 dark:text-ocean-400">
                      {offer.validity}
                    </p>
                    {offer.code && (
                      <div className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-center font-sans text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                        Use code: {offer.code}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 card-shadow dark:bg-earth-800/50">
              <iconify-icon icon="solar:bed-bold" width="36" height="36" className="text-brand-600"></iconify-icon>
              <h3 className="mt-4 font-serif text-lg font-bold text-earth-900 dark:text-white">Rooms &amp; Villas</h3>
              <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">Browse all 18 rooms and villas at Malhar Baug Resort.</p>
              <Link href="/rooms/" className="mt-4 inline-block font-sans text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                View Rooms →
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-8 card-shadow dark:bg-earth-800/50">
              <iconify-icon icon="solar:star-bold" width="36" height="36" className="text-brand-600"></iconify-icon>
              <h3 className="mt-4 font-serif text-lg font-bold text-earth-900 dark:text-white">Event Packages</h3>
              <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">Weddings, birthdays, corporate outings — we have a package for you.</p>
              <Link href="/events/" className="mt-4 inline-block font-sans text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                View Events →
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-8 card-shadow dark:bg-earth-800/50">
              <iconify-icon icon="solar:phone-bold" width="36" height="36" className="text-brand-600"></iconify-icon>
              <h3 className="mt-4 font-serif text-lg font-bold text-earth-900 dark:text-white">Group Bookings</h3>
              <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">Special rates for groups of 20 or more. Call us to discuss.</p>
              <Link href="/contact/" className="mt-4 inline-block font-sans text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                Contact Us →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
