import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { rooms } from '@/data/rooms';
import { bookingEngineUrl } from '@/data/booking';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) return { title: 'Room Not Found' };
  return {
    title: `${room.title} | Malhar Baug Resort Alibaug`,
    description: room.description,
  };
}

export default function RoomDetailPage({ params }: Props) {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[500px] items-end overflow-hidden">
          <Image
            src={room.image}
            alt={room.title}
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-300">{room.tagline}</p>
            <h1 className="mt-1 font-serif text-5xl font-bold text-white sm:text-6xl">{room.title}</h1>
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
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Book Now
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
                    alt={`${room.title} image ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">Ready to Book?</h2>
          <p className="mt-2 font-sans text-base text-earth-600 dark:text-earth-300">
            Reserve your stay at Malhar Baug Resort today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919876543210"
              className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Call to Book
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white dark:border-brand-400 dark:text-brand-400"
            >
              WhatsApp Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
