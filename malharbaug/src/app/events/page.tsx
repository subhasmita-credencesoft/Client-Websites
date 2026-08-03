import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { eventCategories } from '@/data/events';

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2068"
            alt="Events"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Events &amp; Celebrations</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Make every occasion special at Malhar Baug Resort.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-subtitle">Celebrate With Us</p>
            <h2 className="section-title">Your Dream Event Awaits</h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              From intimate gatherings to grand celebrations, our beautiful garden setting and dedicated team
              ensure every event is memorable. Choose from our range of event categories or let us customize
              a package for you.
            </p>
          </div>
        </section>

        <section className="bg-earth-100 pb-24 pt-12 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {eventCategories.map((event, index) => (
                <a
                  key={event.id}
                  href={`/events/${event.id}`}
                  className={`animate-on-scroll stagger-${(index % 2) + 1} group overflow-hidden rounded-2xl bg-white card-shadow transition-all duration-300 hover:-translate-y-1 dark:bg-earth-800/50`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                      <iconify-icon icon={event.icon} width="22" height="22"></iconify-icon>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-white">{event.title}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">{event.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand-600 dark:text-brand-400">
                      Learn More
                      <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">Plan Your Event</h2>
          <p className="mt-2 font-sans text-base text-earth-600 dark:text-earth-300">
            Get in touch with us to discuss your event requirements.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Contact Us
            </a>
            <a
              href="tel:+919876543210"
              className="rounded-full border-2 border-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white dark:border-brand-400 dark:text-brand-400"
            >
              Call Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
