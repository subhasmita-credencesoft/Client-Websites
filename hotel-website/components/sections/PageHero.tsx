"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const HERO_BLUR =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMGYxMjE2Ii8+PC9zdmc+";
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
        {backgroundVideo ? (
          <video
            src={backgroundVideo}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            sizes="100vw"
            quality={68}
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover"
            unoptimized={backgroundImage.startsWith("http")}
          />
        )}
      </div>
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />

      <Container className={`relative z-10 flex flex-col items-center justify-center text-center ${minHeightClassName}`}>
        <div ref={contentRef}>
          <div className="overflow-hidden">
            <h1 className="page-hero-title font-serif text-4xl leading-[0.95] text-white md:text-6xl">
              {title}
            </h1>
          </div>

          {subtitle && <p className="page-hero-subtitle mt-4 max-w-3xl text-sm text-white/85 md:text-base">{subtitle}</p>}

          {breadcrumb && (
            <p className="page-hero-breadcrumb mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/85 md:text-[0.72rem]">
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
      </Container>
    </section>
  );
}
