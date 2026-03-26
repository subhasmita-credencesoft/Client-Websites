"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeSectionContent, horizontalPanels } from "@/lib/data/resort-content";

const panelLinks: Record<string, string> = {
  "Classic Package": "/classic-package",
  "Signature Package": "/signature-package",
  "Premium Luxe Package": "/premium-luxo-package",
};

export function HorizontalJourneySection() {
  const content = homeSectionContent.horizontalJourney;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".journey-panel", track);
        const travelTween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${window.innerWidth * panels.length}`,
            pin: true,
            scrub: 1.1,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.15, max: 0.5 },
              ease: "power1.inOut",
            },
          },
        });

        panels.forEach((panel) => {
          const contentWrap = panel.querySelector<HTMLElement>("[data-panel-content]");
          const lines = panel.querySelectorAll<HTMLElement>("[data-panel-line]");

          if (contentWrap) {
            gsap.fromTo(
              contentWrap,
              {
                autoAlpha: 0,
                y: 46,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: travelTween,
                  start: "left 72%",
                  end: "left 45%",
                  scrub: 0.45,
                },
              },
            );
          }

          if (lines.length > 0) {
            gsap.fromTo(
              lines,
              {
                autoAlpha: 0,
                y: 26,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: travelTween,
                  start: "left 68%",
                  end: "left 40%",
                  scrub: 0.35,
                },
              },
            );
          }
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="signature"
      ref={sectionRef}
      data-section-id="signature"
      className="relative overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:h-[100svh] md:flex-row"
        style={{ width: `${horizontalPanels.length * 100}vw` }}
      >
        {horizontalPanels.map((panel, index) => (
          <Link
            key={panel.title}
            href={panelLinks[panel.title] ?? "/offers"}
            className="journey-panel block relative min-h-[78svh] overflow-hidden md:h-full md:w-screen"
            data-cursor="hover"
          >
            <div className="absolute inset-0 will-transform" data-zoom-scroll>
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/46 to-black/72" />
            <div
              data-panel-content
              className="relative z-10 flex h-full max-w-xl flex-col justify-end px-7 pb-16 md:px-16 md:pb-20"
            >
              <p data-panel-line className="mb-4 text-xs uppercase tracking-[0.34em] text-[#d8be99]">
                {content.prefix} 0{index + 1}
              </p>
              <h3 data-panel-line className="text-5xl leading-[1.02] text-[#f7eddc] md:text-7xl">
                {panel.title}
              </h3>
              <p data-panel-line className="mt-4 text-base text-white/72 md:text-lg">
                {panel.subtitle}
              </p>
              {"bullets" in panel && Array.isArray(panel.bullets) ? (
                <ul className="mt-6 space-y-2 text-sm leading-relaxed text-white/80 md:text-base">
                  {panel.bullets.map((bullet) => (
                    <li key={bullet} data-panel-line>
                      - {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
