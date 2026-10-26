"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./ScrollMarquee.module.scss";

/** Large serif words that glide sideways as you scroll past. Decorative, so hidden from assistive tech. */
export function ScrollMarquee({ words }: { words: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-28%"]);
  const row = words.map((w, i) => (
    <span key={i} className={styles.item}>
      {w}
      <i className={styles.dot} />
    </span>
  ));
  return (
    <div ref={ref} className={styles.band} aria-hidden>
      <motion.div className={styles.track} style={reduce ? undefined : { x }}>
        {row}{row}{row}
      </motion.div>
    </div>
  );
}
