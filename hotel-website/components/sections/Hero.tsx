"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const HeroBookingBar = dynamic(() => import("../features/HeroBookingBar"), {
  ssr: false,
  loading: () => <div className="h-11 w-full rounded-full bg-white/15 sm:h-12" aria-hidden="true" />,
});

const SLIDES = [
  {
    src: "https://bookonelocal.in/cdn/2.avif",
    alt: "UK Resort luxury guest room",
    tagline: "Experience elegant and comfortable rooms designed for a relaxing stay at UK Resort.",
  },
  {
    src: "https://bookonelocal.in/cdn/Copy of Copy of IMG_3013.avif",
    alt: "UK Resort swimming pool and garden area",
    tagline: "Unwind by the refreshing pool surrounded by lush greenery and peaceful resort views.",
  },
  {
    src: "https://bookonelocal.in/cdn/Copy of IMG_2906.avif",
    alt: "Dining experience at UK Resort restaurant",
    tagline: "Enjoy delicious meals and a delightful dining experience at the resort restaurant.",
  },
  {
    src: "https://bookonelocal.in/cdn/4.avif",
    alt: "Wedding and event venue at UK Resort",
    tagline: "Celebrate weddings, receptions, and special events in our spacious and elegant venue.",
  },
  {
    src: "https://bookonelocal.in/cdn/Copy of IMG_2911.avif",
    alt: "Corporate picnic and outdoor gathering at UK Resort",
    tagline: "Perfect outdoor spaces for corporate picnics, team outings, and group celebrations.",
  },
];

const INTERVAL_MS = 5000;
const FADE_MS = 1200;
const HERO_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMGYxMjE2Ii8+PC9zdmc+";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<boolean[]>(() => SLIDES.map(() => false));

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const didInitSlideAnim = useRef(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      setCurrent((prev) => {
        return (prev + 1) % SLIDES.length;
      });
      setAnimKey((k) => k + 1);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
      if (typeof img.decode === "function") {
        img.decode().catch(() => undefined);
      }
    });
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-intro-tag",
          { y: 24, autoAlpha: 0, filter: "blur(6px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out", delay: 0.18 },
        );

        gsap.fromTo(
          ".hero-title-reveal",
          { yPercent: 120, autoAlpha: 0, filter: "blur(12px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.08,
            ease: "power4.out",
            delay: 0.24,
          },
        );

        gsap.fromTo(
          ".hero-booking-wrap",
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.95, ease: "power3.out", delay: 0.42 },
        );

        gsap.fromTo(
          ".hero-media",
          { scale: 1.12, yPercent: 0 },
          { scale: 1.04, yPercent: 0, duration: 1.6, ease: "power2.out" },
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(".hero-media", { yPercent: 10, scale: 1.12, ease: "none" }, 0)
          .to(contentRef.current, { y: -84, autoAlpha: 0.58, ease: "none" }, 0)
          .to(overlayRef.current, { opacity: 0.8, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!didInitSlideAnim.current) {
      didInitSlideAnim.current = true;
      return;
    }

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const activeSlide = slideRefs.current[current];
      if (!activeSlide) return;

      gsap.fromTo(
        activeSlide,
        { scale: 1.14, filter: "brightness(0.82)" },
        {
          scale: 1.06,
          filter: "brightness(1)",
          duration: (INTERVAL_MS + 1000) / 1000,
          ease: "power2.out",
          overwrite: "auto",
        },
      );

      gsap.fromTo(
        ".hero-intro-tag",
        { y: 22, autoAlpha: 0, filter: "blur(5px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          overwrite: "auto",
        },
      );

      gsap.fromTo(
        ".hero-title-reveal",
        { yPercent: 110, autoAlpha: 0, filter: "blur(10px)" },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.08,
          ease: "power4.out",
          overwrite: "auto",
        },
      );

      gsap.fromTo(
        ".hero-booking-wrap",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.out",
          overwrite: "auto",
          delay: 0.08,
        },
      );
    });

    return () => mm.revert();
  }, [current]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden bg-[#0f1216] text-white">
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={slide.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            aria-hidden={!isActive}
            className="hero-media absolute inset-0 overflow-hidden will-change-transform"
            style={{
              zIndex: isActive ? 3 : 1,
              opacity: isActive ? 1 : 0,
              transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1), filter 420ms ease`,
              filter: loadedSlides[i] ? "none" : "blur(2px)",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              quality={72}
              priority={i < 2}
              fetchPriority={i === 0 ? "high" : "auto"}
              loading="eager"
              placeholder="blur"
              blurDataURL={HERO_BLUR}
              className={`object-cover transition-[transform,opacity,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                loadedSlides[i] ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[2px]"
              }`}
              unoptimized={slide.src.startsWith("http")}
              onLoad={() => {
                setLoadedSlides((prev) => {
                  if (prev[i]) return prev;
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }}
            />
          </div>
        );
      })}

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/45 via-black/20 to-black/70"
      />

      <Container className="relative z-[10] flex min-h-[100svh] w-full flex-col items-center justify-center text-center">
        <div
          ref={contentRef}
          className="flex w-full max-w-[72rem] flex-col items-center px-4 pb-32 pt-36 sm:px-5 sm:pb-28 sm:pt-40 md:px-6 md:pt-44 lg:pb-24 lg:pt-48"
        >
          <div className="mt-8 sm:mt-10 md:mt-12">
            <p className="hero-intro-tag mx-auto text-[0.72rem] font-bold uppercase tracking-[0.38em] text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-[0.8rem] sm:tracking-[0.42em] md:text-[0.85rem]">
              {SLIDES[current]?.tagline}
            </p>
          </div>

          <div className="mt-4 sm:mt-5 md:mt-6">
            <div className="overflow-hidden">
              <h1 className="hero-title-reveal mx-auto max-w-[14ch] font-serif text-[2.6rem] font-normal leading-[0.9] tracking-[-0.015em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:text-[3.5rem] md:max-w-none md:text-[4.6rem] lg:text-[5.4rem] xl:text-[6rem]">
                Welcome to
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-title-reveal mx-auto max-w-[14ch] font-serif text-[2.6rem] font-normal leading-[0.9] tracking-[-0.015em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:text-[3.5rem] md:max-w-none md:text-[4.6rem] lg:text-[5.4rem] xl:text-[6rem]">
                UK&apos;s Resort
              </h1>
            </div>
          </div>

          <div className="hero-booking-wrap mt-14 w-full sm:mt-16 md:mt-18 lg:mt-20">
            <HeroBookingBar />
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
        .hero-media {
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}
