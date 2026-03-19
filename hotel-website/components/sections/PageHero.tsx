"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

type PageHeroProps = {
  title: string;
  backgroundImage: string;
  subtitle?: string;
  breadcrumb?: string;
  minHeightClassName?: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function PageHero({
  title,
  backgroundImage,
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

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".page-hero-title",
          { yPercent: 120, autoAlpha: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
          },
        );

        gsap.fromTo(
          ".page-hero-subtitle",
          { y: 18, autoAlpha: 0, filter: "blur(6px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            delay: 0.12,
          },
        );

        gsap.fromTo(
          ".page-hero-breadcrumb",
          { y: 14, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.2,
          },
        );

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
            scrub: 1,
          },
        })
          .to(mediaRef.current, { yPercent: 10, scale: 1.12, ease: "none" }, 0)
          .to(contentRef.current, { y: -70, autoAlpha: 0.62, ease: "none" }, 0)
          .to(overlayRef.current, { opacity: 0.82, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden bg-[#0f1216] text-white ${minHeightClassName}`}>
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          sizes="100vw"
          quality={74}
          priority
          fetchPriority="high"
          loading="eager"
          placeholder="blur"
          blurDataURL={HERO_BLUR}
          className="object-cover"
          unoptimized={backgroundImage.startsWith("http")}
        />
      </div>
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />

      <Container className={`relative z-10 flex flex-col items-center justify-center text-center ${minHeightClassName}`}>
        <div ref={contentRef}>
          <div className="overflow-hidden">
            <h1 className="page-hero-title font-serif text-4xl leading-[0.95] drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] md:text-6xl">
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
