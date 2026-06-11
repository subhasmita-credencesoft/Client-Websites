"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Armchair, Soup, Users } from "lucide-react";
import { DINING_MOOD_SLIDES } from "../../data/sections/diningMoodSlider";
import useSafeInterval from "@/hooks/useSafeInterval";

gsap.registerPlugin(ScrollTrigger);

function getRelativeOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function DiningMoodSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef<HTMLElement | null>(null);

  useSafeInterval(() => {
    setActiveIndex((prev) => (prev + 1) % DINING_MOOD_SLIDES.length);
  }, 3400, DINING_MOOD_SLIDES.length > 0);

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
          ".dining-mood-stage",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
        ).fromTo(".dining-mood-strip", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }, "<+0.05");

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "bottom top",
            scrub: 1,
          },
        }).to(".dining-mood-slide-image", { yPercent: 7, scale: 1.06, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative overflow-hidden bg-[#f6f3ed] py-16 text-white md:py-24">
      <div className="dining-mood-stage mx-auto w-full max-w-[1920px] px-3 sm:px-6 lg:px-8">
        <div className="relative h-[320px] md:hidden">
          <article className="absolute inset-0 overflow-hidden rounded-[18px] bg-[#b4aea5]">
            <Image
              src={DINING_MOOD_SLIDES[activeIndex].src}
              alt={DINING_MOOD_SLIDES[activeIndex].label}
              fill
              sizes="100vw"
              className="dining-mood-slide-image object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/25" />
          </article>
        </div>

        <div className="relative hidden h-[540px] md:block lg:h-[620px]">
          {DINING_MOOD_SLIDES.map((slide, index) => {
            const offset = getRelativeOffset(index, activeIndex, DINING_MOOD_SLIDES.length);
            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 1;

            const x = offset === 0 ? 0 : offset < 0 ? -820 : 820;
            const width = offset === 0 ? 980 : 520;
            const height = offset === 0 ? 560 : 390;
            const scale = offset === 0 ? 1 : 0.96;

            return (
              <motion.article
                key={slide.src}
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity: isVisible ? 1 : 0,
                  width,
                  height,
                }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] bg-[#b4aea5]"
                style={{
                  zIndex: offset === 0 ? 30 : 20 - absOffset,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 520px, 980px"
                  className="dining-mood-slide-image object-cover"
                  priority={index === activeIndex}
                />
                <div className="absolute inset-0 bg-black/25" />
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="dining-mood-strip mx-auto mt-8 grid max-w-6xl gap-3 px-3 sm:grid-cols-3 sm:px-6 lg:px-8">
        {[
          { icon: Soup, label: "Multi-cuisine menu", href: "https://bookonelocal.in/cdn/ukresortmenu.pdf" },
          { icon: Armchair, label: "Indoor & outdoor seating" },
          { icon: Users, label: "Groups & corporates welcome" },
        ].map((item) => {
          const { icon: Icon, label, href } = item;
          const content = (
            <>
              <Icon className="h-5 w-5 text-[#c78946]" aria-hidden="true" />
              <span className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#1f3c44]/80">
                {label}
              </span>
            </>
          );
          return href ? (
            <a
              key={label}
              href={href}
              download
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl border border-[#1f3c44]/10 bg-white/75 px-5 py-4 text-center text-[#1f3c44] shadow-[0_14px_32px_rgba(31,60,68,0.06)] hover:bg-white hover:border-[#c78946]/40 transition-colors"
            >
              {content}
            </a>
          ) : (
            <div
              key={label}
              className="flex items-center justify-center gap-3 rounded-2xl border border-[#1f3c44]/10 bg-white/75 px-5 py-4 text-center text-[#1f3c44] shadow-[0_14px_32px_rgba(31,60,68,0.06)]"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
