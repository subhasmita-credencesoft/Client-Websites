'use client';

import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="section-subtitle">What Our Guests Say</p>
        <h2 className="section-title">Hear from Our Happy Guests</h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
          Families from Mumbai, Pune and across Maharashtra rate their stay at Malhar Baug Resort 4.1 out of 5 on Google — read why below.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="card-shadow rounded-2xl border border-brand-100 bg-white p-6 transition-shadow duration-200 hover:shadow-lg dark:border-brand-800/30 dark:bg-earth-800"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <iconify-icon
                  key={i}
                  icon="solar:star-bold"
                  width="18"
                  height="18"
                  className="text-yellow-400"
                ></iconify-icon>
              ))}
            </div>
            <p className="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className="mt-4 border-t border-brand-100 pt-4 dark:border-brand-800/30">
              <p className="font-sans text-sm font-semibold text-earth-900 dark:text-white">
                {testimonial.name}
              </p>
              <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
                {testimonial.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
