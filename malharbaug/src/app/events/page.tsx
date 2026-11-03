import type { Metadata } from 'next';
import EventsListView from '@/features/events/EventsListView';

export const metadata: Metadata = {
  title: 'Events & Celebration Venue in Alibaug | Malhar Baug Resort',
  description:
    'Host weddings, corporate meetings, birthday parties and family gatherings at Malhar Baug Resort — a premium event venue near Nagaon Beach, Alibaug. Open lawns, catering, décor and customised packages. Capacity 300+.',
  alternates: { canonical: '/events/' },
  keywords: [
    'event venue alibaug',
    'wedding venue alibaug',
    'birthday party venue alibaug',
    'corporate outing alibaug',
    'outdoor event venue nagaon',
    'resort events near mumbai',
    'malhar baug events',
  ],
  openGraph: {
    title: 'Events & Celebration Venue in Alibaug | Malhar Baug Resort',
    description:
      'Weddings, birthdays, corporate offsites and family celebrations at Malhar Baug Resort — open lawns, catering, on-site accommodation near Nagaon Beach, Alibaug.',
    images: [{ url: '/heroimg2.jpeg', width: 1200, height: 630, alt: 'Event lawn at Malhar Baug Resort Alibaug' }],
  },
};

export default function EventsPage() {
  return <EventsListView />;
}
