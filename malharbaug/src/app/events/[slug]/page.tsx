import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { eventCategories } from '@/data/events';
import { bookingEngineUrl } from '@/data/booking';
import { breadcrumbSchema } from '@/lib/schema';
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

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Events', url: '/events' },
          { name: event.title, url: `/events/${event.id}` },
        ])}
      />
      <main>
        <section className="relative flex min-h-[500px] items-end overflow-hidden">
          <Image
            src={event.image}
            alt={`${event.title} at Malhar Baug Resort, Alibaug`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
              <iconify-icon icon={event.icon} width="24" height="24"></iconify-icon>
            </div>
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">{event.title}</h1>
            <p className="mt-4 max-w-2xl font-sans text-lg text-earth-100">{event.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-subtitle">Celebrate With Us</p>
            <h2 className="section-title">Your {event.title} at Malhar Baug</h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              {event.description} Our beautiful garden venue, dedicated events team, and customized
              packages make Malhar Baug Resort the perfect setting for your special occasion.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Book Now
              </a>
              <Link
                href="/contact"
                className="rounded-full border-2 border-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white dark:border-brand-400 dark:text-brand-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
