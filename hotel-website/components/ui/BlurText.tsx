"use client";

import { useEffect, useMemo, useState } from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "chars";
  direction?: "top" | "bottom";
  onAnimationComplete?: () => void;
};

export default function BlurText({
  text,
  className,
  delay = 120,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  const parts = useMemo(
    () => (animateBy === "chars" ? Array.from(text) : text.split(" ")),
    [animateBy, text],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!onAnimationComplete || parts.length === 0) return;
    const timeout = window.setTimeout(() => {
      onAnimationComplete();
    }, (parts.length - 1) * delay + 700);

    return () => window.clearTimeout(timeout);
  }, [delay, onAnimationComplete, parts.length]);

  const initialY = direction === "top" ? 18 : -18;

  return (
    <span className={className} style={{ display: "inline-block", whiteSpace: "pre-wrap" }} aria-label={text}>
      {parts.map((part, index) => {
        const content = animateBy === "words" ? `${part}${index < parts.length - 1 ? " " : ""}` : part;
        return (
          <span
            key={`${part}-${index}`}
            aria-hidden="true"
            style={{
              display: "inline-block",
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? "blur(0px)" : "blur(10px)",
              transform: isVisible ? "translate3d(0, 0, 0)" : `translate3d(0, ${initialY}px, 0)`,
              transitionProperty: "opacity, transform, filter",
              transitionDuration: "0.7s",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: `${index * delay}ms`,
              willChange: "opacity, transform, filter",
            }}
          >
            {content === " " ? "\u00A0" : content}
          </span>
        );
      })}
    </span>
  );
}
