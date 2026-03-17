"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: "001",
    title: "Seasonal Experiences",
    image: "https://bookonelocal.in/cdn/Copy of IMG_1478.jpg",
  },
  {
    id: "002",
    title: "Signature Experiences",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3968.avif",
  },
  {
    id: "003",
    title: "Good Life Experiences",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
  },
];

export default function ExperiencesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#f3f2ee] px-3 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-[1900px]">
        <div className="relative h-[27rem] overflow-hidden rounded-[18px] bg-black sm:h-[36rem] lg:h-[49rem]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                priority={index === activeIndex}
                className={`object-cover transition-transform duration-[1300ms] ease-out ${
                  index === activeIndex ? "scale-100" : "scale-110"
                }`}
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />

          <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6 lg:p-10">
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-6">
              {slides.map((slide, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    type="button"
                    key={slide.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className="group text-left"
                    aria-label={`Show ${slide.title}`}
                  >
                    <div
                      className={`mb-3 h-px transition-colors duration-300 ${
                        active ? "bg-white/85" : "bg-white/35 group-hover:bg-white/70"
                      }`}
                    />
                    <div className="flex items-start gap-3">
                      <span className={`text-[0.8rem] font-medium ${active ? "text-white/85" : "text-white/55"}`}>
                        {slide.id}
                      </span>
                      <span
                        className={`font-serif text-[1.85rem] leading-[0.95] transition-colors duration-300 sm:text-[2.35rem] lg:text-[3.05rem] ${
                          active ? "text-white" : "text-white/60 group-hover:text-white/82"
                        }`}
                      >
                        {slide.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
