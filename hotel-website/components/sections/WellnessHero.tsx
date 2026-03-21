"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  WELLNESS_HERO_HOVER_DELAY_MS,
  WELLNESS_HERO_SLIDES,
} from "@/data/sections/wellnessHero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WellnessHero() {
  const [activeId, setActiveId] = useState(WELLNESS_HERO_SLIDES[0].id);
  const router                    = useRouter();
  const sectionRef                = useRef<HTMLElement | null>(null);
  const mediaRef                  = useRef<HTMLDivElement | null>(null);
  const contentRef                = useRef<HTMLDivElement | null>(null);
  const introAnimatedRef          = useRef(false);
  const hoverTimerRef             = useRef<number | null>(null);

  const active = useMemo(
    () => WELLNESS_HERO_SLIDES.find((s) => s.id === activeId) ?? WELLNESS_HERO_SLIDES[0],
    [activeId],
  );

  /* ─── one-time entrance + scroll parallax ─────────────────── */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (introAnimatedRef.current) return;
      introAnimatedRef.current = true;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {

          /* entrance — all elements start together, staggered tightly */
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.fromTo(
              ".wellness-eyebrow",
              { y: 12, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5 },
              0,
            )
            .fromTo(
              ".wellness-headline",
              { yPercent: 105, autoAlpha: 0 },   // ← no blur: kills perf on mobile
              { yPercent: 0, autoAlpha: 1, duration: 0.72, ease: "power4.out" },
              0.06,
            )
            .fromTo(
              ".wellness-tab",
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06 },
              0.1,
            )
            .fromTo(
              mediaRef.current,
              { scale: 1.08 },
              { scale: 1.02, duration: 1.2, ease: "power2.out" },
              0,
            )
            .call(() => ScrollTrigger.refresh());  // ← accurate parallax after intro

          /* scroll parallax */
          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          })
            .to(mediaRef.current,   { yPercent: 8, scale: 1.08, ease: "none" }, 0)
            .to(contentRef.current, { y: -42, autoAlpha: 0.68,   ease: "none" }, 0)
            .to(".wellness-overlay",{ opacity: 0.72,             ease: "none" }, 0);

        }, sectionRef);

        return () => ctx.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".wellness-eyebrow", ".wellness-headline", ".wellness-tab", mediaRef.current],
          { clearProps: "all" },
        );
        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  /* ─── tab-switch transition (fires on activeId change) ─────── */
  useEffect(() => {
    if (!introAnimatedRef.current) return; // skip during first paint

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // headline clip-reveal instead of blur — fast, GPU-composited
      gsap.fromTo(
        ".wellness-headline",
        { yPercent: 40, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.42, ease: "power3.out", overwrite: "auto" },
      );
      gsap.fromTo(
        mediaRef.current,
        { scale: 1.06 },
        { scale: 1.02, duration: 0.7, ease: "power2.out", overwrite: "auto" },
      );
    });

    return () => mm.revert();
  }, [activeId]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="relative min-h-[80svh] overflow-hidden text-white sm:min-h-[90svh] lg:min-h-screen"
    >
      {/* ── media layer ── */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <Image
          src={active.image}
          alt={active.headline}
          fill
          sizes="100vw"
          quality={75}
          loading="eager"
          fetchPriority="high"
          priority
          className="object-cover transition-opacity duration-[380ms]"
        />
      </div>

      {/* ── overlay ── */}
      <div className="wellness-overlay absolute inset-0 bg-black/50" />

      {/* ── content ── */}
      <Container className="relative flex min-h-[80svh] flex-col justify-center pb-12 pt-28 sm:min-h-[90svh] sm:pb-16 sm:pt-36 md:pt-44 lg:min-h-screen lg:pb-20 lg:pt-52">
        <div ref={contentRef}>

          <div className="wellness-eyebrow flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.2em] text-white/80 sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
            <span>Experiences That Elevate Your Getaway</span>
          </div>

          {/* fixed-height headline box prevents layout shift on tab switch */}
          <div className="relative mt-6 h-[9.2rem] overflow-hidden sm:mt-8 sm:h-[10.8rem] md:h-[12.8rem] lg:h-[13.6rem]">
            <h2 className="wellness-headline absolute inset-0 max-w-xl whitespace-pre-line font-serif text-3xl leading-tight sm:max-w-2xl sm:text-4xl md:text-6xl">
              {active.headline}
            </h2>
          </div>

          {/* tabs */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6 md:[grid-auto-rows:1fr]">
            {WELLNESS_HERO_SLIDES.map((slide, index) => {
              const isActive = slide.id === activeId;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onMouseEnter={() => {
                    if (hoverTimerRef.current) {
                      window.clearTimeout(hoverTimerRef.current);
                    }
                    hoverTimerRef.current = window.setTimeout(() => {
                      setActiveId((prev) => (prev === slide.id ? prev : slide.id));
                    }, Math.min(WELLNESS_HERO_HOVER_DELAY_MS, 260));
                  }}
                  onMouseLeave={() => {
                    if (hoverTimerRef.current) {
                      window.clearTimeout(hoverTimerRef.current);
                      hoverTimerRef.current = null;
                    }
                  }}
                  onClick={() => {
                    if (hoverTimerRef.current) {
                      window.clearTimeout(hoverTimerRef.current);
                      hoverTimerRef.current = null;
                    }
                    setActiveId(slide.id);
                    if (!slide.href) return;
                    if (slide.href.startsWith("http")) {
                      window.open(slide.href, "_blank", "noopener,noreferrer");
                      return;
                    }
                    router.push(slide.href);
                  }}
                  className={`wellness-tab group flex h-full min-h-[4.8rem] items-center gap-3 border-t border-white/30 pt-4 text-left transition-colors duration-500 sm:gap-4 sm:pt-5 md:pt-6 ${
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

        </div>
      </Container>
    </section>
  );
}
