"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import SplitText from "../ui/SplitText";
import BlurText from "../ui/BlurText";

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
  const [breadcrumbVisible, setBreadcrumbVisible] = useState(false);

  const breadcrumbCurrent = useMemo(() => {
    if (!breadcrumb) return "";
    return breadcrumb.replace(/^Home\s*\/\s*/i, "").trim();
  }, [breadcrumb]);

  const isLongTitle = useMemo(() => title.trim().length > 16, [title]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setBreadcrumbVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!mediaRef.current || !contentRef.current || !overlayRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(mediaRef.current, { scale: 1.1, yPercent: 0, transformOrigin: "center center" });

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
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <div className="overflow-hidden">
            <h1
              className={`page-hero-title ${isLongTitle ? "page-hero-title--long" : "page-hero-title--short"}`}
            >
              <SplitText
                text={title}
                delay={38}
                duration={0.85}
                splitType="chars"
                from={{ opacity: 0, y: 48, filter: "blur(12px)" }}
                to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="block"
                textAlign="center"
              />
            </h1>
          </div>

          {subtitle && (
            <p className="page-hero-subtitle">
              <BlurText
                text={subtitle}
                delay={120}
                animateBy="words"
                direction="top"
                className="block"
              />
            </p>
          )}

          {breadcrumb && (
            <p
              className="page-hero-breadcrumb"
              style={{
                opacity: breadcrumbVisible ? 1 : 0,
                filter: breadcrumbVisible ? "blur(0px)" : "blur(8px)",
                transform: breadcrumbVisible ? "translate3d(0,0,0)" : "translate3d(0,14px,0)",
                transitionDelay: "220ms",
              }}
            >
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
