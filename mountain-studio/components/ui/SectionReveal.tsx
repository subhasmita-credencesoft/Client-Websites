"use client";

import { PropsWithChildren, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionRevealProps extends PropsWithChildren {
  className?: string;
  stagger?: number;
  direction?: "up" | "left" | "right";
  delay?: number;
}

const offsets = {
  up: { y: 32 },
  left: { x: -32 },
  right: { x: 32 },
};

export function SectionReveal({
  children,
  className,
  stagger = 0.1,
  direction = "up",
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <div ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? (children as React.ReactNode[]).map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, ...offsets[direction] }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : (
            <motion.div
              initial={{ opacity: 0, ...offsets[direction] }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {children}
            </motion.div>
          )}
    </div>
  );
}
