"use client";

import { useState } from "react";
import Container from "../ui/Container";

const testimonials = [
  {
    id: "review-1",
    quote:
      "Thank you for a truly amazing stay! Your hospitality is quite outstanding. The sports centre is also very good with excellent quality tennis courts. Hope to be back soon.",
    name: "Annie Hebert",
    source: "Review from TripAdvisor",
    avatar: "/images/room_1.jpg",
  },
  {
    id: "review-2",
    quote:
      "We arrived early and we couldn't check but were exhausted. As soon as a room was cleaned and ready we were checked in at 10:30 not 3pm. This was extremely good.",
    name: "Conie Corleone",
    source: "Review from TripAdvisor",
    avatar: "/images/room_2.jpg",
  },
];

export default function ContactTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex items-center justify-center gap-3 text-[#1f3c44]/60">
            <span className="text-2xl font-semibold">Tripadvisor</span>
          </div>

          <p className="mt-10 font-serif text-3xl leading-snug md:text-4xl">
            “{active.quote}”
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 border-t border-[#1f3c44]/15 pt-6">
            <img
              src={active.avatar}
              alt={active.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-[#1f3c44]/60">
                {active.name}
              </p>
              <p className="text-xs text-[#1f3c44]/60">{active.source}</p>
            </div>
            <div className="ml-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/20 text-[#1f3c44]/70 transition hover:border-[#1f3c44]/40"
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/20 text-[#1f3c44]/70 transition hover:border-[#1f3c44]/40"
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
