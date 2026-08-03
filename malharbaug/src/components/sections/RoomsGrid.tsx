import Image from 'next/image';
import { rooms } from '@/data/rooms';

export default function RoomsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="section-subtitle">Accommodation</p>
        <h2 className="section-title">Luxury Rooms & Villas for Every Occasion</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="card-shadow group overflow-hidden rounded-2xl border border-brand-100 bg-white transition-shadow duration-200 hover:shadow-lg dark:border-brand-800/30 dark:bg-earth-800"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={room.image}
                alt={room.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-white">
                {room.title}
              </h3>
              <p className="mt-1 font-sans text-sm text-brand-600 dark:text-brand-400">
                {room.tagline}
              </p>

              <div className="mt-4 flex items-center gap-2 font-sans text-sm text-neutral-600 dark:text-neutral-400">
                <iconify-icon icon="solar:users-group-rounded-bold" width="16" height="16"></iconify-icon>
                <span>{room.capacity}</span>
              </div>

              <p className="mt-2 font-serif text-lg font-bold text-brand-600 dark:text-brand-400">
                {room.price}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {room.amenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-brand-50 px-3 py-1 font-sans text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <a
                href={`/rooms/${room.slug}`}
                className="btn-primary mt-6 inline-flex"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
