'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.scss';

/**
 * Preloader
 * Brief loading screen on first paint with the live site's double-ring spinner
 * (no brand logo), then fades out. Skipped immediately under reduced motion.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const hide = () => {
      setDone(true);
      window.setTimeout(() => setGone(true), 500);
    };

    const timer = window.setTimeout(hide, reduce ? 0 : 650);

    const onLoad = () => {
      if (document.readyState === 'complete') {
        window.clearTimeout(timer);
        hide();
      }
    };
    window.addEventListener('load', onLoad);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.preloader} ${done ? styles.done : ''}`} role="status" aria-label="Loading page">
      <span className={styles.loader} aria-hidden="true" />
      <span className={styles.srOnly}>Loading…</span>
    </div>
  );
}
