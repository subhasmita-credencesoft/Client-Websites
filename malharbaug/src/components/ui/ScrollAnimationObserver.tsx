'use client';

import { useEffect } from 'react';

const ANIMATED_SELECTORS = '.animate-on-scroll, .fade-in, .slide-up, .scale-in';

export default function ScrollAnimationObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(ANIMATED_SELECTORS));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
