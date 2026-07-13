"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  HOME_HERO_SLIDE_INTERVAL_MS,
  HOME_HERO_SLIDES,
  HOME_HERO_VIDEO_SRC,
  HOME_HERO_VIDEO_POSTER,
} from "../../data/sections/homeHero";

const HeroBookingBar = dynamic(() => import("../features/HeroBookingBar"), {
  ssr: false,
  loading: () => (
    <div className="h-11 w-full rounded-full bg-white/15 sm:h-12" aria-hidden="true" />
  ),
});

function canPlayVideo(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  if (nav.connection?.saveData) return false;
  if (["slow-2g", "2g"].includes(nav.connection?.effectiveType ?? "")) return false;

  return true;
}

type VideoState = {
  shouldRender: boolean;
  isReady: boolean;
};

const TYPE_SPEED_MS = 58;

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [video, setVideo] = useState<VideoState>({ shouldRender: false, isReady: false });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [typedCharacterCount, setTypedCharacterCount] = useState(0);
  const activeSlide = HOME_HERO_SLIDES[activeSlideIndex] ?? HOME_HERO_SLIDES[0];
  const totalTitleCharacters = activeSlide.titleLines.reduce((total, line) => total + line.length, 0);
  const typedTitleLines = activeSlide.titleLines.map((line, index) => {
    const previousLength = activeSlide.titleLines
      .slice(0, index)
      .reduce((total, item) => total + item.length, 0);
    const visibleLength = Math.min(line.length, Math.max(typedCharacterCount - previousLength, 0));
    return line.slice(0, visibleLength);
  });
  const cursorLineIndex = typedTitleLines.findIndex(
    (line, index) => line.length < activeSlide.titleLines[index].length,
  );

  useEffect(() => {
    if (!canPlayVideo()) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const browserWindow = window as IdleWindow;

          const startVideo = () => {
            setVideo({ shouldRender: true, isReady: false });
          };

          if (typeof browserWindow.requestIdleCallback === "function") {
            browserWindow.requestIdleCallback(startVideo, { timeout: 300 });
          } else {
            globalThis.setTimeout(startVideo, 80);
          }

          observerRef.current?.disconnect();
          observerRef.current = null;
        }
      },
      { rootMargin: "200px 0px" },
    );

    observerRef.current.observe(section);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!video.shouldRender) return;
    const element = videoRef.current;
    if (!element) return;
    element.load();
    element.play().catch(() => undefined);
  }, [video.shouldRender]);

  useEffect(() => {
    const id = globalThis.setInterval(() => {
      setTypedCharacterCount(0);
      setActiveSlideIndex((index) => (index + 1) % HOME_HERO_SLIDES.length);
    }, HOME_HERO_SLIDE_INTERVAL_MS);

    return () => globalThis.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = globalThis.setInterval(() => {
      setTypedCharacterCount((count) => {
        if (count >= totalTitleCharacters) {
          globalThis.clearInterval(id);
          return count;
        }

        return count + 1;
      });
    }, TYPE_SPEED_MS);

    return () => globalThis.clearInterval(id);
  }, [activeSlideIndex, totalTitleCharacters]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const titleWrap = section.querySelector<HTMLElement>(".hero-title-wrap");
    const bookingWrap = section.querySelector<HTMLElement>(".hero-booking-wrap");
    const heroMedia = section.querySelector<HTMLElement>(".hero-media");
    const tagline = section.querySelector<HTMLElement>(".hero-tagline");
    const intro = section.querySelector<HTMLElement>(".hero-intro-tag");

    if (!titleWrap || !bookingWrap || !heroMedia) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(titleWrap, { y: 24, autoAlpha: 0 });
        gsap.set(bookingWrap, { y: 20, autoAlpha: 0 });
        gsap.set(heroMedia, { scale: 1.06, transformOrigin: "center center" });
        if (tagline) gsap.set(tagline, { y: 14, autoAlpha: 0 });
        if (intro) gsap.set(intro, { y: 12, autoAlpha: 0 });

        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(heroMedia, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
          .to(intro ?? [], { y: 0, autoAlpha: 1, duration: 0.55 }, 0.05)
          .to(titleWrap, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.12)
          .to(tagline ?? [], { y: 0, autoAlpha: 1, duration: 0.7 }, 0.38)
          .to(bookingWrap, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.42);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })
          .to(heroMedia, { yPercent: 12, scale: 1.06, ease: "none" }, 0)
          .to(contentRef.current, { y: -44, autoAlpha: 0.55, ease: "none" }, 0);
      }, section);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([titleWrap, bookingWrap, heroMedia], { clearProps: "all" });
      if (tagline) gsap.set(tagline, { clearProps: "all" });
      if (intro) gsap.set(intro, { clearProps: "all" });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      aria-labelledby="home-hero-title"
      className="relative min-h-[100svh] overflow-hidden bg-[#0f1216] text-white"
    >
      <div className="hero-media absolute inset-0 isolate bg-[#143b47] will-change-transform">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${HOME_HERO_VIDEO_POSTER}")` }}
        />
        {video.shouldRender && (
          <video
            ref={videoRef}
            poster={HOME_HERO_VIDEO_POSTER}
            className={`hero-video absolute left-1/2 top-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700 ease-out ${
              video.isReady ? "opacity-100" : "opacity-0"
            }`}
            src={HOME_HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onCanPlayThrough={() => setVideo((state) => ({ ...state, isReady: true }))}
            onError={() => setVideo((state) => ({ ...state, isReady: false }))}
            aria-hidden="true"
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.52) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <Container
        size="content"
        className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center text-center"
      >
        <div
          ref={contentRef}
          className="flex w-full flex-col items-center justify-center px-2 pb-36 pt-[var(--hero-content-offset)] sm:pb-40 lg:pb-44"
        >
          <p className="hero-intro-tag mb-3 min-h-[1rem] text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/80 drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] transition-opacity duration-500 sm:text-xs">
            {activeSlide.eyebrow}
          </p>

          <div className="hero-title-wrap w-full max-w-4xl space-y-2 px-1 sm:space-y-3">
            <h1 id="home-hero-title" className="font-serif text-white" aria-label={activeSlide.titleLines.join(" ")}>
              {typedTitleLines.map((line, index) => (
                <div key={`${activeSlide.eyebrow}-${index}`} className="overflow-hidden leading-none">
                  <span
                    className="hero-title-line block min-h-[0.96em] font-serif text-[clamp(2.7rem,6.8vw,5.8rem)] font-normal leading-[0.96] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.38)] transition-opacity duration-500"
                    aria-hidden="true"
                  >
                    {line}
                    {index === cursorLineIndex && typedCharacterCount < totalTitleCharacters && (
                      <span className="hero-type-cursor" aria-hidden="true" />
                    )}
                    {line.length === 0 && <span aria-hidden="true">&nbsp;</span>}
                  </span>
                </div>
              ))}
            </h1>
          </div>

          <p className="hero-tagline mt-4 min-h-[3.25rem] max-w-xl text-pretty px-1 text-sm leading-7 text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.42)] transition-opacity duration-500 sm:min-h-[3rem] sm:text-base sm:leading-8 lg:text-lg">
            {activeSlide.subtitle}
          </p>
        </div>

        <div className="hero-booking-wrap absolute inset-x-0 bottom-6 z-20 px-0 sm:bottom-8 lg:bottom-10">
          <HeroBookingBar />
        </div>
      </Container>

      <style>{`
        .hero-video {
          object-fit: cover;
          object-position: 50% 50%;
          transform-origin: center center;
        }

        .hero-type-cursor {
          display: inline-block;
          width: 0.08em;
          height: 0.82em;
          margin-left: 0.08em;
          transform: translateY(0.08em);
          background: currentColor;
          animation: heroTypeCursor 0.85s steps(2, start) infinite;
        }

        @keyframes heroTypeCursor {
          0%, 45% {
            opacity: 1;
          }

          46%, 100% {
            opacity: 0;
          }
        }

        .hero-booking-wrap {
          display: flex;
          width: 100%;
          justify-content: center;
        }

        .hero-booking-wrap > form {
          margin: 0 auto !important;
          width: min(calc(100% - (2 * var(--container-pad))), var(--hero-booking-max)) !important;
          max-width: var(--hero-booking-max) !important;
        }
      `}</style>
    </section>
  );
}
