"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Container from "../ui/Container";
import testimonials from "../../data/testimonials";

const reviews = {
  rating: 4.9,
  count: 1859,
};

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index % total];

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const formattedRating = useMemo(() => rating.toFixed(1), [rating]);
  const formattedReviews = useMemo(
    () => `${reviewCount.toLocaleString()} reviews`,
    [reviewCount]
  );

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setRating(reviews.rating * progress);
      setReviewCount(Math.round(reviews.count * progress));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
       <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
         <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/30 text-[0.8rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
            05
          </span>
          <span>Customers Reviews</span>
        </div>
       <h2 className="mt-6 max-w-xl font-serif text-3xl leading-tight sm:mt-8 sm:max-w-2xl sm:text-4xl md:text-6xl">
          Hear what our past
          <br />
          guests have to say
        </h2>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:mt-16 lg:grid-cols-[0.6fr_1.4fr] lg:gap-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:p-10">
           <p className="font-serif text-4xl text-[#1f3c44] sm:text-5xl lg:text-6xl">
              {formattedRating}
            </p>
           <div className="mt-3 flex flex-wrap items-center gap-2 text-[#d89550]">
              <span>*****</span>
             <span className="text-[0.72rem] text-[#1f3c44]/70 sm:text-xs">
                {formattedReviews}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-[#1f3c44]/50">
              <Image
                src="https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/tripadvisor-logo.svg"
                alt="Tripadvisor"
                width={110}
                height={30}
              />
            </div>
           <button className="mt-7 inline-flex h-10 items-center justify-center rounded-full border border-[#1f3c44]/25 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:mt-8 sm:px-6 sm:text-xs sm:tracking-[0.2em] lg:mt-10">
              View all reviews
            </button>
          </div>

         <div className="relative rounded-3xl border border-[#1f3c44]/10 bg-white/50 p-6 sm:p-8 lg:p-10">
           <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#e39b52] text-3xl text-white shadow sm:-top-7 sm:left-8 sm:h-14 sm:w-14 sm:text-[2rem] lg:-top-8 lg:left-12 lg:h-16 lg:w-16 lg:text-4xl">
              "
            </div>
           <p className="text-[0.98rem] leading-7 text-[#1f3c44]/80 sm:text-base sm:leading-8">
              "{current.quote}"
            </p>
            <div className="mt-8 flex flex-col gap-4 border-t border-[#1f3c44]/10 pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
              <div className="flex items-center gap-3 sm:gap-4">
             <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e2d6] text-[0.82rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
                  {current.name.slice(0, 1)}
                </span>
                <div>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] sm:text-sm sm:tracking-[0.1em]">
                    {current.name}
                  </p>
                  <p className="text-[0.72rem] text-[#1f3c44]/60 sm:text-xs">
                    Review from TripAdvisor
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3c44]/20 text-base sm:h-10 sm:w-10 sm:text-xl"
                  aria-label="Previous testimonial"
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  onClick={next}
                 className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3c44]/20 text-base sm:h-10 sm:w-10 sm:text-xl"
                  aria-label="Next testimonial"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
