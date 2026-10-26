"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts up to `to` once visible. Shows the final number immediately for reduced motion / no-JS. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    setValue(0);
    const controls = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <span aria-hidden>{value.toLocaleString("en-IN")}{suffix}</span>
    </span>
  );
}
