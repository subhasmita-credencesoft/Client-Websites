"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CurvedLoop from "../ui/CurvedLoop";

const SLIDES = [
  { src: "https://bookonelocal.in/cdn/Copy-of-IMG_2914_1_.avif", label: "Delicious Meals" },
  { src: "https://bookonelocal.in/cdn/Copy-of-IMG_2913_1_.avif", label: "Beautiful Spaces" },
  { src: "https://bookonelocal.in/cdn/Copy-of-IMG_2915.avif", label: "Varied Menu" },
  { src: "https://bookonelocal.in/cdn/Copy-of-IMG_2927.avif", label: "Chef's Art" },
  { src: "https://bookonelocal.in/cdn/Copy-of-IMG_2938_1_.avif", label: "Happy Dining" },
  { src: "https://bookonelocal.in/cdn/Copy-of-IMG_2939_1_.avif ", label: "Wedding Dinner" },
];

function getRelativeOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function DiningMoodSlider() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  const marqueeText = useMemo(() => {
    const prev = SLIDES[(activeIndex - 1 + SLIDES.length) % SLIDES.length].label;
    const current = SLIDES[activeIndex].label;
    const next = SLIDES[(activeIndex + 1) % SLIDES.length].label;
    return `${prev} * ${current} * ${next} * `;
  }, [activeIndex]);

  return (
    <section className="relative overflow-hidden bg-[#f6f3ed] py-16 text-white md:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-3 sm:px-6 lg:px-8">
        <div className="relative h-[320px] md:hidden">
          <article className="absolute inset-0 overflow-hidden rounded-[18px] bg-[#b4aea5]">
            <Image
              src={SLIDES[activeIndex].src}
              alt={SLIDES[activeIndex].label}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/25" />
          </article>
        </div>

        <div className="relative hidden h-[540px] md:block lg:h-[620px]">
          {SLIDES.map((slide, index) => {
            const offset = getRelativeOffset(index, activeIndex, SLIDES.length);
            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 1;

            const x = offset === 0 ? 0 : offset < 0 ? -820 : 820;
            const width = offset === 0 ? 980 : 520;
            const height = offset === 0 ? 560 : 390;
            const scale = offset === 0 ? 1 : 0.96;

            return (
              <motion.article
                key={slide.src}
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity: isVisible ? 1 : 0,
                  width,
                  height,
                }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] bg-[#b4aea5]"
                style={{
                  zIndex: offset === 0 ? 30 : 20 - absOffset,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 520px, 980px"
                  className="object-cover"
                  priority={index === activeIndex}
                />
                <div className="absolute inset-0 bg-black/25" />
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-40 -translate-y-1/2">
        <CurvedLoop
          marqueeText={marqueeText}
          speed={30}
          className="font-serif text-[2.4rem] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] md:text-[4.3rem] lg:text-[5.6rem]"
        />
      </div>
    </section>
  );
}
