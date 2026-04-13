"use client";

import { PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@/hooks/useGSAP";

interface SectionRevealProps extends PropsWithChildren {
  className?: string;
  stagger?: number;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export function SectionReveal({
  children,
  className,
  stagger = 0.1,
  direction = "up",
  delay = 0
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    ref,
    () => {
      if (!ref.current) {
        return;
      }

      const offset =
        direction === "left" ? { x: -32 } : direction === "right" ? { x: 32 } : { y: 32 };

      const items = Array.from(ref.current.children);
      items.forEach((item) => {
        (item as HTMLElement).style.opacity = "0";
      });

      import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
        gsap.fromTo(
          items,
          { opacity: 0, ...offset },
          {
            opacity: 1,
            x: 0,
            y: 0,
            delay,
            stagger,
            duration: 0.9,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%"
            }
          }
        );
      });
    },
    [direction, delay, stagger]
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
