"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import styles from "./Parallax.module.scss";

/**
 * Fills its (positioned, overflow-hidden) parent and drifts the content as the page scrolls.
 * The content is over-scaled slightly so the drift never exposes an edge.
 */
export function Parallax({
  children,
  amount = 4,
  scale = 1.04,
  disabled = false,
}: {
  children: ReactNode;
  amount?: number;
  scale?: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  if (disabled) {
    return (
      <div ref={ref} className={styles.wrap}>
        <div className={styles.inner}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={styles.wrap}>
      {reduce ? <div className={styles.inner}>{children}</div> : <motion.div className={styles.inner} style={{ y, scale }}>{children}</motion.div>}
    </div>
  );
}
