'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import styles from './ScrollToTop.module.scss';

/**
 * ScrollToTop
 * Floating button that appears after scrolling, smooth-scrolls back to the top.
 * Respects `prefers-reduced-motion`. Removed from the tab order until visible.
 */
export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${show ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      tabIndex={show ? 0 : -1}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
