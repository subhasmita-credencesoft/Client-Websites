import Link from 'next/link';
import { eventCategories } from '@/data/events';
import EventCard from './EventCard';

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
            <EventCard key={event.id} event={event} />
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
