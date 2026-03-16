"use client";

import { type ReactElement, type ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Direction = "vertical" | "horizontal";

type AnimatedContentProps = {
  children: ReactNode;
  distance?: number;
  direction?: Direction;
  reverse?: boolean;
  duration?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  animateOnView?: boolean;
  delay?: number;
  className?: string;
};

const EASE_MAP: Record<string, string> = {
  linear: "linear",
  easeIn: "cubic-bezier(0.42, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.58, 1)",
  easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
  "power1.out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "power2.out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "power3.out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "power4.out": "cubic-bezier(0.17, 0.84, 0.44, 1)",
  "power1.in": "cubic-bezier(0.12, 0, 0.39, 0)",
  "power2.in": "cubic-bezier(0.32, 0, 0.67, 0)",
  "power3.in": "cubic-bezier(0.64, 0, 0.78, 0)",
  "power4.in": "cubic-bezier(0.7, 0, 0.84, 0)",
  "power1.inOut": "cubic-bezier(0.45, 0, 0.55, 1)",
  "power2.inOut": "cubic-bezier(0.65, 0, 0.35, 1)",
  "power3.inOut": "cubic-bezier(0.76, 0, 0.24, 1)",
  "power4.inOut": "cubic-bezier(0.86, 0, 0.14, 1)",
};

function normalizeEase(value: string): string {
  const key = value.trim();
  return EASE_MAP[key] ?? EASE_MAP.easeOut;
}

export default function AnimatedContent({
  children,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "easeOut",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  animateOnView = false,
  delay = 0,
  className,
}: AnimatedContentProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const translate = reverse ? -distance : distance;
  const initialTransform =
    direction === "horizontal" ? `translateX(${translate}px) scale(${scale})` : `translateY(${translate}px) scale(${scale})`;

  useEffect(() => {
    if (!animateOnView) {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOnView, threshold]);

  const style = useMemo(
    () => ({
      opacity: revealed ? 1 : animateOpacity ? initialOpacity : 1,
      transform: revealed ? "translate3d(0,0,0) scale(1)" : initialTransform,
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}s`,
      transitionTimingFunction: normalizeEase(ease),
      transitionDelay: `${delay}s`,
      willChange: "opacity, transform",
    }),
    [revealed, animateOpacity, initialOpacity, initialTransform, duration, ease, delay],
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
