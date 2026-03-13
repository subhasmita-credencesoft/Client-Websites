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
    <section className="relative min-h-[80svh] overflow-hidden text-white sm:min-h-[90svh] lg:min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url(${active.image})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
     <Container className="relative flex min-h-[80svh] flex-col justify-center pb-12 pt-28 sm:min-h-[90svh] sm:pb-16 sm:pt-36 md:pt-44 lg:min-h-screen lg:pb-20 lg:pt-52">
        <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.2em] text-white/80 sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
<span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-[0.8rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
            03
          </span>
          <span>Wellness & Spa</span>
        </div>
<h2 className="mt-6 max-w-xl whitespace-pre-line font-serif text-3xl leading-tight sm:mt-8 sm:max-w-2xl sm:text-4xl md:text-6xl">
          {active.headline}
        </h2>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {slides.map((slide, index) => {
            const isActive = slide.id === activeId;
            return (
             <button
             key={slide.id}
             type="button"
             onMouseEnter={() => setActiveId(slide.id)}
             onClick={() => setActiveId(slide.id)}
             className={`group flex items-center gap-3 border-t border-white/30 pt-4 text-left transition sm:gap-4 sm:pt-5 md:pt-6 ${
             isActive ? "text-white" : "text-white/50 hover:text-white"
            }`}
             >
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.3em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl sm:text-2xl">{slide.label}</span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
