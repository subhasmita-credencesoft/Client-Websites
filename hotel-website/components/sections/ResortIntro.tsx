"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Waves, Tent, Dumbbell, Gamepad2, UtensilsCrossed, TreePine } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import useSafeInterval from "@/hooks/useSafeInterval";
import {
  RESORT_INTRO_AUTO_SLIDE_MS,
  RESORT_INTRO_HIGHLIGHTS,
  RESORT_INTRO_SLIDES,
  RESORT_INTRO_TITLE,
  RESORT_INTRO_VALUES,
} from "@/data/sections/resortIntro";

const highlightIconMap = {
  waves: Waves,
  tent: Tent,
  dumbbell: Dumbbell,
  gamepad: Gamepad2,
  utensils: UtensilsCrossed,
  tree: TreePine,
} as const;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ResortIntro() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useSafeInterval(
    () => setActiveSlide((p) => (p + 1) % RESORT_INTRO_SLIDES.length),
    RESORT_INTRO_AUTO_SLIDE_MS,
    true,
  );

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;
    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          const revealTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          revealTl
            .fromTo(
              ".resort-intro-kicker",
              { y: 10, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
            )
            .fromTo(
              ".resort-intro-title-word",
              { yPercent: 108, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.72, stagger: 0.016, ease: "power4.out" },
              "<+0.06",
            )
            .fromTo(
              ".resort-intro-copy",
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out", stagger: 0.06 },
              "<+0.08",
            )
            .fromTo(
              ".resort-intro-value",
              { y: 12, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.08 },
              "<+0.05",
            )
            .fromTo(
              ".resort-intro-cta",
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
              "<+0.04",
            )
            .fromTo(
              ".resort-intro-media",
              { y: 22, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.82, ease: "power3.out" },
              "<-0.45",
            )
            .fromTo(
              ".resort-intro-highlight",
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.05 },
              "<+0.08",
            )
            .call(() => ScrollTrigger.refresh());

          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              end: "bottom top",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          })
            .to(contentRef.current, { y: -18, autoAlpha: 0.96, ease: "none" }, 0)
            .to(mediaCardRef.current, { y: -22, ease: "none" }, 0)
            .to(".resort-intro-media-image", { yPercent: -5, ease: "none" }, 0)
            .to(".resort-intro-media-shine", { xPercent: 16, opacity: 0.3, ease: "none" }, 0);
        }, sectionRef);

        return () => ctx.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".resort-intro-kicker",
            ".resort-intro-title-word",
            ".resort-intro-copy",
            ".resort-intro-value",
            ".resort-intro-cta",
            ".resort-intro-media",
            ".resort-intro-highlight",
          ],
          { clearProps: "all" },
        );
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      mm?.revert();
    };
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const active = slideRefs.current[activeSlide];
      if (!active) return;
      gsap.fromTo(
        active,
        { autoAlpha: 0.88, scale: 1.02 },
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out", overwrite: "auto" },
      );
    });
    return () => mm.revert();
  }, [activeSlide]);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="bg-[#f3efe8] py-14 text-[#1f3c44] sm:py-20 lg:py-24"
    >
      <Container>
        <div className="resort-intro-kicker flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.28em] text-[#55676f] sm:gap-6 sm:text-xs sm:tracking-[0.38em]">
          <span>About UK&apos;s Resort</span>
          <div className="h-px flex-1 bg-[#1f3c44]/15" />
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div ref={contentRef}>
            <div className="overflow-hidden">
              <h2 className="resort-intro-title font-serif text-[1.7rem] leading-[1.12] tracking-[-0.01em] text-[#1f3c44] sm:text-[2.1rem] md:text-[2.6rem] lg:text-[3rem]">
                {RESORT_INTRO_TITLE.split(" ").map((word, idx) => (
                  <span
                    key={`${word}-${idx}`}
                    className="resort-intro-title-word inline-block will-change-transform"
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </h2>
            </div>

            <div className="mt-6 max-w-xl space-y-4 text-[0.95rem] leading-[1.75] text-[#31464f] sm:mt-7 sm:text-[0.98rem]">
              <p className="resort-intro-copy">
                Nestled in the lush Sahyadri foothills, just 90 km from Mumbai via NH48, UK&apos;s Resort Khopoli is where the city unwraps itself into open skies, manicured gardens, and genuine calm.
              </p>
              <p className="resort-intro-copy">
                Spread across 85,000 sq. ft. of greenery, our resort brings together comfortable stay rooms, a thrilling Water Fun & Play, multi-cuisine dining, and space for corporate retreats and celebrations all in one address.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-0 divide-y divide-[#1f3c44]/12 border-y border-[#1f3c44]/12 sm:mt-10">
              {RESORT_INTRO_VALUES.map((item) => (
                <div
                  key={item.title}
                  className="resort-intro-value flex items-start gap-5 py-5 sm:gap-6 sm:py-6"
                >
                  <span className="mt-0.5 min-w-[5.5rem] text-[0.64rem] uppercase tracking-[0.22em] text-[#d89a55] sm:text-[0.68rem] sm:tracking-[0.26em]">
                    {item.title}
                  </span>
                  <p className="text-[0.9rem] leading-[1.65] text-[#31464f] sm:text-[0.93rem]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="resort-intro-cta mt-8 sm:mt-10">
              <Button
                href="/rooms"
                variant="outline"
                className="h-11 rounded-full bg-transparent border-[#1f3c44]/35 px-7 text-[0.68rem] uppercase tracking-[0.22em] text-[#1f3c44] transition-colors hover:border-[#1f3c44]/45 hover:bg-[#f1ece3] hover:text-[#1f3c44]"
              >
                Explore more
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div
              ref={mediaCardRef}
              className="resort-intro-media overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(31,60,68,0.10)]"
            >
              <div className="relative h-60 w-full sm:h-72 lg:h-[22rem]">
                <div className="resort-intro-media-shine pointer-events-none absolute inset-y-0 -left-1/3 z-[5] w-1/2 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0" />

                {RESORT_INTRO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.src}
                    ref={(el) => {
                      slideRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 transition-opacity duration-[600ms] will-change-transform"
                    style={{ opacity: idx === activeSlide ? 1 : 0 }}
                    aria-hidden={idx !== activeSlide}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="resort-intro-media-image object-cover"
                      quality={70}
                      loading={idx < 2 ? "eager" : "lazy"}
                      fetchPriority={idx < 2 ? "high" : "auto"}
                      priority={idx < 2}
                    />
                  </div>
                ))}

                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {RESORT_INTRO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeSlide ? "w-5 bg-white" : "w-2 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[#1f3c44]/8 bg-white px-5 py-4 sm:px-6 sm:py-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d89a55]/50 sm:h-10 sm:w-10">
                  <Image
                    src="/UK's-Resort-Logo_SVG.webp"
                    alt="UK Resort Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </span>
                <p className="text-[0.8rem] leading-snug text-[#55676f] sm:text-[0.83rem]">
                  Rated 4.9 star by 1,800+ guests and trusted for stays, dining, and day experiences in Khopoli
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {RESORT_INTRO_HIGHLIGHTS.map(({ title, icon }) => {
                const Icon = highlightIconMap[icon];
                return (
                  <div
                    key={title}
                    className="resort-intro-highlight flex flex-col gap-2.5 rounded-xl border border-[#1f3c44]/10 bg-white/70 p-4 transition-shadow hover:shadow-md sm:p-5"
                  >
                    <Icon className="h-5 w-5 text-[#d89a55] sm:h-6 sm:w-6" strokeWidth={1.4} />
                    <p className="text-[0.73rem] leading-[1.45] text-[#3f545c] sm:text-[0.78rem]">
                      {title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
