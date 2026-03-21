"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const HeroBookingBar = dynamic(() => import("../features/HeroBookingBar"), {
  ssr: false,
  loading: () => (
    <div className="h-11 w-full rounded-full bg-white/15 sm:h-12" aria-hidden="true" />
  ),
});

const HERO_VIDEO_SRC = "https://bookonelocal.in/cdn/UK%27s+Resort-Hero-Video.mp4";
const HERO_FALLBACK_IMAGE = "https://bookonelocal.in/cdn/3.png";
// const HERO_TAGLINE = "Experience elegant and comfortable rooms designed for a relaxing stay at UK Resort.";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const [videoPreload, setVideoPreload] = useState<"none" | "metadata">("none");

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const isLowPower = (nav.deviceMemory ?? 8) <= 4 || navigator.hardwareConcurrency <= 4;
    const saveData = Boolean(nav.connection?.saveData);
    const lowBandwidth = ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");
    const allowVideo = !(saveData || lowBandwidth || isLowPower);

    if (!allowVideo) {
      setShouldRenderVideo(false);
      return;
    }

    const startVideo = () => {
      setVideoPreload("metadata");
      setShouldRenderVideo(true);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => startVideo(), { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = globalThis.setTimeout(startVideo, 350);
    return () => globalThis.clearTimeout(timerId);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const introTag = section.querySelector(".hero-intro-tag");
    const titleLines = section.querySelectorAll(".hero-title-line");
    const bookingWrap = section.querySelector(".hero-booking-wrap");
    const heroMedia = section.querySelector(".hero-media");
    if (!titleLines.length || !bookingWrap || !heroMedia) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (introTag) gsap.set(introTag, { y: 18, autoAlpha: 0 });
        gsap.set(titleLines, { yPercent: 100, autoAlpha: 0 });
        gsap.set(bookingWrap, { y: 22, autoAlpha: 0 });
        gsap.set(heroMedia, { scale: 1.04, yPercent: 0, transformOrigin: "center center" });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (introTag) {
          tl.to(introTag, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.08);
        }
        tl.to(
            titleLines,
            { yPercent: 0, autoAlpha: 1, duration: 0.95, stagger: 0.1, ease: "power4.out" },
            0.14,
          )
          .to(bookingWrap, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.3)
          .to(heroMedia, { scale: 1, duration: 1.5, ease: "power2.out" }, 0);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          })
          .to(heroMedia, { yPercent: 10, scale: 1.05, ease: "none" }, 0)
          .to(contentRef.current, { y: -48, autoAlpha: 0.62, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([titleLines, bookingWrap, heroMedia], { clearProps: "all" });
      if (introTag) gsap.set(introTag, { clearProps: "all" });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!shouldRenderVideo) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.load();
    videoEl.play().catch(() => undefined);
  }, [shouldRenderVideo]);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="relative min-h-[100svh] overflow-hidden text-white"
    >
      <div className="hero-media absolute inset-0 isolate will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${HERO_FALLBACK_IMAGE}")` }}
          aria-hidden="true"
        />
        {shouldRenderVideo && (
          <video
            ref={videoRef}
            className="hero-video absolute left-1/2 top-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2"
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload={videoPreload}
          />
        )}
      </div>

      <Container className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8">
        <div
          ref={contentRef}
          className="flex w-full max-w-[72rem] flex-col items-center justify-center px-2 pb-28 pt-[calc(7rem+env(safe-area-inset-top))] sm:px-3 sm:pb-28 sm:pt-28 md:px-4 md:pb-32 md:pt-32 lg:pb-32 lg:pt-36"
        >
          <div>
            {/* <p className="hero-intro-tag mx-auto max-w-[22rem] text-[0.68rem] font-bold uppercase tracking-[0.34em] text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:max-w-[34rem] sm:text-[0.8rem] sm:tracking-[0.42em] md:text-[0.85rem]">
              {HERO_TAGLINE}
            </p> */}
          </div>

      <div className="mt-3 space-y-0 sm:mt-5 md:mt-6">
  {["UK's Resort"].map((line, i) => (
    <div key={i} className="overflow-hidden leading-none">
      <h1 className="hero-title-line font-serif text-[2.45rem] font-normal leading-[1.0] tracking-[-0.015em] text-white sm:text-[3.5rem] md:text-[4.6rem] lg:text-[5.4rem] xl:text-[6rem]">
        {line === "UK's Resort" ? <>UK&apos;s Resort</> : line}
      </h1>
    </div>
  ))}
</div>

          <p className="mt-3 max-w-[40rem] px-2 text-center text-[0.86rem] leading-relaxed text-white/92 drop-shadow-[0_5px_18px_rgba(0,0,0,0.45)] sm:mt-4 sm:text-[0.95rem] md:text-[1.02rem]">
            Experience elegant and comfortable rooms designed for a relaxing stay at UK Resort.
          </p>

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
          margin-top: 0 !important;
          margin-left: auto !important;
          margin-right: auto !important;
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
