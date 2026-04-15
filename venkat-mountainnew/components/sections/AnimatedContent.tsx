"use client";

import type { ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";

type Direction = "vertical" | "horizontal";
type MotionEase = "linear" | "easeIn" | "easeOut" | "easeInOut" | [number, number, number, number];

type AnimatedContentProps = {
  children: ReactNode;
  distance?: number;
  direction?: Direction;
  reverse?: boolean;
  duration?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  animateOnView?: boolean;
  delay?: number;
  className?: string;
};

const GSAP_EASE_MAP: Record<string, MotionEase> = {
  "power1.out": [0.22, 1, 0.36, 1],
  "power2.out": [0.16, 1, 0.3, 1],
  "power3.out": [0.22, 1, 0.36, 1],
  "power4.out": [0.17, 0.84, 0.44, 1],
  "power1.in": [0.12, 0, 0.39, 0],
  "power2.in": [0.32, 0, 0.67, 0],
  "power3.in": [0.64, 0, 0.78, 0],
  "power4.in": [0.7, 0, 0.84, 0],
  "power1.inOut": [0.45, 0, 0.55, 1],
  "power2.inOut": [0.65, 0, 0.35, 1],
  "power3.inOut": [0.76, 0, 0.24, 1],
  "power4.inOut": [0.86, 0, 0.14, 1],
};

function normalizeEase(ease: string): MotionEase {
  const value = ease.trim();
  if (value === "linear" || value === "easeIn" || value === "easeOut" || value === "easeInOut") {
    return value;
  }
  return GSAP_EASE_MAP[value] ?? "easeOut";
}

export default function AnimatedContent({
  children,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "easeOut",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  animateOnView = false,
  delay = 0,
  className,
}: AnimatedContentProps): ReactElement {
  const signedDistance = reverse ? -distance : distance;

  const initialOffset =
    direction === "horizontal"
      ? { x: signedDistance, y: 0 }
      : { x: 0, y: signedDistance };

  const targetState = {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
  };

  return (
    <motion.div
      className={className}
      initial={{
        ...initialOffset,
        opacity: animateOpacity ? initialOpacity : 1,
        scale,
      }}
      animate={!animateOnView ? targetState : undefined}
      whileInView={animateOnView ? targetState : undefined}
      transition={{
        duration,
        ease: normalizeEase(ease),
        delay,
      }}
      viewport={
        animateOnView
          ? {
              once: true,
              amount: threshold,
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
