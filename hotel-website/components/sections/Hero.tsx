"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  HOME_HERO_SUBTITLE,
  HOME_HERO_TITLE_LINES,
  HOME_HERO_VIDEO_SRC,
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
  const [video, setVideo] = useState<VideoState>({ shouldRender: false, isReady: false });

  useEffect(() => {
    if (!canPlayVideo()) return;

    const trigger = () => setVideo({ shouldRender: true, isReady: false });
    const browserWindow = window as IdleWindow;

    if (typeof browserWindow.requestIdleCallback === "function") {
      const id = browserWindow.requestIdleCallback(trigger, { timeout: 300 });
      return () => browserWindow.cancelIdleCallback?.(id);
    }

    const id = globalThis.setTimeout(trigger, 80);
    return () => globalThis.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!video.shouldRender) return;
    const element = videoRef.current;
    if (!element) return;
    element.load();
    element.play().catch(() => undefined);
  }, [video.shouldRender]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const titleLines = section.querySelectorAll<HTMLElement>(".hero-title-line");
    const bookingWrap = section.querySelector<HTMLElement>(".hero-booking-wrap");
    const heroMedia = section.querySelector<HTMLElement>(".hero-media");
    const tagline = section.querySelector<HTMLElement>(".hero-tagline");

    if (!titleLines.length || !bookingWrap || !heroMedia) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(titleLines, { yPercent: 105, autoAlpha: 0 });
        gsap.set(bookingWrap, { y: 20, autoAlpha: 0 });
        gsap.set(heroMedia, { scale: 1.06, transformOrigin: "center center" });
        if (tagline) gsap.set(tagline, { y: 14, autoAlpha: 0 });

        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(heroMedia, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
          .to(titleLines, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 }, 0.1)
          .to(tagline ?? [], { y: 0, autoAlpha: 1, duration: 0.7 }, 0.35)
          .to(bookingWrap, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.3);

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
      gsap.set([titleLines, bookingWrap, heroMedia], { clearProps: "all" });
      if (tagline) gsap.set(tagline, { clearProps: "all" });
    });

    return () => mm.revert();
  }, []);

  const showSkeleton = video.shouldRender && !video.isReady;

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="relative min-h-[100svh] overflow-hidden text-white"
    >
      <div className="hero-media absolute inset-0 isolate bg-[#143b47] will-change-transform">
        {video.shouldRender && (
          <video
            ref={videoRef}
            className="hero-video absolute left-1/2 top-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            src={HOME_HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideo((state) => ({ ...state, isReady: true }))}
            onLoadedData={() => setVideo((state) => ({ ...state, isReady: true }))}
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

      {showSkeleton && (
        <div className="site-skeleton-shell pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <div className="site-skeleton-shimmer absolute inset-0 opacity-90" />
          <div className="absolute inset-x-0 top-[22%] flex flex-col items-center px-6">
            <div className="site-skeleton-line h-14 w-[min(78vw,36rem)] rounded-full sm:h-20" />
            <div className="site-skeleton-line mt-4 h-4 w-[min(60vw,26rem)] rounded-full sm:h-5" />
          </div>
          <div className="absolute inset-x-0 bottom-10 flex justify-center px-4 sm:bottom-12 md:bottom-14">
            <div className="site-skeleton-line h-16 w-[min(88vw,62rem)] rounded-[1.8rem] sm:h-[4.5rem]" />
          </div>
        </div>
      )}

      <Container className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8">
        <div
          ref={contentRef}
          className="flex w-full max-w-[72rem] flex-col items-center justify-center px-2 pb-28 pt-[calc(7rem+env(safe-area-inset-top))] sm:px-3 sm:pb-28 sm:pt-28 md:px-4 md:pb-32 md:pt-32 lg:pb-32 lg:pt-36"
        >
          {/* <div className="mt-3 space-y-0 sm:mt-5 md:mt-6">
            {HOME_HERO_TITLE_LINES.map((line, index) => (
              <div key={index} className="overflow-hidden leading-none">
                <h1 className="hero-title-line font-serif text-[2.45rem] font-normal leading-[1] tracking-[-0.015em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-[3.5rem] md:text-[4.6rem] lg:text-[5.4rem] xl:text-[6rem]">
                  {line === "UK's Resort" ? <>UK&apos;s Resort</> : line}
                </h1>
              </div>
            ))}
          </div> */}

          {/* <p className="hero-tagline mt-3 max-w-[34rem] px-2 text-center text-[0.78rem] leading-6 text-white/88 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-[0.84rem] md:text-[0.9rem]">
            {HOME_HERO_SUBTITLE}
          </p> */}
        </div>

        <div className="hero-booking-wrap absolute bottom-10 left-1/2 z-20 w-full -translate-x-1/2 px-2 sm:bottom-12 sm:px-3 md:bottom-14 md:px-4">
          <HeroBookingBar />
        </div>
      </Container>

      <style>{`
        .hero-video {
          object-fit: cover;
          object-position: 50% 50%;
          transform-origin: center center;
        }

        .hero-booking-wrap {
          display: flex;
          width: 100%;
          justify-content: center;
        }

        .hero-booking-wrap > form {
          margin: 0 auto !important;
          width: min(88vw, 62rem) !important;
          max-width: 62rem !important;
        }

        @media (min-width: 1024px) {
          .hero-booking-wrap > form {
            width: min(82vw, 62rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
