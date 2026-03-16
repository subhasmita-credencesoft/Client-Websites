"use client";

import { useMemo, useState } from "react";
import Container from "../ui/Container";

const slides = [
  {
    id: "family",
    label: "Family Experiences",
    headline: "Family\nExperiences",
    image: "/images/7-9-25/Copy of IMG_2912.avif",
  },
  {
    id: "culture",
    label: "Cultural Experiences",
    headline: "Cultural\nExperiences",
    image: "/images/7-9-25/Copy of IMG_3968.avif",
  },
  {
    id: "adventure",
    label: "Adventure Experiences",
    headline: "Adventure\nExperiences",
    image: "/images/7-9-25/Copy of IMG_1458.avif",
  },
];

export default function ExperiencesShowcase() {
  const [activeId, setActiveId] = useState(slides[0].id);
  const active = useMemo(
    () => slides.find((slide) => slide.id === activeId) ?? slides[0],
    [activeId],
  );

  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url("${encodeURI(active.image)}")`,
        }}
      />
      <div className="absolute inset-0 bg-black/35" />
      <Container className="relative flex min-h-[70vh] flex-col justify-end py-24 md:py-28">
        <div className="mb-10 flex items-center gap-6 text-xs uppercase tracking-[0.35em] text-white/80">
          <span>Experiences</span>
        </div>

        <h2 className="max-w-2xl whitespace-pre-line font-serif text-4xl leading-tight md:text-6xl">
          {active.headline}
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {slides.map((slide, index) => {
            const isActive = slide.id === activeId;
            return (
              <button
                key={slide.id}
                type="button"
                onMouseEnter={() => setActiveId(slide.id)}
                className={`group flex items-center gap-4 border-t border-white/40 pt-6 text-left transition ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl">{slide.label}</span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
