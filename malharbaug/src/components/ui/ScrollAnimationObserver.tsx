'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ANIMATED_SELECTORS = '.animate-on-scroll, .fade-in, .slide-up, .scale-in';

export default function ScrollAnimationObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const revealAll = () => {
      const elements = document.querySelectorAll(ANIMATED_SELECTORS);
      elements.forEach((el) => {
        el.classList.add('animate');
      });
    };

    revealAll();
    const raf = requestAnimationFrame(revealAll);
    const timer = setTimeout(revealAll, 120);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
