"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeSectionContent, storytellingBlocks } from "@/lib/data/content/resort-content";

export function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const textRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 8%",
            end: "bottom 6%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      cardRefs.current.forEach((card) => {
        if (!card) return;

        gsap.to(card, {
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 8%",
            end: "bottom 6%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      textRefs.current.forEach((element) => {
        if (!element) return;

        gsap.fromTo(
          element,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 72%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      data-section-id="story"
      className="mt-10 w-full bg-black"
    >
      <div
        ref={headingRef}
        className="z-30 mx-auto max-w-[96rem] rounded-t-[2rem] border border-[#c9a46e]/16 bg-[linear-gradient(180deg,#17120f_0%,#1f1812_100%)] px-5 pb-8 pt-6 text-[#f4ead9] shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:sticky md:top-5 md:px-10 md:pb-14 md:pt-10"
      >
        <p
          ref={(el) => {
            textRefs.current[0] = el;
          }}
          className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#c89a55] md:text-left"
        >
          The Mountain, Karjat
        </p>
        <h2
          ref={(el) => {
            textRefs.current[1] = el;
          }}
          className="mx-auto mt-4 max-w-4xl text-center text-3xl leading-tight md:mx-0 md:text-left md:text-6xl"
        >
          One Private Estate For Every Celebration
        </h2>
        <p
          ref={(el) => {
            textRefs.current[2] = el;
          }}
          className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/74 md:mx-0 md:text-left md:text-lg"
        >
          {homeSectionContent.about.body}
        </p>
      </div>

      {storytellingBlocks.map((block, index) => {
        const zIndexClass = index === 0 ? "z-20" : index === 1 ? "z-10" : "z-0";

        return (
          <article
            key={block.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`${index === 0 ? "md:top-7 -mt-7" : "md:top-5 -mt-7"} ${zIndexClass} rounded-t-[2rem] border border-[#c9a46e]/16 bg-[linear-gradient(180deg,#15110e_0%,#1b1511_100%)] text-white shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:sticky`}
          >
            <div className="mx-auto max-w-[96rem] px-5 py-8 md:px-10 md:py-14">
              <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h3
                    ref={(el) => {
                      textRefs.current[index * 2 + 3] = el;
                    }}
                    className="mx-auto max-w-4xl text-center text-2xl font-semibold leading-tight text-gradient-gold md:text-5xl"
                  >
                    {block.title}
                  </h3>
                  <p
                    ref={(el) => {
                      textRefs.current[index * 2 + 4] = el;
                    }}
                    className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/76 md:text-lg"
                  >
                    {block.description}
                  </p>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="overflow-hidden rounded-[1.8rem]">
                    <div className="relative h-[58vw] min-h-[16rem] md:h-[34rem]">
                      <Image
                        src={block.image}
                        alt={block.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 52vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.12)_0%,rgba(10,10,10,0.22)_45%,rgba(10,10,10,0.48)_100%)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
