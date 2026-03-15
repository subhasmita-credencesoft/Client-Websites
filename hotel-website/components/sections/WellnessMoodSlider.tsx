"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CurvedLoop from "../ui/CurvedLoop";

const SLIDES = [
  {
    image: "/images/7-9-25/Copy of IMG_1494.jpg",
  },
  {
    image: "/images/7-9-25/Copy of IMG_1525.jpg",
  },
  {
    image: "/images/7-9-25/Copy-of-IMG_2938_1_.avif",
  },
];
const WORDS = ["Swimming pool", "Kids Area", "Entry area", ];

export default function WellnessMoodSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    // Preload non-initial slides so transitions feel instant.
    SLIDES.slice(1).forEach((slide) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = slide.image;
    });
  }, []);

  return (
    <section className="relative h-screen min-h-[520px] w-full overflow-hidden bg-[#1c2427] text-white">
      <Image
        src={SLIDES[0].image}
        alt=""
        aria-hidden
        priority
        width={1}
        height={1}
        className="sr-only"
      />
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
            aria-hidden={index !== activeIndex}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full w-full items-center">
        <CurvedLoop
          speed={20}
          className="text-3xl font-serif text-white/75 md:text-6xl"
          marqueeText={
            <>
              {WORDS.map((word, index) => (
                <span key={`${word}-${index}`} className="flex items-center gap-8">
                  <span>{word}</span>
                  {index < WORDS.length - 1 && (
                    <span className="text-white/40" aria-hidden="true">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path d="M12 3.5c1.8 2.6 3 4.1 6 4.1-1.7 2.1-2.7 3.1-2.7 5.6S16.3 17 18 19c-3 0-4.2 1.5-6 4.1-1.8-2.6-3-4.1-6-4.1 1.7-2 2.7-3.1 2.7-5.6S6.7 9.6 6 7.6c3 0 4.2-1.5 6-4.1Z" />
                      </svg>
                    </span>
                  )}
                </span>
              ))}
            </>
          }
        />
      </div>
    </section>
  );
}
