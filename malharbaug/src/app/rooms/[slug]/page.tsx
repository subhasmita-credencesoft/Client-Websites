import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { rooms } from '@/data/rooms';
import { bookingEngineUrl } from '@/data/booking';
import { siteConfig } from '@/lib/site';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) return { title: 'Room Not Found' };
  return {
    title: `${room.title} in Alibaug`,
    description: `${room.title} at Malhar Baug Resort, Alibaug near Nagaon Beach. ${room.tagline}. ${room.capacity}. Rates ${room.price} — book direct for best rates.`,
    alternates: { canonical: `/rooms/${room.slug}/` },
    openGraph: {
      title: `${room.title} | Malhar Baug Resort Alibaug`,
      description: room.description,
      images: [{ url: room.image, alt: `${room.title} at Malhar Baug Resort Alibaug` }],
    },
  };
}

export default function RoomDetailPage({ params }: Props) {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) notFound();

  const otherRooms = rooms.filter((r) => r.slug !== room.slug);
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Rooms & Villas', url: '/rooms' },
    { name: room.title, url: `/rooms/${room.slug}` },
  ];

  const roomSchema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: `${room.title} – Malhar Baug Resort, Alibaug`,
    description: room.description,
    image: room.images,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: parseInt(room.capacity, 10) || undefined,
      unitText: 'guests',
    },
    amenityFeature: room.amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
    })),
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: parseInt(room.price.replace(/[^0-9]/g, ''), 10) || undefined,
        priceCurrency: 'INR',
      },
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/rooms/${room.slug}/`,
    },
  };

  return (
    <>
      <Header />
      <JsonLd data={roomSchema} />
      <main>
        <nav aria-label="Breadcrumb" className="relative z-10 bg-earth-100 px-6 py-3 dark:bg-earth-800/50">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 font-sans text-xs text-earth-600 dark:text-earth-300">
            <li>
              <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/rooms" className="hover:text-brand-600 dark:hover:text-brand-400">Rooms & Villas</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-brand-700 dark:text-brand-300">{room.title}</li>
          </ol>
        </nav>

        <section className="relative flex min-h-[500px] items-end overflow-hidden">
          <Image
            src={room.image}
            alt={`${room.title} at Malhar Baug Resort, Alibaug`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-300">{room.tagline}</p>
            <h1 className="mt-1 font-serif text-5xl font-bold text-white sm:text-6xl">
              {room.title} in Alibaug
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="font-serif text-2xl font-bold text-brand-300">{room.price}</span>
              <span className="font-sans text-sm text-earth-200">{room.capacity}</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="animate-on-scroll">
              <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">About This Room</h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">{room.description}</p>
              <p className="mt-4 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                Located in Palhe, Nagaon, just 2 km from Nagaon Beach, this stay includes access to the swimming pool,
                gardens and our multi-cuisine restaurant.{' '}
                <Link href="/amenities" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                  View all resort amenities
                </Link>{' '}
                or{' '}
                <Link href="/contact" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                  contact us
                </Link>{' '}
                for group rates.
              </p>
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Book This Room
              </a>
            </div>
            <div className="animate-on-scroll stagger-1">
              <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">Amenities</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2 font-sans text-sm text-earth-600 dark:text-earth-300">
                    <iconify-icon icon="solar:check-circle-bold" width="18" height="18" className="text-brand-500"></iconify-icon>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-earth-100 py-16 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">Gallery</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {room.images.map((img, i) => (
                <div key={i} className={`relative h-72 overflow-hidden rounded-2xl ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <Image
                    src={img}
                    alt={`${room.title} photo ${i + 1} – Malhar Baug Resort, Nagaon, Alibaug`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-earth-900 dark:text-white">
            Explore Other Stays at Malhar Baug
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {otherRooms.map((other) => (
              <Link
                key={other.slug}
                href={`/rooms/${other.slug}`}
                className="group relative h-56 overflow-hidden rounded-2xl"
              >
                <Image
                  src={other.image}
                  alt={`${other.title} at Malhar Baug Resort Alibaug`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="hero-overlay absolute inset-0 z-0" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <h3 className="font-serif text-xl font-bold text-white">{other.title}</h3>
                  <p className="font-sans text-xs text-earth-200">{other.price} · {other.capacity}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-brand-700 py-16 text-center dark:bg-brand-900">
          <h2 className="font-serif text-3xl font-bold text-white">Ready to Book?</h2>
          <p className="mx-auto mt-2 max-w-xl px-6 font-sans text-base text-brand-100">
            Reserve the {room.title} at Malhar Baug Resort today — book direct for the best available rates.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={bookingEngineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Check Availability & Prices
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="rounded-full border-2 border-white px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-700"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
