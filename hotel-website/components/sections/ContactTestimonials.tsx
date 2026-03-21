"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../ui/Container";
import { CONTACT_TESTIMONIALS } from "../../data/sections/contactTestimonials";

export default function ContactTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CONTACT_TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CONTACT_TESTIMONIALS.length) % CONTACT_TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CONTACT_TESTIMONIALS.length);
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
            <Image
              src={active.avatar}
              alt={active.name}
              width={48}
              height={48}
              unoptimized
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
