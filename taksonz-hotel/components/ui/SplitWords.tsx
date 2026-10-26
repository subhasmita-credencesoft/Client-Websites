import { Fragment } from "react";
import styles from "./SplitWords.module.scss";

/**
 * Load-time word reveal in pure CSS (no JavaScript), so hero headlines are never hidden before hydration.
 * Reduced-motion users get the final state instantly via the global reduced-motion rule.
 */
export function SplitWords({ text, delay = 0.15, step = 0.08 }: { text: string; delay?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      <span>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={styles.mask}>
              <span className={styles.word} style={{ animationDelay: `${delay + i * step}s` }}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </>
  );
}
