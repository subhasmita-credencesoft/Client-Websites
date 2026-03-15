"use client";

import { useEffect, useState } from "react";
import Container from "../ui/Container";
import testimonials from "../../data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index % total];

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
        {/* Section Label */}
        <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
          <span>Customers Reviews</span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 max-w-xl font-serif text-3xl leading-tight sm:mt-8 sm:max-w-2xl sm:text-4xl md:text-6xl">
          Hear what our past
          <br />
          guests have to say
        </h2>

        {/* 2-Column Grid — fixed height so video never resizes */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:mt-16 lg:grid-cols-[1.4fr_1.2fr] lg:gap-8">

          {/* LEFT — Testimonial Quote Card — fixed height */}
          <div className="relative flex h-[340px] flex-col rounded-3xl border border-[#1f3c44]/10 bg-white/50 p-6 sm:h-[360px] sm:p-8 lg:h-[380px] lg:p-10">
            <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#e39b52] text-3xl text-white shadow sm:-top-7 sm:left-8 sm:h-14 sm:w-14 sm:text-[2rem] lg:-top-8 lg:left-12 lg:h-16 lg:w-16 lg:text-4xl">
              &quot;
            </div>

            {/* Scrollable quote area so long text never pushes layout */}
            <div className="flex-1 overflow-hidden">
              <p className="line-clamp-6 text-[0.98rem] leading-7 text-[#1f3c44]/80 sm:text-base sm:leading-8">
                &quot;{current.quote}&quot;
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-[#1f3c44]/10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9e2d6] text-[0.82rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
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
              <div className="flex shrink-0 items-center gap-3">
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

          {/* RIGHT — YouTube Video Card — same fixed height */}
          <div className="relative h-[340px] overflow-hidden rounded-3xl shadow-sm sm:h-[360px] lg:h-[380px]">
            <iframe
              src="https://www.youtube.com/embed/u3hTCT2CIFw?rel=0&modestbranding=1"
              title="Resort Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

        </div>

        {/* Our Other Property */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
            <span>Our Other Property</span>
          </div>
          <h2 className="mt-6 font-serif text-3xl leading-tight sm:mt-8 sm:text-4xl md:text-5xl">
            Hotel Sai International
          </h2>
        </div>

      </Container>
    </section>
  );
}