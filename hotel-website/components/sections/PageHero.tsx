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
  backgroundImage?: string;
  backgroundImages?: string[];
  backgroundVideo?: string;
  preferVideoOnly?: boolean;
  subtitle?: string;
  breadcrumb?: string;
  minHeightClassName?: string;
  videoAriaLabel?: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function PageHero({
  title,
  backgroundImage,
  backgroundImages,
  backgroundVideo,
  preferVideoOnly = false,
  subtitle,
  breadcrumb,
  minHeightClassName = "min-h-[100svh]",
  videoAriaLabel,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [breadcrumbVisible, setBreadcrumbVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
    if (!backgroundImages || backgroundImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [backgroundImages]);

  useEffect(() => {
    if (!backgroundVideo) return;

    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "video";
    preloadLink.href = backgroundVideo;
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [backgroundVideo]);

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
        <div aria-hidden="true" className="absolute inset-0 bg-[#143b47]" />
        {backgroundImages && backgroundImages.length > 0 ? (
          backgroundImages.map((src, idx) => (
            <div
              key={src}
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${src})`,
                opacity: idx === activeImageIndex ? 1 : 0,
                zIndex: idx === activeImageIndex ? 2 : 1,
              }}
            />
          ))
        ) : (
          !preferVideoOnly && backgroundImage ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          ) : null
        )}
        {backgroundVideo ? (
          <video
            key={backgroundVideo}
            src={backgroundVideo}
            poster={preferVideoOnly ? undefined : backgroundImage}
            className={`absolute left-1/2 top-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center transition-opacity duration-700 ease-out z-10 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onCanPlayThrough={() => setVideoReady(true)}
            aria-label={videoAriaLabel}
            aria-hidden={videoAriaLabel ? undefined : "true"}
          />
        ) : null}
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/14 to-black/54 md:from-black/34 md:via-black/16 md:to-black/60"
      />

      <Container
        size="content"
        className={`relative z-10 flex flex-col items-center justify-center text-center ${minHeightClassName}`}
      >
        <div
          ref={contentRef}
          className="flex min-h-[100svh] w-full items-center justify-center pb-8 pt-[calc(var(--header-row-min-height)+env(safe-area-inset-top)+1rem)] sm:pb-12 sm:pt-24 md:pb-14 md:pt-28"
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
