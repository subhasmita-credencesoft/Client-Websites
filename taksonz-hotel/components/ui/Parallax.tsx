"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import styles from "./Parallax.module.scss";

/**
 * Fills its (positioned, overflow-hidden) parent and drifts the content as the page scrolls.
 * The content is over-scaled slightly so the drift never exposes an edge.
 */
export function Parallax({ children, amount = 8, scale = 1.18 }: { children: ReactNode; amount?: number; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={styles.wrap}>
      {reduce ? <div className={styles.inner}>{children}</div> : <motion.div className={styles.inner} style={{ y, scale }}>{children}</motion.div>}
    </div>
  );
}
