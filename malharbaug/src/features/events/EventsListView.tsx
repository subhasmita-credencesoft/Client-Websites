import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { eventCategories } from '@/data/events';
import { getContact } from '@/lib/api';
import { breadcrumbSchema } from '@/lib/schema';

export default async function EventsListView() {
  const contact = await getContact();

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Events & Celebrations', url: '/events' },
        ])}
      />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[460px] items-center overflow-hidden pt-28 pb-16">
          <Image
            src="/heroimg2.jpeg"
            alt="Weddings, birthdays and corporate events at Malhar Baug Resort Alibaug – event lawns, outdoor venue near Nagaon Beach"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-brand-600/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Event Venue Alibaug
            </span>
            <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl">
              Events &amp; Celebrations
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Make every occasion special at Malhar Baug Resort — the premier event venue near Nagaon Beach, Alibaug.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact/"
                className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Enquire for Events
              </Link>
              <a
                href={`tel:${contact.phone || '+919320062613'}`}
                className="rounded-full border-2 border-white px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </section>

        {/* SEO Intro */}
        <section className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="section-subtitle">Celebrate With Us</p>
          <h2 className="section-title">Your Dream Event Awaits</h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
            Malhar Baug Resort is one of the most sought-after event venues near Alibaug, offering sprawling open lawns, lush garden settings and dedicated event support. Whether you are planning a destination wedding, a milestone birthday, a corporate offsite or a family reunion, our team handles every detail — from décor and catering to customised packages and accommodation for your guests.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
            With capacity for up to 300 guests, on-site accommodation in 18 rooms and villas, and a fully equipped kitchen serving authentic Konkan and multi-cuisine meals, Malhar Baug is the complete event destination just 28 km from Mandwa Jetty. Explore our{' '}
            <Link href="/packages/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              event packages
            </Link>{' '}
            or{' '}
            <Link href="/contact/" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              get in touch
            </Link>{' '}
            for a customised quote.
          </p>
        </section>

        {/* Event Categories Grid */}
        <section className="bg-earth-100 pb-24 pt-12 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {eventCategories.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group block overflow-hidden rounded-2xl bg-white card-shadow transition-all duration-300 hover:-translate-y-1 dark:bg-earth-800/50"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-earth-200 dark:bg-earth-700">
                    <Image
                      src={event.image || '/heroimg1.jpeg'}
                      alt={`${event.title} at Malhar Baug Resort Alibaug – event venue and lawn near Nagaon Beach`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                      <iconify-icon icon={event.icon} width="22" height="22"></iconify-icon>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                      {event.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand-600 dark:text-brand-400">
                      Learn More
                      <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us for Events */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">
              Why Host Your Event at Malhar Baug?
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: 'solar:users-group-two-rounded-bold', title: 'Capacity for 300+', desc: 'Spacious open lawns and indoor halls for large gatherings and celebrations.' },
              { icon: 'solar:home-2-bold', title: '18 Rooms On-site', desc: 'Guests can stay on-site — no need to arrange separate accommodation.' },
              { icon: 'solar:chef-hat-bold', title: 'In-house Catering', desc: 'Multi-cuisine menus including traditional Konkan fish thali and North Indian.' },
              { icon: 'solar:map-point-wave-bold', title: 'Easy Access', desc: '28 km from Mandwa Jetty, 2 hrs from Mumbai by road, 3 hrs from Pune.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 card-shadow text-center dark:bg-earth-800/50">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                  <iconify-icon icon={item.icon} width="24" height="24"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plan Your Event CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-24 text-center">
          <div className="rounded-2xl bg-brand-700 p-12 dark:bg-brand-900">
            <h2 className="font-serif text-3xl font-bold text-white">Plan Your Event Today</h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-base text-brand-100">
              Get in touch with our events team to discuss your requirements, view venue photos and receive a customised quote.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact/"
                className="rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                Contact Our Events Team
              </Link>
              <a
                href={`tel:${contact.phone || '+919320062613'}`}
                className="rounded-full border-2 border-white px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
