"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  WEDDINGS_IMMERSIVE_INTRO,
  WEDDINGS_IMMERSIVE_MOMENTS,
  WEDDINGS_IMMERSIVE_STATS,
} from "@/data/sections/weddingsImmersiveMoments";

gsap.registerPlugin(ScrollTrigger);

export default function WeddingsImmersiveMoments() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const introTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        introTimeline
          .fromTo(".wim-kicker", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" })
          .fromTo(".wim-title-line", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.82, stagger: 0.07, ease: "power4.out" }, "<+0.06")
          .fromTo(".wim-copy", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }, "<+0.08")
          .fromTo(".wim-stat", { y: 18, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "<+0.08");

        gsap.utils.toArray<HTMLElement>(".wim-card").forEach((card, index) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              once: true,
            },
          });

          timeline
            .fromTo(
              card,
              { y: 34, rotateY: index % 2 === 0 ? -7 : 7, rotateX: 8, autoAlpha: 0, transformPerspective: 1600 },
              { y: 0, rotateY: 0, rotateX: 0, autoAlpha: 1, duration: 0.88, ease: "power3.out" },
            )
            .fromTo(
              card.querySelector(".wim-card-image"),
              { scale: 1.12 },
              { scale: 1, duration: 1.1, ease: "power3.out" },
              "<",
            )
            .fromTo(
              card.querySelector(".wim-orbit"),
              { y: 14, autoAlpha: 0, scale: 0.85 },
              { y: 0, autoAlpha: 1, scale: 1, duration: 0.55, ease: "back.out(1.5)" },
              "<+0.16",
            );
        });

        gsap.to(".wim-float", {
          y: -14,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.18,
        });

        gsap.to(".wim-orbit", {
          y: -10,
          rotate: 4,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.12,
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
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf7f1_0%,#f3ece2_50%,#efe6da_100%)] py-20 text-[#173842]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,154,85,0.18),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(31,60,68,0.1),transparent_24%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.65),transparent_36%)]" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="wim-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
              {WEDDINGS_IMMERSIVE_INTRO.kicker}
            </span>
            <div className="mt-6 overflow-hidden">
              <h2 className="wim-title-line font-serif text-[2.6rem] leading-[0.94] md:text-[4.1rem]">
                {WEDDINGS_IMMERSIVE_INTRO.titleLineOne}
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="wim-title-line font-serif text-[2.6rem] leading-[0.94] md:text-[4.1rem]">
                {WEDDINGS_IMMERSIVE_INTRO.titleLineTwo}
              </h2>
            </div>
            <p className="wim-copy mt-6 max-w-2xl text-[1rem] leading-8 text-[#1f3c44]/76">
              {WEDDINGS_IMMERSIVE_INTRO.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {WEDDINGS_IMMERSIVE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="wim-stat rounded-[1.6rem] border border-white/65 bg-white/72 p-5 shadow-[0_18px_40px_rgba(16,33,42,0.09)] backdrop-blur-md"
              >
                <div className="font-serif text-[2.2rem] leading-none text-[#153742]">{stat.value}</div>
                <p className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#1f3c44]/66">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {WEDDINGS_IMMERSIVE_MOMENTS.map((moment, index) => (
            <article
              key={moment.title}
              className="wim-card group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/74 p-3 shadow-[0_28px_70px_rgba(16,33,42,0.12)] backdrop-blur-md"
            >
              <div className="wim-float absolute inset-x-10 top-5 h-24 rounded-full bg-[#d89a55]/14 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <div className="relative min-h-[18rem] sm:min-h-[21rem]">
                  <Image
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    unoptimized
                    className="wim-card-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f252d]/72 via-[#0f252d]/12 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-black/22 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="wim-orbit absolute bottom-5 right-5 rounded-full border border-white/55 bg-white/88 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#153742] shadow-[0_14px_24px_rgba(16,33,42,0.15)]">
                    3D Reveal
                  </div>
                </div>
              </div>

              <div className="px-3 pb-4 pt-6 sm:px-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#b17231]">
                  {moment.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-[2rem] leading-[0.95] text-[#153742]">
                  {moment.title}
                </h3>
                <p className="mt-4 text-[0.97rem] leading-8 text-[#1f3c44]/75">
                  {moment.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <style>{`
        .wim-card,
        .wim-stat {
          transform-style: preserve-3d;
        }

        @media (min-width: 1024px) {
          .wim-card:nth-child(3n + 1) {
            transform: perspective(1550px) rotateY(-5deg) rotateX(2deg);
          }

          .wim-card:nth-child(3n + 2) {
            transform: perspective(1550px) translateY(18px) rotateX(3deg);
          }

          .wim-card:nth-child(3n + 3) {
            transform: perspective(1550px) rotateY(5deg) rotateX(2deg);
          }

          .wim-card {
            transition: transform 420ms ease, box-shadow 420ms ease;
          }

          .wim-card:hover {
            transform: perspective(1550px) rotateY(0deg) rotateX(0deg) translateY(-8px);
            box-shadow: 0 34px 80px rgba(16, 33, 42, 0.18);
          }
        }
      `}</style>
    </section>
  );
}
