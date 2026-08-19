'use client';

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import styles from './Reveal.module.scss';

interface RevealProps {
  as?: 'div' | 'li' | 'article' | 'section' | 'figure' | 'header';
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'right' | 'left' | 'fade';
  id?: string;
}

/**
 * Reveal
 * AOS-style scroll-triggered entrance animation. Elements fade/slide into view
 * the first time they enter the viewport (IntersectionObserver). Disabled
 * entirely under `prefers-reduced-motion` (content is shown immediately).
 */
export function Reveal({
  as = 'div',
  children,
  className,
  delay = 0,
  direction = 'up',
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as ElementType;

  return createElement(
    Tag,
    {
      ref,
      id,
      className: `${styles.reveal} ${styles[direction]} ${visible ? styles.visible : ''} ${className ?? ''}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  );
}
