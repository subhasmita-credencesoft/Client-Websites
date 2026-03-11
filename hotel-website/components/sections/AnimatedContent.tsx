"use client";

import { type ReactNode, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedContentProps = {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "power3.out";
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
};

const easeMap: Record<NonNullable<AnimatedContentProps["ease"]>, number[]> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  "power3.out": [0.22, 1, 0.36, 1],
};

export default function AnimatedContent({
  children,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: threshold, once: true });

  const axis = direction === "vertical" ? "y" : "x";
  const offset = reverse ? distance : -distance;

  const hiddenStyle = useMemo(() => {
    const base = {
      opacity: animateOpacity ? initialOpacity : 1,
      scale,
    };
    return axis === "y" ? { ...base, y: offset } : { ...base, x: offset };
  }, [animateOpacity, axis, initialOpacity, offset, scale]);

  const visibleStyle = useMemo(() => {
    const base = {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: easeMap[ease],
      },
    };
    return axis === "y" ? { ...base, y: 0 } : { ...base, x: 0 };
  }, [axis, delay, duration, ease]);

  return (
    <motion.div ref={ref} initial={hiddenStyle} animate={inView ? visibleStyle : hiddenStyle}>
      {children}
    </motion.div>
  );
}
