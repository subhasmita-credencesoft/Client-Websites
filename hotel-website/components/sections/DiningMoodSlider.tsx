"use client";

import { useEffect, useMemo, useState } from "react";
import CurvedLoop from "../ui/CurvedLoop";

const SLIDES = [
  { src: "/images/restaurant3.jpg", label: "Tasty Meals" },
  { src: "/images/restaurant2.jpg", label: "Cozy Space" },
  { src: "/images/restaurant1.jpg", label: "Rich Menu" },
  { src: "/images/restaurant6.jpg", label: "Chef's Art" },
  { src: "/images/happy-co-workers.jpg", label: "Happy Dining" },
  { src: "/images/wedding1.jpg", label: "Wedding Dinner" },
];

const positionStyles = [
  "w-[220px] h-[200px] md:w-[320px] md:h-[260px] lg:w-[360px] lg:h-[300px] -translate-y-2",
  "w-[320px] h-[240px] md:w-[560px] md:h-[380px] lg:w-[640px] lg:h-[420px] translate-y-0 shadow-[0_26px_80px_rgba(0,0,0,0.22)]",
  "w-[220px] h-[200px] md:w-[320px] md:h-[260px] lg:w-[360px] lg:h-[300px] -translate-y-2",
];

export default function DiningMoodSlider() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStartIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const visibleSlides = useMemo(
    () => [
      SLIDES[startIndex % SLIDES.length],
      SLIDES[(startIndex + 1) % SLIDES.length],
      SLIDES[(startIndex + 2) % SLIDES.length],
    ],
    [startIndex],
  );

  return (
    <section className="relative bg-[#f6f3ed] py-20 text-white">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 px-6 md:flex-row md:gap-10 lg:gap-14">
        {visibleSlides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className={`relative overflow-hidden rounded-3xl bg-[#e7e0d4] transition-all duration-700 ${positionStyles[index]}`}
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-4">
        <CurvedLoop
          marqueeText={visibleSlides.map((slide) => slide.label).join("  •  ")}
          speed={36}
          className="font-serif text-3xl text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:text-5xl lg:text-6xl"
        />
      </div>
    </section>
  );
}
