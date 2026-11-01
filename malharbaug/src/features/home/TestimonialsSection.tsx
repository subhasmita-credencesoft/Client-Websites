import Link from 'next/link';
import { testimonials } from '@/data/testimonials';

const GOOGLE_REVIEWS_URL = 'https://maps.google.com/?cid=18346168839375566095';

function GoogleIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StarIcon({ className = 'h-4 w-4 text-amber-400' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-earth-50/70 py-24 dark:bg-earth-900/60" id="reviews">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-subtitle">What Our Guests Say</p>
          <h2 className="section-title">Hear from Our Happy Guests</h2>
          <p className="mt-4 font-sans text-sm md:text-base leading-relaxed text-earth-600 dark:text-earth-300 md:whitespace-nowrap">
            Families from Mumbai, Pune and across Maharashtra rate their stay at Malhar Baug Resort{' '}
            <strong className="font-semibold text-earth-900 dark:text-white">4.2 out of 5</strong> on Google — read
            why below.
          </p>

          {/* Live Google Rating Summary Badge */}
          <div className="mt-8 inline-flex flex-nowrap items-center justify-center gap-2 sm:gap-3 rounded-full border border-earth-200 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm dark:border-earth-700 dark:bg-earth-800 whitespace-nowrap">
            <GoogleIcon className="h-5 w-5 shrink-0" />
            <div className="flex items-center gap-1 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-amber-400" />
              ))}
            </div>
            <span className="font-sans text-sm font-bold text-earth-900 dark:text-white">4.2 / 5</span>
            <span className="text-xs text-earth-400 dark:text-earth-500">•</span>
            <span className="font-sans text-xs font-medium text-earth-600 dark:text-earth-300">
              46+ Google Reviews
            </span>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
            >
              Verify on Google
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Reviews Grid - Guaranteed 100% visible, prerendered on server */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl border border-earth-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-earth-700/60 dark:bg-earth-800"
            >
              <div>
                {/* Rating & Google verification badge */}
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-amber-400" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-earth-100/70 px-2.5 py-1 text-[11px] font-medium text-earth-600 dark:bg-earth-700/60 dark:text-earth-300">
                    <GoogleIcon className="h-3.5 w-3.5" />
                    <span>Google Review</span>
                  </div>
                </div>

                {/* Review body */}
                <p className="font-sans text-sm leading-relaxed text-earth-700 dark:text-earth-200">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 flex items-center justify-between border-t border-earth-100 pt-4 dark:border-earth-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-serif text-sm font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-earth-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="font-sans text-xs text-earth-500 dark:text-earth-400">
                      {testimonial.location} {testimonial.stayType ? `• ${testimonial.stayType}` : ''}
                    </p>
                  </div>
                </div>
                {testimonial.date && (
                  <span className="font-sans text-[11px] text-earth-400 dark:text-earth-500">
                    {testimonial.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA & Live Google Link */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-earth-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-earth-800 shadow-sm transition hover:bg-earth-50 dark:border-earth-700 dark:bg-earth-800 dark:text-white dark:hover:bg-earth-700"
          >
            <GoogleIcon className="h-4 w-4" />
            Read All Reviews on Google Maps
          </a>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Book Your Stay With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
