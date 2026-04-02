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
        className="sticky top-5 z-30 mx-auto max-w-[96rem] rounded-t-[2rem] border border-[#c9a46e]/16 bg-[#f2ede5] px-6 pb-10 pt-7 text-[#151311] md:px-10 md:pb-14 md:pt-10"
      >
        <p
          ref={(el) => {
            textRefs.current[0] = el;
          }}
          className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9e7d4f] md:text-left"
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
          className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-[#3a342d] md:mx-0 md:text-left md:text-lg"
        >
          {homeSectionContent.about.body}
        </p>
      </div>

      {storytellingBlocks.map((block, index) => {
        const isDarkCard = index !== 1;
        const zIndexClass = index === 0 ? "z-20" : index === 1 ? "z-10" : "z-0";

        return (
          <article
            key={block.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`sticky ${index === 0 ? "top-7 -mt-7" : "top-5 -mt-7"} ${zIndexClass} rounded-t-[2rem] border border-[#c9a46e]/16 ${
              isDarkCard ? "bg-[#090909] text-white" : "bg-[#f3efe8] text-[#171411]"
            }`}
          >
            <div className="mx-auto max-w-[96rem] px-6 py-10 md:px-10 md:py-14">
              <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h3
                    ref={(el) => {
                      textRefs.current[index * 2 + 3] = el;
                    }}
                    className={`mx-auto max-w-4xl text-center text-2xl font-semibold leading-tight md:text-5xl ${
                      isDarkCard ? "text-gradient-gold" : "text-[#1a1713]"
                    }`}
                  >
                    {block.title}
                  </h3>
                  <p
                    ref={(el) => {
                      textRefs.current[index * 2 + 4] = el;
                    }}
                    className={`mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed md:text-lg ${
                      isDarkCard ? "text-white/76" : "text-[#3a342d]"
                    }`}
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
