"use client";

import { useEffect, useMemo, useState } from "react";

type MotionTarget = {
  opacity?: number;
  x?: number;
  y?: number;
  filter?: string;
};

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: MotionTarget;
  to?: MotionTarget;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
};

const DEFAULT_FROM: MotionTarget = { opacity: 0, y: 40 };
const DEFAULT_TO: MotionTarget = { opacity: 1, y: 0, filter: "blur(0px)" };

function resolveTransform(target: MotionTarget | undefined) {
  const x = target?.x ?? 0;
  const y = target?.y ?? 0;
  return `translate3d(${x}px, ${y}px, 0)`;
}

export default function SplitText({
  text,
  className,
  delay = 45,
  duration = 0.9,
  ease = "cubic-bezier(0.22, 1, 0.36, 1)",
  splitType = "chars",
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
  textAlign = "center",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const effectiveSplitType = splitType === "chars" && isMobileViewport ? "words" : splitType;

  const parts = useMemo(
    () => (effectiveSplitType === "words" ? text.split(" ") : Array.from(text)),
    [effectiveSplitType, text],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!showCallback || !onLetterAnimationComplete || parts.length === 0) return;
    const totalDelay = (parts.length - 1) * delay + duration * 1000;
    const timeout = window.setTimeout(() => {
      onLetterAnimationComplete();
    }, totalDelay);

    return () => window.clearTimeout(timeout);
  }, [delay, duration, onLetterAnimationComplete, parts.length, showCallback]);

  return (
    <span
      className={className}
      style={{ display: "inline-block", textAlign, whiteSpace: "pre-wrap" }}
      aria-label={text}
    >
      {parts.map((part, index) => {
        const content = effectiveSplitType === "words" ? `${part}${index < parts.length - 1 ? " " : ""}` : part;
        return (
          <span
            key={`${part}-${index}`}
            aria-hidden="true"
            style={{
              display: "inline-block",
              opacity: isVisible ? (to.opacity ?? 1) : (from.opacity ?? 0),
              filter: isVisible ? (to.filter ?? "blur(0px)") : (from.filter ?? "blur(8px)"),
              transform: isVisible ? resolveTransform(to) : resolveTransform(from),
              transitionProperty: "opacity, transform, filter",
              transitionDuration: `${duration}s`,
              transitionTimingFunction: ease,
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
