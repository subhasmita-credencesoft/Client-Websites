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
    <section className="bg-[#f3efe8] py-20 text-[#1f3c44]">
      <Container>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em]">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/30 text-sm font-semibold">
            05
          </span>
          <span>Customers Reviews</span>
        </div>
        <h2 className="mt-8 max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
          Hear what our past
          <br />
          guests have to say
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.6fr_1.4fr]">
          <div className="rounded-3xl bg-white p-10 shadow-sm">
            <p className="font-serif text-6xl text-[#1f3c44]">
              {formattedRating}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[#d89550]">
              <span>*****</span>
              <span className="text-xs text-[#1f3c44]/70">
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
            <button className="mt-10 inline-flex h-10 items-center justify-center rounded-full border border-[#1f3c44]/25 px-6 text-xs font-semibold uppercase tracking-[0.2em]">
              View all reviews
            </button>
          </div>

          <div className="relative rounded-3xl border border-[#1f3c44]/10 bg-white/50 p-10">
            <div className="absolute -top-8 left-12 flex h-16 w-16 items-center justify-center rounded-full bg-[#e39b52] text-4xl text-white shadow">
              "
            </div>
            <p className="text-base leading-8 text-[#1f3c44]/80">
              "{current.quote}"
            </p>
            <div className="mt-10 flex items-center justify-between border-t border-[#1f3c44]/10 pt-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e2d6] text-sm font-semibold">
                  {current.name.slice(0, 1)}
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em]">
                    {current.name}
                  </p>
                  <p className="text-xs text-[#1f3c44]/60">
                    Review from TripAdvisor
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/20 text-xl"
                  aria-label="Previous testimonial"
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/20 text-xl"
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
