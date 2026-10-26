"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  /** "clip" unveils the block like a curtain (good for images). */
  variant?: "fade" | "clip";
}

/** Scroll-triggered fade-up. Renders static content when the user prefers reduced motion. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div", variant = "fade" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      initial={variant === "clip" ? { clipPath: "inset(0 0 100% 0)" } : { opacity: 0, y }}
      whileInView={variant === "clip" ? { clipPath: "inset(0 0 0% 0)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: variant === "clip" ? 1.2 : 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
