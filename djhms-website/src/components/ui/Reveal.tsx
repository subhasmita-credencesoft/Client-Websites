'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import styles from './Reveal.module.scss';

interface RevealProps {
  as?: ElementType;
  variant?: 'up' | 'left' | 'right' | 'zoom';
  delay?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}

/** Fades/slides content in once when it scrolls into view. Content stays visible without JS. */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className, id, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return setShown(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  return (
    <Tag ref={ref} id={id} style={style} className={`${styles.reveal} ${styles[variant]} ${shown ? styles.in : ''} ${className ?? ''}`}>
      {children}
    </Tag>
  );
}
