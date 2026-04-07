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
} from "@/data/sections/weddingsCelebration";

gsap.registerPlugin(ScrollTrigger);

const sectionPills = [
  "Destination Weddings",
  "Family Picnics",
  "Sports Events",
] as const;

function CelebrationBlock({ block, index }: { block: WeddingsCelebrationBlock; index: number }) {
  const reverse = block.layout === "media-right";

  return (
    <article
      className={`wed-block grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
    >
      <div className="wed-media-wrap relative">
        <div className="wed-glow wed-glow-a" aria-hidden="true" />
        <div className="wed-glow wed-glow-b" aria-hidden="true" />

        <div className="wed-media-card relative overflow-hidden rounded-[2rem] bg-[#ddd3c4] shadow-[0_30px_70px_rgba(16,33,42,0.18)]">
          <div className="relative min-h-[20rem] sm:min-h-[26rem] lg:min-h-[34rem]">
            <Image
              src={block.mediaImage}
              alt={block.mediaAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 760px"
              unoptimized
              className="wed-main-image object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f252d]/62 via-[#0f252d]/12 to-transparent" />
            <div className="wed-shine absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0" />

            <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-black/20 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="wed-thumb-card absolute -bottom-6 right-4 w-[42%] overflow-hidden rounded-[1.4rem] border border-white/60 bg-white p-2 shadow-[0_24px_54px_rgba(16,33,42,0.22)] sm:right-6 sm:w-[34%] lg:-bottom-8 lg:right-8 lg:w-[32%]">
          <div className="overflow-hidden rounded-[1rem]">
            <Image
              src={block.cardImage}
              alt={block.cardImageAlt}
              width={900}
              height={700}
              unoptimized
              className="w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
            />
          </div>
        </div>
      </div>

      <div className="wed-copy-card rounded-[2rem] border border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#faf6ee_100%)] p-6 shadow-[0_22px_56px_rgba(16,33,42,0.10)] sm:p-8 lg:p-9">
        <div className="inline-flex rounded-full bg-[var(--surface-3)] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Signature Experience
        </div>

        <h3 className="mt-5 max-w-[13ch] font-serif text-[2.15rem] leading-[0.92] text-[#153742] sm:text-[2.6rem]">
          {block.cardTitle}
        </h3>

        <div className="mt-5 h-px w-18 bg-gradient-to-r from-[#d89a55] to-transparent" />

        <div className="mt-5 space-y-4 text-[0.96rem] leading-8 text-[#1f3c44]/74">
          {block.cardParagraphs.map((paragraph, paragraphIndex) => (
            <p
              key={`${block.id}-${paragraphIndex}`}
              className={paragraphIndex === 0 ? "font-medium text-[#1f3c44]/84" : ""}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={block.enquiryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#1f3c44]/14 bg-white px-5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#1f3c44] transition hover:border-[#1f3c44]/28 hover:bg-[#f6f1e7]"
          >
            Enquire now
          </a>
          <a
            href={WEDDINGS_CELEBRATION_MAP_LINKS[block.virtualTourKey]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#d9b882] bg-[#d1ab73] px-5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-[#e1c08c]"
            aria-label={block.virtualTourAriaLabel}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 12a7.5 7.5 0 0 1 12.62-5.43" />
              <path d="M19.5 12a7.5 7.5 0 0 1-12.62 5.43" />
              <path d="M17 3.5h2.9v2.9" />
              <path d="M7 20.5H4.1v-2.9" />
              <path d="M12 7.8 9.6 9.2v2.7l2.4 1.4 2.4-1.4V9.2z" />
            </svg>
            <span>Take a Virtual Tour</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function WeddingsCelebration() {
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

        gsap.utils.toArray<HTMLElement>(".wed-block").forEach((block) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top 82%",
              once: true,
            },
          });

          tl.fromTo(
            block.querySelectorAll(".wed-media-card"),
            { x: -24, rotateY: -6, autoAlpha: 0, transformPerspective: 1400 },
            { x: 0, rotateY: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
          )
            .fromTo(
              block.querySelectorAll(".wed-thumb-card"),
              { y: 18, rotate: -4, scale: 0.92, autoAlpha: 0, transformPerspective: 1400 },
              { y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.68, ease: "power3.out" },
              "<+0.08",
            )
            .fromTo(
              block.querySelectorAll(".wed-copy-card"),
              { x: 24, rotateY: 6, autoAlpha: 0, transformPerspective: 1400 },
              { x: 0, rotateY: 0, autoAlpha: 1, duration: 0.84, ease: "power3.out" },
              "<-0.22",
            );
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

        gsap.to(".wed-thumb-card", {
          y: -8,
          rotate: 1.5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
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

        <div className="mt-16 space-y-16">
          {WEDDINGS_CELEBRATION_BLOCKS.map((block, index) => (
            <CelebrationBlock key={block.id} block={block} index={index} />
          ))}
        </div>
      </Container>

      <style>{`
        .wed-media-card,
        .wed-thumb-card,
        .wed-copy-card {
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
            transform: perspective(1500px) rotateY(-2deg);
            transition: transform 380ms ease, box-shadow 380ms ease;
          }

          .wed-copy-card {
            transform: perspective(1500px) rotateY(2deg);
            transition: transform 380ms ease, box-shadow 380ms ease;
          }

          .wed-thumb-card {
            transform: perspective(1500px) rotateY(7deg) rotateX(-2deg);
            transition: transform 380ms ease, box-shadow 380ms ease;
          }

          .wed-block:hover .wed-media-card {
            transform: perspective(1500px) rotateY(0deg) translateY(-4px);
          }

          .wed-block:hover .wed-copy-card {
            transform: perspective(1500px) rotateY(0deg) translateY(-4px);
          }

          .wed-block:hover .wed-thumb-card {
            transform: perspective(1500px) rotateY(0deg) rotateX(0deg) translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}
