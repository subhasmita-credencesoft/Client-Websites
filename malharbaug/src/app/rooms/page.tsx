import Image from 'next/image';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { rooms } from '@/data/rooms';

export const metadata: Metadata = {
  title: 'Rooms & Villas',
  description:
    'Choose from luxury deluxe rooms, spacious family suites and private villas at Malhar Baug Resort, Alibaug. AC rooms with modern amenities, garden views and rates starting ₹4,500/night near Nagaon Beach.',
  alternates: { canonical: '/rooms' },
};

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2068"
            alt="Luxury rooms and villas at Malhar Baug Resort, family resort in Alibaug near Nagaon Beach"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Our Rooms &amp; Villas</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Choose from our collection of thoughtfully designed accommodations for the perfect stay.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {rooms.map((room, index) => (
              <div key={room.id} className={`animate-on-scroll stagger-${(index % 3) + 1} group overflow-hidden rounded-2xl bg-white card-shadow dark:bg-earth-800/50`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">{room.tagline}</p>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-earth-900 dark:text-white">{room.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">{room.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 5).map((amenity) => (
                      <span key={amenity} className="rounded-full bg-earth-100 px-3 py-1 font-sans text-xs text-earth-700 dark:bg-earth-700 dark:text-earth-200">
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
                      <span className="font-serif text-xl font-bold text-brand-700 dark:text-brand-400">{room.price}</span>
                      <p className="font-sans text-xs text-earth-500">{room.capacity}</p>
                    </div>
                    <a href={`/rooms/${room.slug}`} className="rounded-full bg-brand-600 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
