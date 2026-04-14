"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  HOME_HERO_SUBTITLE,
  HOME_HERO_TITLE_LINES,
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
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "video";
    preloadLink.href = HOME_HERO_VIDEO_SRC;
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

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
            preload="auto"
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

      <Container
        size="content"
        className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center text-center"
      >
        {/* <div
          ref={contentRef}
          className="flex w-full flex-col items-center justify-center pb-32 pt-[var(--hero-content-offset)] sm:pb-36 lg:pb-40"
        >
          <div className="w-full max-w-4xl space-y-5 px-1 sm:space-y-6">
            {HOME_HERO_TITLE_LINES.map((line, index) => (
              <div key={index} className="overflow-hidden leading-none">
                <h1
                  id={index === 0 ? "home-hero-title" : undefined}
                  className="hero-title-line font-serif text-[clamp(2.6rem,10vw,6.25rem)] font-normal leading-[0.94] tracking-[-0.025em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                >
                  {line === "UK's Resort" ? <>UK&apos;s Resort</> : line}
                </h1>
              </div>
            ))}
          </div>

          <p className="hero-tagline mt-4 max-w-2xl text-pretty px-1 text-sm leading-7 text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] sm:text-base sm:leading-8 lg:text-lg">
            {HOME_HERO_SUBTITLE}
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/rooms"
              className="site-button site-button--primary site-button--lg w-full max-w-xs px-8 text-center"
            >
              Explore Stays
            </Link>
            <Link
              href="/contact"
              className="site-button site-button--outline site-button--lg w-full max-w-xs border-white/45 bg-white/10 px-8 text-center text-white hover:border-white hover:bg-white/18"
            >
              Plan Your Visit
            </Link>
          </div>
        </div> */}

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
