"use client";

import { useEffect, useState, useCallback } from "react";
import Container from "../ui/Container";
import HeroBookingBar from "../features/HeroBookingBar";
import AnimatedContent from "./AnimatedContent";

/* ─── 5 background slides — change paths to your images ─── */
const SLIDES = [
  { src: "/images/1.avif", alt: "Resort pool and gardens" },
  { src: "/images/2.avif", alt: "Luxury rooms with mountain view" },
  { src: "/images/3.avif", alt: "Resort dining experience" },
  { src: "/images/4.avif", alt: "Wellness and spa" },
  { src: "/images/5.avif", alt: "Resort event lawn" },
];

const INTERVAL_MS = 5000;
const FADE_MS = 1200;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
      setAnimKey((k) => k + 1);
    },
    [current],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
      setAnimKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white">

      {/* ── Background image (slideshow replaces single static image) ── */}
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
              transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.src}')`,
                animation: isActive
                  ? `kenBurns${animKey % 2} ${INTERVAL_MS + FADE_MS}ms ease-out forwards`
                  : undefined,
                willChange: "transform",
              }}
            />
          </div>
        );
      })}

      {/* Gradient overlay — lighter in middle so text reads clearly */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/35 via-black/20 to-black/60" />

      {/* ── All original content — untouched ── */}
      <Container className="relative z-[10] flex min-h-[100svh] w-full flex-col items-center justify-center text-center">
        <div className="flex w-full max-w-[72rem] flex-col items-center px-4 pb-32 pt-32 sm:px-5 sm:pb-28 sm:pt-36 md:px-6 md:pt-40 lg:pb-24 lg:pt-44">

          {/* Subtitle line — appears ABOVE the main heading like Amoja */}
          <AnimatedContent
            distance={40}
            direction="vertical"
            reverse={false}
            duration={0.7}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <p className="mx-auto text-[0.72rem] font-normal uppercase tracking-[0.38em] text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-[0.8rem] sm:tracking-[0.42em] md:text-[0.85rem]">
              Relax under swaying palms and walk along the pristine white-sand beach.
            </p>
          </AnimatedContent>

          {/* Main heading — large serif, centered, Amoja style */}
          <AnimatedContent
            distance={60}
            direction="vertical"
            reverse={false}
            duration={0.85}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0.12}
          >
            <h1 className="mx-auto mt-4 max-w-[14ch] font-serif text-[3rem] leading-[0.92] tracking-[-0.02em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:mt-5 sm:text-[4rem] md:mt-6 md:max-w-none md:text-[5.2rem] lg:mt-6 lg:text-[6.2rem] xl:text-[7rem]">
              Welcome to <br /> UK&apos;s Resort
            </h1>
          </AnimatedContent>

          {/* Booking bar — pinned toward the bottom like Amoja */}
          <AnimatedContent
            distance={40}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0.22}
          >
            <div className="mt-14 w-full sm:mt-16 md:mt-18 lg:mt-20">
              <HeroBookingBar />
            </div>
          </AnimatedContent>

        </div>
      </Container>

      {/* ── Slide dot indicators ── */}
      <div
        className="absolute bottom-7 left-1/2 z-[20] flex -translate-x-1/2 items-center gap-[7px] sm:bottom-10"
        role="tablist"
        aria-label="Slide navigation"
      >
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${slide.alt}`}
            onClick={() => goTo(i)}
            className="relative overflow-hidden rounded-full transition-all duration-500"
            style={{
              width:           i === current ? "2rem" : "6px",
              height:          "6px",
              backgroundColor: "rgba(255,255,255,0.35)",
            }}
          >
            {i === current && (
              <span
                key={animKey}
                className="absolute inset-0 rounded-full bg-white"
                style={{
                  transformOrigin: "left center",
                  animation: `dotFill ${INTERVAL_MS}ms linear forwards`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes kenBurns0 {
          from { transform: scale(1)    translate3d(0%,     0%, 0); }
          to   { transform: scale(1.08) translate3d(0.8%,  -0.4%, 0); }
        }
        @keyframes kenBurns1 {
          from { transform: scale(1)    translate3d(0%,     0%, 0); }
          to   { transform: scale(1.08) translate3d(-0.8%, -0.4%, 0); }
        }
        @keyframes dotFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

    </section>
  );
}
