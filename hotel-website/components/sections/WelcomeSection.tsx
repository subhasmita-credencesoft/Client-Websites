"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";
import useClientReady from "../../hooks/useClientReady";
import { htmlToText } from "../../lib/sanitizeHtml";
import {
  WELCOME_SECTION_FALLBACK_DESCRIPTION,
  WELCOME_SECTION_FALLBACK_IMAGE,
  WELCOME_SECTION_FALLBACK_NAME,
  WELCOME_SECTION_FOOTER_TEMPLATE,
  WELCOME_SECTION_TITLE_LINES,
} from "@/data/sections/welcomeSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WelcomeSection() {
  const { property } = usePropertyData();
  const clientReady = useClientReady();
  const sectionRef    = useRef<HTMLElement | null>(null);
  const imageWrapRef  = useRef<HTMLDivElement | null>(null);
  const safeProperty  = clientReady ? property : null;
  const name          = safeProperty?.name || WELCOME_SECTION_FALLBACK_NAME;
  const description   =
    htmlToText(safeProperty?.businessDescription).slice(0, 360) ||
    WELCOME_SECTION_FALLBACK_DESCRIPTION;
  const typeLine      = [safeProperty?.businessType, safeProperty?.businessSubtype]
    .filter(Boolean)
    .join(" - ");
  const heroImage     =
    safeProperty?.imageList?.find((img) => img?.mainImage)?.url ||
    safeProperty?.imageList?.[0]?.url ||
    WELCOME_SECTION_FALLBACK_IMAGE;

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;

    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          const revealTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          revealTl
            .fromTo(
              ".welcome-eyebrow",
              { y: 10, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.42 },
            )
            .fromTo(
              ".welcome-title-line",
              { yPercent: 100, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.68,
                stagger: 0.06,
                ease: "power4.out",
              },
              "<+0.04",
            )
            .fromTo(
              ".welcome-copy",
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.56, stagger: 0.04 },
              "<+0.04",
            )
            .fromTo(
              ".welcome-card",
              { y: 24, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7 },
              "<-0.28",
            )
            .fromTo(
              ".welcome-image",
              { scale: 1.06 },
              { scale: 1.01, duration: 0.9, ease: "power2.out" },
              "<",
            )
            .call(() => ScrollTrigger.refresh());

          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 92%",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
            .to(".welcome-image", { yPercent: 6, scale: 1.06, ease: "none" }, 0)
            .to(".welcome-copy", { y: -6, autoAlpha: 0.92, ease: "none" }, 0)
            .to(imageWrapRef.current, { y: -10, ease: "none" }, 0);
        }, sectionRef);

        return () => ctx.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".welcome-eyebrow", ".welcome-title-line", ".welcome-copy", ".welcome-card", ".welcome-image"],
          { clearProps: "all" },
        );
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      mm?.revert();
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="bg-[#f6f2ec] py-12 text-[#1f3c44] sm:py-14 lg:py-16"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

          {/* â”€â”€ text column â”€â”€ */}
          <div className="text-center lg:text-left">
            {clientReady && typeLine && (
              <p className="welcome-eyebrow mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-[#1f3c44]/65">
                {typeLine}
              </p>
            )}

            <div className="mt-1 overflow-hidden">
              <h2 className="welcome-title-line font-serif text-[2rem] leading-tight sm:text-[2.4rem] lg:text-[2.8rem]">
                {WELCOME_SECTION_TITLE_LINES[0]}
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="welcome-title-line font-serif text-[2rem] leading-tight sm:text-[2.4rem] lg:text-[2.8rem]">
                {WELCOME_SECTION_TITLE_LINES[1].replace("{name}", name)}
              </h2>
            </div>

            <p className="welcome-copy mt-5 text-[0.98rem] leading-relaxed text-[#1f3c44]/80 sm:text-[1.05rem]">
              {description}
            </p>
          </div>

          {/* â”€â”€ image card â”€â”€ */}
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
                priority
                fetchPriority="high"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
            <div className="border-t border-[#1f3c44]/10 bg-white px-5 py-4">
              <p className="welcome-copy text-[0.8rem] leading-snug text-[#1f3c44]/65">
                {WELCOME_SECTION_FOOTER_TEMPLATE.replace("{name}", name)}
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

