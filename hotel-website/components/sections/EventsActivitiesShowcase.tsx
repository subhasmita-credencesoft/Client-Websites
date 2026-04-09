"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { WEDDINGS_MEETING_CARDS } from "@/data/sections/eventsActivitiesShowcase";

gsap.registerPlugin(ScrollTrigger);

const meetingPills = [
  "Dining Support",
  "Indoor Leisure",
  "Corporate Comfort",
  "Family Flow",
] as const;

export default function EventsActivitiesShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        tl.fromTo(".meet-kicker", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" })
          .fromTo(".meet-title", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.85, ease: "power4.out" }, "<+0.06")
          .fromTo(".meet-copy", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out" }, "<+0.08")
          .fromTo(".meet-pill", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42, stagger: 0.05, ease: "power3.out" }, "<+0.04")
          .fromTo(".meet-card", { y: 28, rotateX: 10, autoAlpha: 0, transformPerspective: 1400 }, { y: 0, rotateX: 0, autoAlpha: 1, duration: 0.72, stagger: 0.08, ease: "power3.out" }, "<+0.1");

        gsap.to(".meet-card-image", {
          yPercent: -7,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to(".meet-glow", {
          y: -10,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.16,
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative overflow-hidden bg-[#f1ece3] py-20 text-[#1f3c44]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,154,85,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(20,59,71,0.10),transparent_26%)]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="meet-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            Event Support
          </span>
          <div className="overflow-hidden">
            <h2 className="meet-title mt-6 font-serif text-[2.6rem] leading-[0.95] md:text-[4.1rem]">
              Everything around the event feels easier too
            </h2>
          </div>
          {/* <p className="meet-copy mx-auto mt-5 max-w-3xl text-[0.98rem] leading-8 text-[#1f3c44]/75">
            This section now focuses on support layers like dining, indoor options, family comfort, and corporate suitability so it doesn&apos;t repeat the same activity content from the section above.
          </p> */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {meetingPills.map((item) => (
              <span
                key={item}
                className="meet-pill rounded-full border border-[#1f3c44]/10 bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#1f3c44]/72 shadow-[0_12px_24px_rgba(31,60,68,0.06)] backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          {WEDDINGS_MEETING_CARDS.map((card, index) => (
            <article
              key={card.title}
              className="meet-card group relative overflow-hidden border-b border-[#1f3c44]/10 pb-8 last:border-b-0 last:pb-0"
            >
              <div className="meet-glow absolute right-5 top-5 z-10 h-20 w-20 rounded-full bg-[#d89a55]/18 blur-2xl" />
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className={`relative min-h-[18rem] overflow-hidden rounded-[1.7rem] sm:min-h-[22rem] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 55vw"
                    className="meet-card-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,37,45,0.36)_0%,rgba(15,37,45,0.10)_100%)]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-black/20 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className={`flex items-center p-1 pt-6 sm:p-2 sm:pt-6 lg:p-0 ${index % 2 === 1 ? "lg:order-1 lg:pr-10" : "lg:pl-10"}`}>
                  <div className="max-w-xl">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#b17231]">
                      Experience Track
                    </p>
                    <h3 className="mt-4 font-serif text-[2.2rem] leading-[0.94] text-[#153742] sm:text-[2.7rem]">
                      {card.title}
                    </h3>
                    <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#d89a55] to-transparent" />
                    <p className="mt-5 text-[0.98rem] leading-8 text-[#1f3c44]/78">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <style>{`
        .meet-card {
          transform-style: preserve-3d;
        }

        @media (min-width: 1024px) {
          .meet-card {
            transition: transform 380ms ease;
          }
        }
      `}</style>
    </section>
  );
}
