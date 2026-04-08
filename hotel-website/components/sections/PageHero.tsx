"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

type PageHeroProps = {
  title: string;
  backgroundImage: string;
  backgroundVideo?: string;
  subtitle?: string;
  breadcrumb?: string;
  minHeightClassName?: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function PageHero({
  title,
  backgroundImage,
  backgroundVideo,
  subtitle,
  breadcrumb,
  minHeightClassName = "min-h-[100vh]",
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const breadcrumbCurrent = useMemo(() => {
    if (!breadcrumb) return "";
    return breadcrumb.replace(/^Home\s*\/\s*/i, "").trim();
  }, [breadcrumb]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const titleEl = section.querySelector(".page-hero-title");
    const subtitleEl = section.querySelector(".page-hero-subtitle");
    const breadcrumbEl = section.querySelector(".page-hero-breadcrumb");
    if (!titleEl || !mediaRef.current || !contentRef.current || !overlayRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(titleEl, { yPercent: 100, autoAlpha: 0 });
        if (subtitleEl) gsap.set(subtitleEl, { y: 16, autoAlpha: 0 });
        if (breadcrumbEl) gsap.set(breadcrumbEl, { y: 12, autoAlpha: 0 });
        gsap.set(mediaRef.current, { scale: 1.1, yPercent: 0, transformOrigin: "center center" });

        const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        introTl.to(titleEl, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power4.out",
        });

        if (subtitleEl) {
          introTl.to(
            subtitleEl,
            { y: 0, autoAlpha: 1, duration: 0.62 },
            "<+0.08",
          );
        }

        if (breadcrumbEl) {
          introTl.to(
            breadcrumbEl,
            { y: 0, autoAlpha: 1, duration: 0.65 },
            "<+0.06",
          );
        }

        gsap.fromTo(
          mediaRef.current,
          { scale: 1.12 },
          { scale: 1.04, duration: 1.6, ease: "power2.out" },
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
        })
          .to(mediaRef.current, { yPercent: 10, scale: 1.12, ease: "none" }, 0)
          .to(contentRef.current, { y: -48, autoAlpha: 0.68, ease: "none" }, 0)
          .to(overlayRef.current, { opacity: 0.82, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className={`relative overflow-hidden bg-[#0f1216] text-white ${minHeightClassName}`}
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {!backgroundVideo ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : null}
        {backgroundVideo ? (
          <video
            src={backgroundVideo}
            className="absolute left-1/2 top-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/14 to-black/54 md:from-black/34 md:via-black/16 md:to-black/60"
      />

      <Container
        className={`relative z-10 flex flex-col items-center justify-center text-center ${minHeightClassName}`}
      >
        <div
          ref={contentRef}
          className="flex min-h-[100svh] w-full items-center justify-center px-4 pb-8 pt-[calc(4.75rem+env(safe-area-inset-top))] sm:px-6 sm:pb-12 sm:pt-24 md:pb-14 md:pt-28"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="overflow-hidden">
            <h1 className="page-hero-title font-serif text-[3.2rem] leading-[0.96] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.42)] sm:text-[4.2rem] md:text-[5.1rem] lg:text-[6.2rem] xl:text-[6.9rem]">
              {title}
            </h1>
          </div>

          {subtitle && (
            <p className="page-hero-subtitle mx-auto mt-5 max-w-3xl text-center text-[1.05rem] leading-7 text-white/92 sm:text-[1.12rem] md:text-[1.2rem] md:leading-8">
              {subtitle}
            </p>
          )}

          {breadcrumb && (
            <p className="page-hero-breadcrumb mx-auto mt-6 text-center text-[0.84rem] font-semibold uppercase tracking-[0.32em] text-white/88 md:text-[0.92rem]">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              {breadcrumbCurrent ? (
                <>
                  <span className="mx-2 text-white/60">/</span>
                  <span>{breadcrumbCurrent}</span>
                </>
              ) : null}
            </p>
          )}
          </div>
        </div>
      </Container>
    </section>
  );
}
