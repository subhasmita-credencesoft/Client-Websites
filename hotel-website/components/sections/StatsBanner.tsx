"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { STATS_BANNER_BG_IMAGE, STATS_BANNER_ITEMS } from "@/data/sections/statsBanner";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function StatsBanner() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [counts, setCounts] = useState(() => STATS_BANNER_ITEMS.map(() => 0));
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const countValuesRef = useRef(STATS_BANNER_ITEMS.map(() => 0));
  const formatted = useMemo(
    () =>
      (prefersReducedMotion ? STATS_BANNER_ITEMS.map((item) => item.value) : counts).map((value, index) => {
        const target = STATS_BANNER_ITEMS[index].value;
        const isDecimal = target % 1 !== 0;
        const display = isDecimal
          ? value.toFixed(1)
          : Math.round(value).toString();
        return `${display}${STATS_BANNER_ITEMS[index].suffix}`;
      }),
    [counts, prefersReducedMotion],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const counters = STATS_BANNER_ITEMS.map(() => ({ value: 0 }));
    const ctx = gsap.context(() => {
      gsap.set(cardRefs.current, { y: 20, autoAlpha: 0 });
      gsap.to(cardRefs.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      counters.forEach((counter, index) => {
        gsap.to(counter, {
          value: STATS_BANNER_ITEMS[index].value,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
          onUpdate: () => {
            const target = STATS_BANNER_ITEMS[index].value;
            const nextValue = target % 1 !== 0
              ? Number(counter.value.toFixed(1))
              : Math.round(counter.value);

            if (countValuesRef.current[index] === nextValue) return;

            countValuesRef.current[index] = nextValue;
            setCounts((prev) => {
              const next = [...prev];
              next[index] = nextValue;
              return next;
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const image = new window.Image();
    image.decoding = "async";
    image.src = STATS_BANNER_BG_IMAGE;
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url('${STATS_BANNER_BG_IMAGE}')`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
       <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {STATS_BANNER_ITEMS.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="space-y-2 sm:space-y-3"
            >
              <p
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}
              >
                {formatted[index]}
              </p>
              <p
                className="text-[0.68rem] uppercase tracking-[0.16em] text-white/90 sm:text-xs sm:tracking-[0.3em]"
                style={{ textShadow: "0 4px 12px rgba(0,0,0,0.45)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
