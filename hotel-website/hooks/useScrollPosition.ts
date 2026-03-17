"use client";

import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId = 0;
    const ENTER_SCROLL_Y = 20;
    const EXIT_SCROLL_Y = 6;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y >= ENTER_SCROLL_Y) return true;
        if (prev && y <= EXIT_SCROLL_Y) return false;
        return prev;
      });
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
