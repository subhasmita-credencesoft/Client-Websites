"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const stats = [
  { value: 524, suffix: "", label: "luxury rooms" },
  { value: 74, suffix: "k", label: "guests" },
  { value: 1.8, suffix: "k", label: "five star ratings" },
  { value: 2.5, suffix: "m", label: "served breakfast" },
];

export default function StatsBanner() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const formatted = useMemo(
    () =>
      counts.map((value, index) => {
        const target = stats[index].value;
        const isDecimal = target % 1 !== 0;
        const display = isDecimal
          ? value.toFixed(1)
          : Math.round(value).toString();
        return `${display}${stats[index].suffix}`;
      }),
    [counts],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCounts(stats.map((stat) => stat.value));
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const counters = stats.map(() => ({ value: 0 }));
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
          value: stats[index].value,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
          onUpdate: () => {
            setCounts((prev) => {
              const next = [...prev];
              next[index] = counter.value;
              return next;
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_imgbox1.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
       <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {stats.map((stat, index) => (
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
