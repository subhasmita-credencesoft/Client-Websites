"use client";

import { useMemo, useState } from "react";
import Container from "../ui/Container";

const slides = [
  {
    id: "refresh",
    label: "Refresh",
    headline: "Rebalance yourself in\na timeless space",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_img_effect1.jpg",
  },
  {
    id: "relax",
    label: "Relax",
    headline: "Relax in a sanctuary\nof quiet rituals",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_img_effect2.jpg",
  },
  {
    id: "renew",
    label: "Renew",
    headline: "Renew with mindful\nspa experiences",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_img_effect3.jpg",
  },
];

export default function WellnessHero() {
  const [activeId, setActiveId] = useState(slides[0].id);
  const active = useMemo(
    () => slides.find((slide) => slide.id === activeId) ?? slides[0],
    [activeId],
  );

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url(${active.image})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <Container className="relative flex min-h-screen flex-col justify-center pb-20 pt-44 md:pt-52">
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em] text-white/80">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-sm font-semibold">
            03
          </span>
          <span>Wellness & Spa</span>
        </div>
        <h2 className="mt-8 max-w-2xl whitespace-pre-line font-serif text-4xl leading-tight md:text-6xl">
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
                className={`group flex items-center gap-4 border-t border-white/30 pt-6 text-left transition ${
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
