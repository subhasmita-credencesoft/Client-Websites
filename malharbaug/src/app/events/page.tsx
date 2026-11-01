import type { Metadata } from 'next';
import EventsListView from '@/features/events/EventsListView';

export const metadata: Metadata = {
  title: 'Events & Celebrations',
  description:
    'Host weddings, corporate meetings, birthdays and family gatherings at Malhar Baug Resort, Alibaug. Event lawns, catering, decor and customised packages near Nagaon Beach.',
  alternates: { canonical: '/events/' },
};

export default function EventsPage() {
  return <EventsListView />;
}
