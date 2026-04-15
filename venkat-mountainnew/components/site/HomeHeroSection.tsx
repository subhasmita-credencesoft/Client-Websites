"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";

type HomeHeroSectionProps = {
  slides: {
    image: string;
    alt: string;
  }[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

const AUTO_ROTATE_MS = 3000;
const FADE_DURATION_S = 1.4;

export function HomeHeroSection({
  slides,
  eyebrow,
  title,
  subtitle,
  cta,
  secondaryCta,
}: HomeHeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative min-h-[560px] overflow-hidden border-b border-white/10 md:min-h-[calc(100svh-120px)]">
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <motion.div
              key={slide.image}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.04 : 1,
              }}
              transition={{
                opacity: { duration: FADE_DURATION_S, ease: "easeInOut" },
                scale: { duration: AUTO_ROTATE_MS / 1000 + FADE_DURATION_S, ease: "linear" },
              }}
              aria-hidden={!isActive}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
                aria-label={slide.alt}
                role="img"
              />
              <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={false}
                animate={{
                  scale: isActive ? 1.08 : 1.03,
                  x: isActive ? 0 : 6,
                }}
                transition={{
                  duration: AUTO_ROTATE_MS / 1000 + 1.8,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          );
        })}

        <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(11,29,48,0.94)_0%,rgba(11,29,48,0.76)_44%,rgba(11,29,48,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,138,75,0.28),transparent_24%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[560px] w-full max-w-[1880px] items-center px-5 py-16 sm:px-6 md:min-h-[calc(100svh-120px)] md:py-20 lg:px-10 lg:py-24 xl:px-14">
        <div className="w-full max-w-[980px] text-white">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            {eyebrow ? (
              <p className="mb-4 text-[0.74rem] font-semibold uppercase tracking-[0.35em] text-[var(--accent-gold)] md:mb-5">
                {eyebrow}
              </p>
            ) : null}

            <h1 className="max-w-[980px] text-4xl font-bold leading-[1] sm:text-5xl md:text-[3.8rem] lg:text-[4.5rem]">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-5 max-w-[760px] text-base leading-8 text-white/82 md:mt-6 md:text-lg lg:text-[1.35rem]">
                {subtitle}
              </p>
            ) : null}
          </motion.div>

          {(cta || secondaryCta) ? (
            <motion.div
              className="mt-8 flex flex-wrap gap-4 md:mt-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
            >
              {cta ? <Button href={cta.href}>{cta.label}</Button> : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="light-outline">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </motion.div>
          ) : null}

          {slides.length > 1 ? (
            <div className="mt-10 flex items-center gap-3">
                {slides.map((slide, index) => (
                  <button
                    key={slide.image}
                    type="button"
                    aria-label={`Show hero slide ${index + 1}`}
                    aria-pressed={index === currentSlide}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-12 bg-white"
                        : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
