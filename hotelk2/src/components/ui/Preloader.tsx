'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.scss';

/**
 * Preloader
 * Hotel K2 branded loading screen with double-ring spinner, then fades out.
 * Skipped immediately under reduced motion.
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

    const timer = window.setTimeout(hide, reduce ? 0 : 1200);

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
      <div className={styles.brand} aria-hidden="true">
        <span className={styles.brandName}>Hotel</span>
        <span className={styles.brandAccent}>K2</span>
      </div>
      <span className={styles.loader} aria-hidden="true" />
      <span className={styles.srOnly}>Loading…</span>
    </div>
  );
}
