import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { getRooms } from '@/lib/api';
import { breadcrumbSchema } from '@/lib/schema';

export default async function RoomsListView() {
  const rooms = await getRooms();

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Rooms & Villas', url: '/rooms' },
        ])}
      />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[460px] items-center overflow-hidden pt-28 pb-16">
          <Image
            src={rooms[0]?.image || '/heroimg1.jpeg'}
            alt="Rooms and villas at Malhar Baug Resort, family resort in Alibaug near Nagaon Beach"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-brand-600/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Accommodations
            </span>
            <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl">
              Our Rooms &amp; Villas
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Choose from our collection of thoughtfully designed accommodations for the perfect stay in Alibaug.
            </p>
          </div>
        </section>

        {/* SEO Intro Paragraph */}
        <section className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="section-subtitle">Where You Stay</p>
          <h2 className="section-title">Comfortable Stays Near Nagaon Beach</h2>
          <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
            Malhar Baug Resort offers 18 well-appointed rooms and villas set amidst 2+ acres of lush greenery in Nagaon, Alibaug. Whether you are planning a family holiday, a romantic getaway or a group retreat, our accommodations are designed to offer comfort, privacy and a connection with nature. Every room includes complimentary access to the resort&apos;s pool, gardens and amenities.
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
            Just 2 km from Nagaon Beach, 9 km from Alibaug town and 28 km from Mandwa Jetty — we are the closest quality resort to the beach.{' '}
            <Link href="/contact/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              Contact us for group rates
            </Link>{' '}
            and special stay enquiries.
          </p>
        </section>

        {/* Rooms Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          {rooms.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-sans text-earth-600 dark:text-earth-300">
                Room details are being updated. Please{' '}
                <Link href="/contact/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                  contact us
                </Link>{' '}
                for current availability and rates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className={`animate-on-scroll stagger-${(index % 3) + 1} group overflow-hidden rounded-2xl bg-white card-shadow dark:bg-earth-800/50`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={`${room.title} – comfortable accommodation at Malhar Baug Resort, Alibaug near Nagaon Beach`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {room.tagline}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-earth-900 dark:text-white">
                      {room.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                      {room.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {room.amenities.slice(0, 5).map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-earth-100 px-3 py-1 font-sans text-xs text-earth-700 dark:bg-earth-700 dark:text-earth-200"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 5 && (
                        <span className="rounded-full bg-earth-100 px-3 py-1 font-sans text-xs text-earth-700 dark:bg-earth-700 dark:text-earth-200">
                          +{room.amenities.length - 5} more
                        </span>
                      )}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="font-serif text-xl font-bold text-brand-700 dark:text-brand-400">
                          {room.price}
                        </span>
                        <p className="font-sans text-xs text-earth-500">{room.capacity}</p>
                      </div>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="rounded-full bg-brand-600 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Internal Links CTA */}
        <section className="bg-earth-100 py-16 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
              <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-earth-900">
                <iconify-icon icon="solar:swimming-bold" width="36" height="36" className="text-brand-600"></iconify-icon>
                <h3 className="mt-4 font-serif text-lg font-bold text-earth-900 dark:text-white">Resort Amenities</h3>
                <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">Pool, lawns, rain dance, BBQ and more — all included with your stay.</p>
                <Link href="/amenities/" className="mt-4 inline-block font-sans text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                  Explore Amenities →
                </Link>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-earth-900">
                <iconify-icon icon="solar:phone-bold" width="36" height="36" className="text-brand-600"></iconify-icon>
                <h3 className="mt-4 font-serif text-lg font-bold text-earth-900 dark:text-white">Get a Custom Quote</h3>
                <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">Group bookings, family stays and special rates — contact us directly.</p>
                <Link href="/contact/" className="mt-4 inline-block font-sans text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                  Contact Us →
                </Link>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-earth-900">
                <iconify-icon icon="solar:map-point-wave-bold" width="36" height="36" className="text-brand-600"></iconify-icon>
                <h3 className="mt-4 font-serif text-lg font-bold text-earth-900 dark:text-white">Nearby Attractions</h3>
                <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">Nagaon Beach, Kolaba Fort, Akshi Beach — all within 10 km of the resort.</p>
                <Link href="/nearby/" className="mt-4 inline-block font-sans text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                  Explore Nearby →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
