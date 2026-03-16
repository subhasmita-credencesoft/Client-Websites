"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Container from "../ui/Container";

const HeroBookingBar = dynamic(() => import("../features/HeroBookingBar"), {
  ssr: false,
  loading: () => <div className="h-11 w-full rounded-full bg-white/15 sm:h-12" aria-hidden="true" />,
});

const SLIDES = [
  {
    src: "/images/7-9-25/Copy of IMG_2906.avif",
    alt: "Resort pool and gardens",
    tagline: "Relax under swaying palms and walk along the pristine white-sand beach.",
  },
  {
    src: "/images/2.avif",
    alt: "Luxury rooms with mountain view",
    tagline: "Wake up to elegant comfort and scenic views in every room.",
  },
  {
    src: "/images/7-9-25/Copy of Copy of IMG_3013.avif",
    alt: "Resort dining experience",
    tagline: "Savor curated dining experiences crafted with fresh local flavors.",
  },
  {
    src: "/images/4.avif",
    alt: "Wellness and spa",
    tagline: "Rejuvenate your body and mind with peaceful wellness rituals.",
  },
  {
    src: "/images/7-9-25/Copy of IMG_2911.avif",
    alt: "Resort event lawn",
    tagline: "Celebrate unforgettable moments on lush lawns and open spaces.",
  },
];

const INTERVAL_MS = 5000;
const FADE_MS = 1200;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setPrevious(current);
      setCurrent(index);
      setAnimKey((k) => k + 1);
    },
    [current],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        setPrevious(prev);
        return (prev + 1) % SLIDES.length;
      });
      setAnimKey((k) => k + 1);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white">
      <Image
        src={SLIDES[0].src}
        alt=""
        aria-hidden
        priority
        width={1}
        height={1}
        className="sr-only"
      />

      {SLIDES.map((slide, i) => {
        if (i !== current && i !== previous) return null;

        const isActive = i === current;
        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: isActive ? 2 : 1,
              opacity: isActive ? 1 : 0,
              transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              quality={75}
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/35 via-black/20 to-black/60" />

      <Container className="relative z-[10] flex min-h-[100svh] w-full flex-col items-center justify-center text-center">
        <div className="flex w-full max-w-[72rem] flex-col items-center px-4 pb-32 pt-32 sm:px-5 sm:pb-28 sm:pt-36 md:px-6 md:pt-40 lg:pb-24 lg:pt-44">
          <div className="mt-8 animate-fade-up sm:mt-10 md:mt-12" style={{ animationDelay: "0ms" }}>
            <p
              key={current}
              className="mx-auto text-[0.72rem] font-normal uppercase tracking-[0.38em] text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-[0.8rem] sm:tracking-[0.42em] md:text-[0.85rem]"
            >
              {SLIDES[current]?.tagline}
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <h1 className="mx-auto mt-4 max-w-[14ch] font-serif text-[3rem] font-normal leading-[0.9] tracking-[-0.015em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:mt-5 sm:text-[4rem] md:mt-6 md:max-w-none md:text-[5.2rem] lg:mt-6 lg:text-[6.2rem] xl:text-[7rem]">
              Welcome to <br /> UK&apos;s Resort
            </h1>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "220ms" }}>
            <div className="mt-14 w-full sm:mt-16 md:mt-18 lg:mt-20">
              <HeroBookingBar />
            </div>
          </div>
        </div>
      </Container>

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
              width: i === current ? "2rem" : "6px",
              height: "6px",
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

      <style>{`
        @keyframes dotFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
}
