'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.scss';

/**
 * Preloader
 * Premium Hotel K2 branded loading screen with elegant circular spinner.
 * Skipped immediately under reduced motion.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const hide = () => {
      setDone(true);
      window.setTimeout(() => setGone(true), 600);
    };

    const timer = window.setTimeout(hide, reduce ? 0 : 1800);

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
      <div className={styles.content}>
        <div className={styles.spinner}>
          <svg className={styles.ring} viewBox="0 0 66 66">
            <circle className={styles.ringOuter} cx="33" cy="33" r="30" fill="none" strokeWidth="3" />
            <circle className={styles.ringInner} cx="33" cy="33" r="20" fill="none" strokeWidth="2" />
          </svg>
          <div className={styles.logo}>
            <span className={styles.logoText}>Hotel</span>
            <span className={styles.logoAccent}>K2</span>
          </div>
        </div>
        <div className={styles.tagline}>Chakradharpur, Jharkhand</div>
      </div>
      <span className={styles.srOnly}>Loading…</span>
    </div>
  );
}
