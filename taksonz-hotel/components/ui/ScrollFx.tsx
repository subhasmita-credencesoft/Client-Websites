"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/** Hero media layer: slow zoom and drift as you scroll away from the top. */
export function HeroMediaFx({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.14]);
  return (
    <motion.div style={{ position: "absolute", inset: 0, ...(reduce ? {} : { y, scale }) }}>
      {children}
    </motion.div>
  );
}

/** Hero copy: lifts and fades as the page scrolls. */
export function HeroContentFx({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);
  const y = useTransform(scrollY, [0, 480], [0, -70]);
  return (
    <motion.div className={className} style={reduce ? undefined : { opacity, y }}>
      {children}
    </motion.div>
  );
}
