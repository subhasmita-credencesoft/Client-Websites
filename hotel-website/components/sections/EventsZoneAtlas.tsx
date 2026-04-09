"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  EVENTS_ZONE_ATLAS_CARDS,
  EVENTS_ZONE_ATLAS_INTRO,
  EVENTS_ZONE_ATLAS_PILLS,
} from "@/data/sections/eventsZoneAtlas";

gsap.registerPlugin(ScrollTrigger);

export default function EventsZoneAtlas() {
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
          .fromTo(".eza-kicker", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" })
          .fromTo(".eza-title", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.84, stagger: 0.08, ease: "power4.out" }, "<+0.06")
          .fromTo(".eza-copy", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.58, ease: "power3.out" }, "<+0.08")
          .fromTo(".eza-pill", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42, stagger: 0.05, ease: "power3.out" }, "<+0.04");

        gsap.utils.toArray<HTMLElement>(".eza-card").forEach((card, index) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          });

          tl.fromTo(
            card,
            { y: 34, autoAlpha: 0, rotateY: index % 2 === 0 ? -6 : 6, rotateX: 8, transformPerspective: 1500 },
            { y: 0, autoAlpha: 1, rotateY: 0, rotateX: 0, duration: 0.82, ease: "power3.out" },
          ).fromTo(
            card.querySelector(".eza-image"),
            { scale: 1.08 },
            { scale: 1, duration: 1, ease: "power3.out" },
            "<",
          );
        });

        gsap.to(".eza-float", {
          y: -12,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.15,
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="relative overflow-hidden bg-[linear-gradient(180deg,#143640_0%,#1a4652_48%,#f5efe6_48.1%,#f5efe6_100%)] py-20 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,154,85,0.18),transparent_18%),radial-gradient(circle_at_10%_30%,rgba(255,255,255,0.08),transparent_16%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="eza-kicker text-xs uppercase tracking-[0.45em] text-white/68">
            {EVENTS_ZONE_ATLAS_INTRO.kicker}
          </span>
          <div className="mt-6 overflow-hidden">
            <h2 className="eza-title font-serif text-[2.6rem] leading-[0.95] md:text-[4.1rem]">
              {EVENTS_ZONE_ATLAS_INTRO.titleLineOne}
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="eza-title font-serif text-[2.6rem] leading-[0.95] md:text-[4.1rem]">
              {EVENTS_ZONE_ATLAS_INTRO.titleLineTwo}
            </h2>
          </div>
          <p className="eza-copy mx-auto mt-6 max-w-3xl text-[0.98rem] leading-8 text-white/76">
            {EVENTS_ZONE_ATLAS_INTRO.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {EVENTS_ZONE_ATLAS_PILLS.map((item) => (
              <span
                key={item}
                className="eza-pill rounded-full border border-white/14 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/78 backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          {EVENTS_ZONE_ATLAS_CARDS.map((card) => (
            <article
              key={card.title}
              className="eza-card group relative overflow-hidden border-b border-white/14 pb-8 last:border-b-0 last:pb-0"
            >
              <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
                <div className="relative min-h-[18rem] overflow-hidden rounded-[1.7rem] sm:min-h-[21rem]">
                  <div className="eza-float absolute inset-x-8 top-5 z-10 h-20 rounded-full bg-white/22 blur-3xl" aria-hidden="true" />
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 45vw"
                    className="eza-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,37,45,0.08)_0%,rgba(15,37,45,0.32)_100%)]" />
                </div>

                <div className="flex items-center">
                  <div className="max-w-2xl">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-4 font-serif text-[2rem] leading-[0.94] text-[#153742] sm:text-[2.45rem]">
                      {card.title}
                    </h3>
                    <p className="mt-5 text-[0.98rem] leading-8 text-[#1f3c44]/78">
                      {card.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#eef2ee] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#1f3c44]/76"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <style>{`
        .eza-card {
          transform-style: preserve-3d;
        }

        @media (min-width: 1024px) {
          .eza-card {
            transition: transform 420ms ease;
          }
        }
      `}</style>
    </section>
  );
}
