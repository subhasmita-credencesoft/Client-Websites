"use client";

import { useEffect, useRef } from "react";
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

function WeddingBlock({ block }: { block: WeddingsCelebrationBlock }) {
  const media = (
    <div className="wedding-media overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
      <Image
        src={block.mediaImage}
        alt={block.mediaAlt}
        width={1400}
        height={900}
        unoptimized
        className="wedding-media-image h-full w-full object-cover"
      />
    </div>
  );

  const card = (
    <div className="wedding-card rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.16)]">
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={block.cardImage}
          alt={block.cardImageAlt}
          width={1200}
          height={800}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.06]"
        />
      </div>
      <h3 className="mt-6 font-serif text-3xl">{block.cardTitle}</h3>
      <div className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
        {block.cardParagraphs.map((paragraph, index) => (
          <p key={`${block.id}-paragraph-${index}`} className={index === 0 ? "" : "mt-4"}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href={block.enquiryHref} className="group inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#1f3c44]">
          Enquire now <span className="inline-block h-px w-7 bg-[#1f3c44] transition-all duration-300 group-hover:w-12" />
        </a>
        <a
          href={WEDDINGS_CELEBRATION_MAP_LINKS[block.virtualTourKey]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-[#d9b882] bg-[#d1ab73] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-[#e1c08c]"
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
  );

  return (
    <div className={`grid gap-10 lg:items-start ${block.layout === "media-left" ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.15fr]"}`}>
      {block.layout === "media-left" ? (
        <>
          {media}
          {card}
        </>
      ) : (
        <>
          {card}
          {media}
        </>
      )}
    </div>
  );
}

export default function WeddingsCelebration() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          ".wedding-kicker",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
        )
          .fromTo(
            ".wedding-title-line",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            {
              yPercent: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.95,
              stagger: 0.08,
              ease: "power4.out",
            },
            "<+0.06",
          )
          .fromTo(
            ".wedding-intro",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
            "<+0.08",
          )
          .fromTo(
            ".wedding-media",
            { x: -26, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
            "<+0.12",
          )
          .fromTo(
            ".wedding-card",
            { x: 26, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out", stagger: 0.08 },
            "<",
          );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom top",
            scrub: 1,
          },
        }).to(".wedding-media-image", { yPercent: 7, scale: 1.06, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="wedding-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">{WEDDINGS_CELEBRATION_KICKER}</span>
          <div className="mt-6 overflow-hidden">
            <h2 className="wedding-title-line font-serif text-4xl leading-tight md:text-5xl">{WEDDINGS_CELEBRATION_TITLE_LINES[0]}</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="wedding-title-line font-serif text-4xl leading-tight md:text-5xl">{WEDDINGS_CELEBRATION_TITLE_LINES[1]}</h2>
          </div>
          <p className="wedding-intro mt-6 text-sm leading-7 text-[#1f3c44]/75">{WEDDINGS_CELEBRATION_INTRO}</p>
        </div>

        <div className="mt-14 space-y-12">
          {WEDDINGS_CELEBRATION_BLOCKS.map((block) => (
            <WeddingBlock key={block.id} block={block} />
          ))}
        </div>
      </Container>
    </section>
  );
}
