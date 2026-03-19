"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import testimonials from "../../data/testimonials";

const REVIEW_SCORE = 4.9;
const REVIEW_COUNT = 1859;

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index % total];
  const sectionRef = useRef<HTMLElement | null>(null);

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          ".testimonials-kicker",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
        )
          .fromTo(
            ".testimonials-title-line",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.95, stagger: 0.08, ease: "power4.out" },
            "<+0.06",
          )
          .fromTo(
            ".testimonials-card",
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
            "<+0.08",
          )
          .fromTo(
            ".testimonials-video",
            { y: 24, autoAlpha: 0, scale: 0.99 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" },
            "<-0.5",
          )
          .fromTo(
            ".testimonials-other",
            { y: 14, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
            "<+0.06",
          );
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".testimonials-quote",
        { y: 14, autoAlpha: 0, filter: "blur(4px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out", overwrite: "auto" },
      );
      gsap.fromTo(
        ".testimonials-author",
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out", overwrite: "auto", delay: 0.05 },
      );
    });
    return () => mm.revert();
  }, [index]);

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
        {/* Section Label */}
        <div className="testimonials-kicker flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
          <span>Customers Reviews</span>
        </div>

        {/* Heading */}
        <div className="mt-6 sm:mt-8">
          <div className="overflow-hidden">
            <h2 className="testimonials-title-line max-w-xl font-serif text-3xl leading-tight sm:max-w-2xl sm:text-4xl md:text-6xl">
              Hear what our past
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="testimonials-title-line max-w-xl font-serif text-3xl leading-tight sm:max-w-2xl sm:text-4xl md:text-6xl">
              guests have to say
            </h2>
          </div>
        </div>

        {/* 2-Column Grid — FIXED HEIGHT row so neither column ever resizes */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:mt-16 lg:grid-cols-[1.4fr_1.2fr] lg:gap-8
                        [&>*]:h-[420px] sm:[&>*]:h-[460px] lg:[&>*]:h-[500px]">

          {/* LEFT — Testimonial Quote Card */}
          {/* 
            KEY FIX:
            • The column item now has a FIXED height via the grid rule above ([&>*]:h-*).
            • The card itself is h-full so it fills that fixed slot exactly.
            • flex-col + overflow-hidden on the card prevent any bleed-out.
            • The quote <div> is flex-1 + overflow-y-auto, so long text scrolls
              internally instead of pushing the card (and the section) taller.
            • The author bar is shrink-0 so it always stays pinned at the bottom.
          */}
          <div className="testimonials-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#1f3c44]/10 bg-white/50 p-6 sm:p-8 lg:p-10">
            {/* Quote bubble icon */}
            <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#e39b52] text-3xl text-white shadow sm:-top-7 sm:left-8 sm:h-14 sm:w-14 sm:text-[2rem] lg:-top-8 lg:left-12 lg:h-16 lg:w-16 lg:text-4xl">
              &quot;
            </div>

            {/* Score block — shrink-0 so it never collapses */}
            <div className="mb-5 shrink-0 border-b border-[#1f3c44]/10 pb-5 sm:mb-6 sm:pb-6">
              <p className="font-serif text-[3.5rem] leading-none text-[#102f4d] sm:text-[4.3rem]">
                {REVIEW_SCORE.toFixed(1)}
              </p>
              <div className="mt-2 flex items-center gap-2.5">
                <div className="flex items-center gap-1 text-[#e39b52]">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <span key={star} className="text-xl leading-none">★</span>
                  ))}
                </div>
                <p className="text-[1rem] text-[#102f4d]/80">{REVIEW_COUNT.toLocaleString("en-IN")} reviews</p>
              </div>
              <p className="mt-2 text-[1.05rem] font-semibold text-[#102f4d]/28">Tripadvisor</p>
            </div>

            {/* Scrollable quote area — flex-1 + overflow-y-auto is the core fix */}
            <div className="flex-1 overflow-y-auto pr-2
                            [scrollbar-width:thin] [scrollbar-color:#1f3c4420_transparent]
                            [&::-webkit-scrollbar]:w-1
                            [&::-webkit-scrollbar-track]:bg-transparent
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-[#1f3c44]/20">
              <p className="testimonials-quote text-[0.98rem] leading-7 text-[#1f3c44]/80 sm:text-base sm:leading-8">
                &quot;{current.quote}&quot;
              </p>
            </div>

            {/* Author bar — shrink-0 keeps it pinned at the bottom always */}
            <div className="testimonials-author mt-4 shrink-0 flex flex-col gap-4 border-t border-[#1f3c44]/10 pt-4 sm:flex-row sm:items-center sm:justify-between sm:mt-5 sm:pt-5">
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

          {/* RIGHT — YouTube Video Card */}
          <div className="testimonials-video relative h-full overflow-hidden rounded-3xl shadow-sm">
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
        <div className="testimonials-other mt-16 sm:mt-20 lg:mt-24">
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