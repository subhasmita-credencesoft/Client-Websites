import Image from 'next/image';
import Link from 'next/link';
import { diningDescription, menuCategories, diningGalleryImages } from '@/data/dining';

export default function DiningPreview() {
  const featuredDishes = diningGalleryImages.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/dininghero.jpeg"
              alt="Authentic Konkan seafood and Maharashtrian thali at Malhar Baug Resort restaurant, Alibaug"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          {/* Real food badge thumbnail */}
          <div className="absolute -bottom-6 -right-4 hidden sm:flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-neutral-700 dark:bg-earth-900/95">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image
                src="/dining/WhatsApp Image 2026-10-29 at 10.07.16 AM.jpeg"
                alt="Fresh authentic Malhar Baug thali"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="pr-2">
              <p className="font-serif text-sm font-bold text-earth-900 dark:text-white">Fresh Konkan Thali</p>
              <p className="font-sans text-xs text-brand-600 dark:text-brand-400">Authentic Taste</p>
            </div>
          </div>
        </div>

        <div>
          <p className="section-subtitle">Dining</p>
          <h2 className="section-title">Authentic Flavors of the Konkan Coast</h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {diningDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {menuCategories.slice(0, 6).map((category) => (
              <span
                key={category.title}
                className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 font-sans text-sm font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-900/20 dark:text-brand-300"
              >
                {category.title}
              </span>
            ))}
          </div>

          {/* Quick dish preview strip */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {featuredDishes.map((dish) => (
              <div key={dish.title} className="group relative h-24 overflow-hidden rounded-xl border border-earth-200 dark:border-earth-700">
                <Image
                  src={dish.src}
                  alt={dish.alt}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <Link
            href="/restaurant"
            className="btn-primary mt-8 inline-flex"
          >
            Explore Restaurant &amp; Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
