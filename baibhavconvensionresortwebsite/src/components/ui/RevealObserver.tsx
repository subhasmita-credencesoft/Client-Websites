'use client';

import { useEffect } from 'react';

const STAGGER_STEP = 80;

export default function RevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = (element: HTMLElement) => {
      let delay = 0;
      if (element.hasAttribute('data-reveal-stagger')) {
        const parent = element.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((child) =>
            child.hasAttribute('data-reveal')
          );
          delay = siblings.indexOf(element) * STAGGER_STEP;
        }
      }
      element.style.setProperty('--reveal-delay', `${delay}ms`);
      element.classList.add('is-revealed');
    };

    if (typeof IntersectionObserver === 'undefined' || reduceMotion) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
    );

    const scan = () => {
      const pending = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
      pending.forEach((el) => observer.observe(el));
    };

    scan();

    // Fallback timer to ensure content is never stuck hidden at opacity 0
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          reveal(el);
        }
      });
    }, 400);

    const mutation = new MutationObserver(() => scan());
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
