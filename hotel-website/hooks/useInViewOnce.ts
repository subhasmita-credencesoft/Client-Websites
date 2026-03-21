"use client";

import { useEffect, useRef, useState } from "react";

type InViewOnceOptions = {
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
};

export default function useInViewOnce<T extends Element>({
  rootMargin = "260px 0px",
  threshold = 0.01,
  enabled = true,
}: InViewOnceOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled || inView) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, inView, rootMargin, threshold]);

  return { ref, inView };
}
