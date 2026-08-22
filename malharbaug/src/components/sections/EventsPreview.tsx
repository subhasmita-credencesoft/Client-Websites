import Image from 'next/image';
import Link from 'next/link';
import { eventCategories } from '@/data/events';

export default function EventsPreview() {
  return (
    <section className="bg-brand-50 px-6 py-24 dark:bg-brand-900/10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="section-subtitle">Events & Celebrations</p>
          <h2 className="section-title">Make Every Moment Memorable</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {eventCategories.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="relative h-72 w-full">
                <Image
                  src={event.image}
                  alt={`${event.title} at Malhar Baug Resort Alibaug`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <iconify-icon icon={event.icon} width="16" height="16" className="text-white"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">{event.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/events" className="btn-secondary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
