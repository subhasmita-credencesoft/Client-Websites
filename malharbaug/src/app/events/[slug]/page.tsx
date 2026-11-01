import { notFound } from 'next/navigation';
import { eventCategories } from '@/data/events';
import EventDetailView from '@/features/events/EventDetailView';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return eventCategories.map((event) => ({ slug: event.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const event = eventCategories.find((e) => e.id === params.slug);
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.title} in Alibaug`,
    description: `${event.title} at Malhar Baug Resort, Alibaug — ${event.description} Garden lawns, catering and customised packages near Nagaon Beach.`,
    alternates: { canonical: `/events/${event.id}/` },
    openGraph: {
      title: `${event.title} | Malhar Baug Resort Alibaug`,
      description: event.description,
      images: [{ url: event.image, alt: `${event.title} at Malhar Baug Resort Alibaug` }],
    },
  };
}

export default function EventDetailPage({ params }: Props) {
  const event = eventCategories.find((e) => e.id === params.slug);
  if (!event) notFound();
  return <EventDetailView slug={params.slug} />;
}
