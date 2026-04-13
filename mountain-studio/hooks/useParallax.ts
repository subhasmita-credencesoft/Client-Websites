"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";

export function useParallax(speed = 0.2) {
  const { scrollY } = useScroll();
  const translate = useTransform(scrollY, (value) => value * speed);
  return useSpring(translate, { stiffness: 80, damping: 18, mass: 0.3 });
}
