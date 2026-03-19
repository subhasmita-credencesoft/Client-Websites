"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { htmlToText } from "../../lib/sanitizeHtml";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSection() {
  const { property, isLoading, error } = usePropertyData();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);

  const safeProperty = mounted ? property : null;
  const name = safeProperty?.name || "UK's Resort";
  const description =
    htmlToText(safeProperty?.businessDescription).slice(0, 360) ||
    "UK's Resort - Just a few kilometers away from the hustle bustle of Mumbai and set amidst abundant scenic beauty and rich history.";
  const typeLine = [safeProperty?.businessType, safeProperty?.businessSubtype].filter(Boolean).join(" - ");
  const heroImage =
    safeProperty?.imageList?.find((img) => img?.mainImage)?.url ||
    safeProperty?.imageList?.[0]?.url ||
    "https://bookonelocal.in/cdn/Copy of IMG_1568.avif";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        revealTl.fromTo(
          ".welcome-eyebrow",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
        );

        revealTl.fromTo(
          ".welcome-title-line",
          { yPercent: 115, autoAlpha: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
          "<+0.08",
        );

        revealTl.fromTo(
          ".welcome-copy",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out", stagger: 0.06 },
          "<+0.1",
        );

        revealTl.fromTo(
          ".welcome-card",
          { y: 46, autoAlpha: 0, rotateX: 5, transformOrigin: "50% 100%" },
          { y: 0, autoAlpha: 1, rotateX: 0, duration: 1.05, ease: "power3.out" },
          "<-0.6",
        );

        revealTl.fromTo(
          ".welcome-image",
          { scale: 1.12 },
          { scale: 1.03, duration: 1.2, ease: "power2.out" },
          "<+0.05",
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(".welcome-image", { yPercent: 8, scale: 1.1, ease: "none" }, 0)
          .to(".welcome-copy", { y: -10, autoAlpha: 0.92, ease: "none" }, 0)
          .to(imageWrapRef.current, { y: -16, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="bg-[#f6f2ec] py-12 text-[#1f3c44] sm:py-14 lg:py-16"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="text-center lg:text-left">
            {mounted && !isLoading && !error && typeLine && (
              <p className="welcome-eyebrow mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-[#1f3c44]/65">{typeLine}</p>
            )}

            <div className="mt-1 overflow-hidden">
              <h2 className="welcome-title-line font-serif text-[2rem] leading-tight sm:text-[2.4rem] lg:text-[2.8rem]">Welcome to</h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="welcome-title-line font-serif text-[2rem] leading-tight sm:text-[2.4rem] lg:text-[2.8rem]">{name}!</h2>
            </div>

            {mounted && isLoading && <p className="welcome-copy mt-3 text-sm text-[#1f3c44]/55">Loading property details...</p>}
            {mounted && !isLoading && error && <p className="welcome-copy mt-3 text-sm text-[#1f3c44]/55">{error}</p>}

            <p className="welcome-copy mt-5 text-[0.98rem] leading-relaxed text-[#1f3c44]/80 sm:text-[1.05rem]">{description}</p>
          </div>

          <div
            ref={imageWrapRef}
            className="welcome-card overflow-hidden rounded-2xl bg-white shadow-[0_16px_48px_rgba(31,60,68,0.16)]"
          >
            <div className="relative h-64 w-full overflow-hidden sm:h-72 lg:h-[24rem]">
              <Image
                src={heroImage}
                alt={`${name} view`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="welcome-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
            <div className="border-t border-[#1f3c44]/10 bg-white px-5 py-4">
              <p className="welcome-copy text-[0.8rem] leading-snug text-[#1f3c44]/65">
                Experience scenic beauty, warm hospitality, and restful comfort at {name}.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
