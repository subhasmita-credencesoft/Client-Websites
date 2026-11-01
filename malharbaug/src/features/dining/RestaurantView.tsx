import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { menuCategories, diningDescription, diningGalleryImages } from '@/data/dining';
import { getContact } from '@/lib/api';
import RestaurantMenu from './RestaurantMenu';

export default async function RestaurantView() {
  const contact = await getContact();

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[460px] items-center overflow-hidden">
          <Image
            src="/dininghero.jpeg"
            alt="Garden restaurant at Malhar Baug Resort Alibaug serving authentic Konkan and Maharashtrian cuisine"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-brand-600/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Malhar Baug Kitchen
            </span>
            <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl">
              Restaurant &amp; Dining
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              Savour authentic Maharashtrian coastal flavours, fresh seafood, and multi-cuisine delights in our peaceful garden setting.
            </p>
          </div>
        </section>

        {/* Culinary Story Section */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="section-subtitle">Culinary Journey</p>
              <h2 className="section-title">A Taste of the Konkan Coast</h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                {diningDescription}
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                Our kitchen prides itself on authentic Alibaug-style homestyle preparations — using coconut, locally pounded masalas, and daily fresh market ingredients. Whether you desire an elaborate seafood thali or comforting vegetarian specialties, every dish is prepared fresh to order.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-brand-500"></iconify-icon>
                  <span className="font-sans text-sm font-medium text-earth-800 dark:text-earth-200">Fresh Daily Catch</span>
                </div>
                <div className="flex items-center gap-2">
                  <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-brand-500"></iconify-icon>
                  <span className="font-sans text-sm font-medium text-earth-800 dark:text-earth-200">Authentic Konkan Masalas</span>
                </div>
                <div className="flex items-center gap-2">
                  <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-brand-500"></iconify-icon>
                  <span className="font-sans text-sm font-medium text-earth-800 dark:text-earth-200">Garden Seating</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/dining/WhatsApp Image 2026-10-29 at 10.07.16 AM.jpeg"
                alt="Traditional Malhar Baug special thali meal"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Real Food Gallery Showcase */}
        <section className="bg-earth-50 py-20 dark:bg-earth-900/40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle">Food &amp; Dining Gallery</p>
              <h2 className="section-title">Fresh from Our Kitchen</h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-earth-600 dark:text-earth-300">
                Explore real dishes served at Malhar Baug Resort — from coastal fish fry and traditional thalis to morning breakfast spreads.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {diningGalleryImages.map((dish) => (
                <div
                  key={dish.title}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-earth-800"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-earth-100 dark:bg-earth-900">
                    <Image
                      src={dish.src}
                      alt={dish.alt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-black/60 px-3 py-1 font-sans text-xs font-semibold text-white backdrop-blur-sm">
                        {dish.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base font-bold text-earth-900 dark:text-white">
                      {dish.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-earth-500 dark:text-earth-400">
                      {dish.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Menu Section */}
        <RestaurantMenu categories={menuCategories} />

        {/* Call to Reserve / Order Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl bg-brand-700 p-10 text-white shadow-xl dark:bg-brand-900">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Book a Table or Pre-Order Meals</h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-base text-brand-100">
              Planning a group lunch, family dinner, or celebration? Call us in advance to reserve your table or customize your food preferences with our kitchen team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                <iconify-icon icon="solar:phone-bold" width="18" height="18"></iconify-icon>
                Call {contact.phoneDisplay}
              </a>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hi Malhar Baug Resort, I would like to enquire about dining/book a table.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-700"
                >
                  <iconify-icon icon="logos:whatsapp-icon" width="18" height="18"></iconify-icon>
                  WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
