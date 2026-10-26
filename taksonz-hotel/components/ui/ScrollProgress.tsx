"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import styles from "./ScrollProgress.module.scss";

/** Thin champagne bar along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 });
  if (reduce) return null;
  return <motion.div aria-hidden className={styles.bar} style={{ scaleX }} />;
}
