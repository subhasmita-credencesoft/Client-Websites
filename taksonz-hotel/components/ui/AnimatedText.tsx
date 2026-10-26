"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import styles from "./AnimatedText.module.scss";

interface Props {
  text: string;
  delay?: number;
  stagger?: number;
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word: Variants = {
  hidden: { y: "108%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/** Words rise out of a mask as the text scrolls into view. Plain text for reduced motion; the words stay real text, so screen readers and search engines read the sentence normally. */
export function AnimatedText({ text, delay = 0, stagger = 0.055 }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
  const words = text.split(" ");
  return (
    <>
      <motion.span
        className={styles.line}
        variants={container(delay, stagger)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={styles.mask}>
              <motion.span className={styles.word} variants={word}>{w}</motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </motion.span>
    </>
  );
}
