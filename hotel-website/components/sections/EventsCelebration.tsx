"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  WEDDINGS_CELEBRATION_BLOCKS,
  WEDDINGS_CELEBRATION_INTRO,
  WEDDINGS_CELEBRATION_KICKER,
  WEDDINGS_CELEBRATION_MAP_LINKS,
  WEDDINGS_CELEBRATION_TITLE_LINES,
  type WeddingsCelebrationBlock,
} from "@/data/sections/eventsCelebration";

gsap.registerPlugin(ScrollTrigger);

const sectionPills = ["Event Days", "Play Areas", "Adventure Zones"] as const;

function CelebrationBlock({ block, index }: { block: WeddingsCelebrationBlock; index: number }) {
  return (
    <article className="wed-block relative overflow-hidden border-b border-[#1f3c44]/10 pb-10 last:border-b-0 last:pb-0">
      <div className="wed-glow wed-glow-a" aria-hidden="true" />
      <div className="wed-glow wed-glow-b" aria-hidden="true" />

      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
        <div className={`wed-media-card relative min-h-[20rem] overflow-hidden rounded-[1.8rem] sm:min-h-[25rem] lg:min-h-[31rem] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
          <Image
            src={block.mediaImage}
            alt={block.mediaAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 56vw"
            unoptimized
            className="wed-main-image object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,24,0.08)_0%,rgba(8,18,24,0.18)_45%,rgba(8,18,24,0.44)_100%)]" />
          <div className="wed-shine absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-white/0 via-white/18 to-white/0 opacity-0" />
          <div className="absolute left-5 top-5 z-10 inline-flex rounded-full border border-white/25 bg-black/15 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
            Experience 0{index + 1}
          </div>
          <div className="absolute bottom-5 left-5 z-10 hidden rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md sm:inline-flex">
            {block.highlightLabel}
          </div>
        </div>

        <div className={`wed-content relative z-10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {block.highlightLabel}
          </p>
          <h3 className="mt-4 max-w-[12ch] font-serif text-[2rem] leading-[0.95] text-[#173842] sm:text-[2.35rem] lg:text-[3rem]">
            {block.cardTitle}
          </h3>
          <div className="mt-5 h-px w-20 bg-gradient-to-r from-[#d89a55] to-transparent" />

          <div className="mt-6 space-y-4 max-w-2xl">
            {block.cardParagraphs.map((paragraph, paragraphIndex) => (
              <p
                key={`${block.id}-${paragraphIndex}`}
                className={`text-[0.98rem] leading-8 text-[#1f3c44]/76 ${paragraphIndex === 0 ? "text-[#1f3c44]/88" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {block.highlights.map((item) => (
              <span
                key={item}
                className="wed-chip rounded-full border border-[#1f3c44]/12 bg-white px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#1f3c44]/72 shadow-[0_10px_24px_rgba(31,60,68,0.06)]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={block.enquiryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-95"
            >
              Explore now
            </a>
            <a
              href={WEDDINGS_CELEBRATION_MAP_LINKS[block.virtualTourKey]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#1f3c44]/16 bg-transparent px-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#1f3c44] transition hover:bg-white/70"
              aria-label={block.virtualTourAriaLabel}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.5 12a7.5 7.5 0 0 1 12.62-5.43" />
                <path d="M19.5 12a7.5 7.5 0 0 1-12.62 5.43" />
                <path d="M17 3.5h2.9v2.9" />
                <path d="M7 20.5H4.1v-2.9" />
                <path d="M12 7.8 9.6 9.2v2.7l2.4 1.4 2.4-1.4V9.2z" />
              </svg>
              <span>Virtual Tour</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EventsCelebration() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        introTl
          .fromTo(".wed-kicker", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" })
          .fromTo(".wed-title-line", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power4.out" }, "<+0.06")
          .fromTo(".wed-intro", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out" }, "<+0.08")
          .fromTo(".wed-pill", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }, "<+0.04");

        gsap.utils.toArray<HTMLElement>(".wed-block").forEach((block, index) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top 84%",
              once: true,
            },
          });

          tl.fromTo(
            block.querySelectorAll(".wed-media-card"),
            { y: 32, rotateY: index % 2 === 0 ? -5 : 5, autoAlpha: 0, transformPerspective: 1500 },
            { y: 0, rotateY: 0, autoAlpha: 1, duration: 0.82, ease: "power3.out" },
          )
            .fromTo(
              block.querySelectorAll(".wed-content"),
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" },
              "<+0.08",
            )
            .fromTo(
              block.querySelectorAll(".wed-chip"),
              { y: 10, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.42, stagger: 0.05, ease: "power3.out" },
              "<+0.02",
            );

          gsap.to(block, {
            yPercent: index % 2 === 0 ? -2 : 2,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55,
            },
          });
        });

        gsap.to(".wed-main-image", {
          yPercent: 6,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        gsap.to(".wed-glow-a", {
          y: -14,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".wed-glow-b", {
          y: -10,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".wed-shine", {
          xPercent: 180,
          opacity: 0.9,
          duration: 1.5,
          repeat: -1,
          repeatDelay: 2.4,
          ease: "power1.inOut",
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative overflow-hidden bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,154,85,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,59,71,0.1),transparent_26%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="wed-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            {WEDDINGS_CELEBRATION_KICKER}
          </span>
          <div className="mt-6 overflow-hidden">
            <h2 className="wed-title-line font-serif text-[2.6rem] leading-[0.95] md:text-[4.2rem]">
              {WEDDINGS_CELEBRATION_TITLE_LINES[0]}
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="wed-title-line font-serif text-[2.6rem] leading-[0.95] md:text-[4.2rem]">
              {WEDDINGS_CELEBRATION_TITLE_LINES[1]}
            </h2>
          </div>
          <p className="wed-intro mx-auto mt-6 max-w-3xl text-[0.98rem] leading-8 text-[#1f3c44]/75">
            {WEDDINGS_CELEBRATION_INTRO}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {sectionPills.map((item) => (
              <span
                key={item}
                className="wed-pill rounded-full border border-[#1f3c44]/10 bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#1f3c44]/72 shadow-[0_12px_24px_rgba(31,60,68,0.06)] backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-14">
          {WEDDINGS_CELEBRATION_BLOCKS.map((block, index) => (
            <CelebrationBlock key={block.id} block={block} index={index} />
          ))}
        </div>
      </Container>

      <style>{`
        .wed-media-card {
          transform-style: preserve-3d;
        }

        .wed-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(18px);
          opacity: 0.8;
          pointer-events: none;
        }

        .wed-glow-a {
          top: -1rem;
          right: 1.5rem;
          height: 5.5rem;
          width: 5.5rem;
          background: rgba(216, 154, 85, 0.24);
        }

        .wed-glow-b {
          bottom: 1.75rem;
          left: -0.5rem;
          height: 4rem;
          width: 4rem;
          background: rgba(31, 60, 68, 0.12);
        }

        @media (min-width: 1024px) {
          .wed-media-card {
            transform: perspective(1500px) rotateY(-1.5deg) scale(1.01);
            transition: transform 380ms ease, box-shadow 380ms ease;
          }

          .wed-block:hover .wed-media-card {
            transform: perspective(1500px) rotateY(0deg) translateY(-4px) scale(1.01);
          }
        }
      `}</style>
    </section>
  );
}
