import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { menuCategories, diningDescription } from '@/data/dining';
import { getContact } from '@/lib/api';
import RestaurantMenu from './RestaurantMenu';

export default async function RestaurantView() {
  const contact = await getContact();

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="/dininghero.jpeg"
            alt="Garden restaurant at Malhar Baug Resort Alibaug serving Konkan cuisine"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">
              Restaurant &amp; Dining
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Savour authentic Maharashtrian flavours and more at our multi-cuisine restaurant.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-subtitle">Culinary Journey</p>
            <h2 className="section-title">A Taste of the Konkan Coast</h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              {diningDescription}
            </p>
          </div>
        </section>

        <RestaurantMenu categories={menuCategories} />

        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">Book a Table</h2>
          <p className="mt-2 font-sans text-base text-earth-600 dark:text-earth-300">
            Call us to reserve your dining experience.
          </p>
          <a
            href={`tel:${contact.phone}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Call to Reserve
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
