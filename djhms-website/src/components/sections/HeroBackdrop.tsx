'use client';

import { useEffect, useRef } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import styles from './Hero.module.scss';

interface Layer {
  src: string;
  fallback: string;
}

interface Props {
  /** Back-to-front. One photo is enough; extra transparent layers add parallax depth. */
  layers: Layer[];
}

// How far each depth layer travels (px) for pointer movement and scroll.
const DEPTH = [
  { pointer: 14, scroll: 0.18 },
  { pointer: 26, scroll: 0.28 },
  { pointer: 42, scroll: 0.42 },
] as const;

/** Cinematic hero: three transparent depth layers with parallax, on top of a slow Ken-Burns zoom. */
export function HeroBackdrop({ layers }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let scroll = 0;
    let px = 0;
    let py = 0;
    let raf = 0;
    const paint = () => {
      raf = 0;
      refs.current.forEach((el, i) => {
        const d = DEPTH[i];
        if (!el || !d) return;
        el.style.transform = `translate3d(${px * d.pointer}px, ${py * d.pointer * 0.6 + scroll * d.scroll}px, 0)`;
      });
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onScroll = () => {
      scroll = Math.min(window.scrollY, 900);
      queue();
    };
    const onMove = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth - 0.5) * -1;
      py = (e.clientY / window.innerHeight - 0.5) * -1;
      queue();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.parallax} aria-hidden="true">
      <div className={styles.zoom}>
        {layers.map((l, i) => (
          <div
            key={l.src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={styles.layer}
          >
            <SmartImage src={l.src} fallback={l.fallback} alt="" fill priority={i < 2} quality={90} sizes="100vw" className={styles.bg} />
          </div>
        ))}
      </div>
    </div>
  );
}
