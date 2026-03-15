"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "../ui/Container";

const slides = [
  {
    id: "refresh",
    label: "Conference",
    headline: "Inspiring spaces for meetings & corporate events",
    image: "/images/7-9-25/Copy of IMG_2912.avif",
    href: "/weddings",
  },
  {
    id: "relax",
    label: "Picnic",
    headline: "Enjoy peaceful outdoor picnics in scenic surroundings",
    image: "/images/7-9-25/Copy of IMG_3980.avif",
    href: "/weddings",
  },
  {
    id: "renew",
    label: "Virtual Tour",
    headline: "Explore our resort from the comfort of your home",
    image: "/images/7-9-25/Copy of IMG_1441.avif",
    href: "/weddings",
  },
];

export default function WellnessHero() {
  const [activeId, setActiveId] = useState(slides[0].id);
  const router = useRouter();

  const active = useMemo(
    () => slides.find((slide) => slide.id === activeId) ?? slides[0],
    [activeId],
  );

  return (
    <section className="relative min-h-[80svh] overflow-hidden text-white sm:min-h-[90svh] lg:min-h-screen">
      <Image
        src={active.image}
        alt={active.headline}
        fill
        sizes="100vw"
        quality={75}
        loading="lazy"
        className="object-cover transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-black/50" />
      <Container className="relative flex min-h-[80svh] flex-col justify-center pb-12 pt-28 sm:min-h-[90svh] sm:pb-16 sm:pt-36 md:pt-44 lg:min-h-screen lg:pb-20 lg:pt-52">
        <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.2em] text-white/80 sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
          <span>Experiences That Elevate Your Getaway</span>
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
                onClick={() => {
                  setActiveId(slide.id);
                  if (slide.href) router.push(slide.href); // 👈 navigate if href exists
                }}
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
