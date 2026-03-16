"use client";

import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId = 0;

    const update = () => {
      ticking = false;
      const next = window.scrollY > 12;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return scrolled;
}
