"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  WELLNESS_SPA_IMAGES,
  WELLNESS_TOUR_OPTIONS,
} from "@/data/sections/wellnessSpaIntro";
import useSafeInterval from "@/hooks/useSafeInterval";

const SwimmingPoolIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h20" />
    <path d="M2 17c2-2 4 0 6 0s4-2 6 0 4 0 6 0" />
    <circle cx="12" cy="7" r="2" />
    <path d="M12 9v3" />
    <path d="M9 12l3-3 3 3" />
  </svg>
);

const KidsAreaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" />
    <path d="M6 20l2-6 4 3 4-3 2 6" />
    <path d="M8 14l-2-4h12l-2 4" />
  </svg>
);

const EntryAreaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4h7v16h-7" />
    <path d="M9 8l-4 4 4 4" />
    <path d="M5 12h11" />
  </svg>
);

const tourIconMap = {
  pool: SwimmingPoolIcon,
  kids: KidsAreaIcon,
  entry: EntryAreaIcon,
} as const;

gsap.registerPlugin(ScrollTrigger);

export default function WellnessSpaIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const markImageLoaded = useCallback((src: string) => {
    setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);

  useSafeInterval(() => {
    setActiveIndex((prev) => (prev + 1) % WELLNESS_SPA_IMAGES.length);
  }, 4000, WELLNESS_SPA_IMAGES.length > 0);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTourOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    WELLNESS_SPA_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => markImageLoaded(src);
    });
  }, [markImageLoaded]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          ".wellness-spa-media",
          { x: -28, autoAlpha: 0, scale: 0.98 },
          { x: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" },
        )
          .fromTo(
            ".wellness-spa-kicker",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
            "<+0.05",
          )
          .fromTo(
            ".wellness-spa-title-line",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            {
              yPercent: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: 0.06,
              ease: "power4.out",
            },
            "<+0.06",
          )
          .fromTo(
            ".wellness-spa-copy",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out" },
            "<+0.08",
          )
          .fromTo(
            ".wellness-spa-cta",
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
            "<+0.05",
          );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "bottom top",
            scrub: 1,
          },
        }).to(".wellness-spa-image", { yPercent: 7, scale: 1.06, ease: "none" }, 0);
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const insetIndex = (activeIndex + 1) % WELLNESS_SPA_IMAGES.length;
  const mainSrc = WELLNESS_SPA_IMAGES[activeIndex];
  const insetSrc = WELLNESS_SPA_IMAGES[insetIndex];
  const isMainLoaded = !!loadedImages[mainSrc];
  const isInsetLoaded = !!loadedImages[insetSrc];

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative z-20 overflow-visible bg-[#f4f1ea] py-20 text-[#1f3c44]">
      <Container className="overflow-visible">
        <div className="grid gap-12 overflow-visible lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="wellness-spa-media relative mx-auto w-full max-w-[520px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] bg-[#d9d2c6]">
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-[#d9d2c6] transition-opacity duration-500 ${isMainLoaded ? "opacity-0" : "opacity-100"}`}
              />
              <Image
                src={mainSrc}
                alt="Resort facility"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                priority={activeIndex === 0}
                loading={activeIndex === 0 ? "eager" : "lazy"}
                onLoad={() => markImageLoaded(mainSrc)}
                className={`wellness-spa-image h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out ${
                  isMainLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm"
                }`}
              />
            </div>

            <div className="absolute right-[-4%] top-[22%] w-[52%]">
              <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#d9d2c6] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-[#d9d2c6] transition-opacity duration-500 ${isInsetLoaded ? "opacity-0" : "opacity-100"}`}
                />
                <Image
                  src={insetSrc}
                  alt="Resort facility detail"
                  fill
                  sizes="(max-width: 1024px) 52vw, 270px"
                  loading="lazy"
                  onLoad={() => markImageLoaded(insetSrc)}
                  className={`wellness-spa-image h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out ${
                    isInsetLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm"
                  }`}
                />
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-[#f4f1ea]" />

            <div className="absolute -bottom-14 left-0 flex items-center gap-2">
              {WELLNESS_SPA_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-[#1f3c44]" : "w-2 bg-[#1f3c44]/30"}`}
                />
              ))}
            </div>
          </div>

          <div className="max-w-xl">
            <span className="wellness-spa-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/60">Facilities</span>
            <div className="mt-6 overflow-hidden">
              <h2 className="wellness-spa-title-line font-serif text-3xl leading-tight md:text-4xl">Lush Green Hospitality,</h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="wellness-spa-title-line font-serif text-3xl leading-tight md:text-4xl">Reimagined in Khopoli</h2>
            </div>
            <p className="wellness-spa-copy mt-6 text-sm leading-7 text-[#1f3c44]/75">
              Nestled in the lush Sahyadri foothills, just 90 km from Mumbai via NH48, UK's Resort Khopoli is where the city unwraps itself into open skies, manicured gardens, and genuine calm. Spread across 85,000 sq. ft. of greenery, our resort brings together comfortable stay rooms, a thrilling Water Fun & Play, multi-cuisine dining, and space for corporate retreats and celebrations—all in one address.
            </p>

            <div className="wellness-spa-cta relative z-40 mt-10 inline-block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setTourOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-[#1f3c44]/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1f3c44] transition hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
              >
                Take a Virtual Tour
                <span aria-hidden="true" className={`inline-block transition-transform duration-200 ${tourOpen ? "rotate-180" : ""}`}>
                    <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${tourOpen ? "rotate-180" : ""}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
                </span>
              </button>

              {tourOpen && (
                <div className="absolute left-0 top-full z-[120] mt-2 w-56 overflow-hidden rounded-2xl border border-[#1f3c44]/10 bg-white shadow-[0_18px_48px_rgba(31,60,68,0.2)]">
                  {WELLNESS_TOUR_OPTIONS.map(({ label, url, icon }) => {
                    const Icon = tourIconMap[icon];
                    return (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setTourOpen(false)}
                      className="flex items-center gap-3 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f3c44] transition-colors hover:bg-[#f4f1ea]"
                    >
                      <span className="text-[#1f3c44]/70">
                        <Icon />
                      </span>
                      {label}
                    </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
