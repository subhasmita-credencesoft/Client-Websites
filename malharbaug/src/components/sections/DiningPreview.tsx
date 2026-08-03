import Image from 'next/image';
import { diningDescription, menuCategories } from '@/data/dining';

export default function DiningPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
              alt="Restaurant at Malhar Baug Resort"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="section-subtitle">Dining</p>
          <h2 className="section-title">Authentic Flavors of the Konkan Coast</h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {diningDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {menuCategories.map((category) => (
              <span
                key={category.title}
                className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 font-sans text-sm font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-900/20 dark:text-brand-300"
              >
                {category.title}
              </span>
            ))}
          </div>

          <a
            href="/restaurant"
            className="btn-primary mt-8 inline-flex"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}
