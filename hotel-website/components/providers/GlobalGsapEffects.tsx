"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalGsapEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timers: number[] = [];
    let ctx: gsap.Context | null = null;
    let raf = 0;

    const init = () => {
      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>("main section:not([data-no-global-gsap])");

        sections.forEach((section, index) => {
          ScrollTrigger.create({
            id: `global-section-${pathname}-${index}`,
            trigger: section,
            start: "top 82%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                section,
                { y: 24, autoAlpha: 0.001 },
                {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                overwrite: "auto",
                },
              );
            },
          });

          const textTargets = section.querySelectorAll<HTMLElement>(
            "h2, h3, p, [data-global-gsap-text]",
          );

          if (textTargets.length) {
            ScrollTrigger.create({
              id: `global-text-${pathname}-${index}`,
              trigger: section,
              start: "top 78%",
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  textTargets,
                  { y: 16, autoAlpha: 0 },
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.03,
                    overwrite: "auto",
                  },
                );
              },
            });
          }
        });
      });

      ScrollTrigger.refresh();
    };

    const startInit = () => {
      raf = window.requestAnimationFrame(() => {
        // Delay init slightly so lazy SSR chunks can hydrate before GSAP mutates DOM.
        const t = window.setTimeout(init, 280);
        timers.push(t);
      });
    };

    if (document.readyState === "complete") {
      startInit();
    } else {
      const onLoad = () => startInit();
      window.addEventListener("load", onLoad, { once: true });
      timers.push(window.setTimeout(startInit, 1000));
    }

    return () => {
      window.cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
      timers.forEach((t) => window.clearTimeout(t));
      ScrollTrigger.getAll().forEach((trigger) => {
        const id = String(trigger.vars.id ?? "");
        if (id.startsWith("global-section-") || id.startsWith("global-text-")) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  return null;
}
