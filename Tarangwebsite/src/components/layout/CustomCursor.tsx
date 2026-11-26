'use client';

import React, { useEffect, useState } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a, button, input, select, textarea, [role="button"], .clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.cursor} ${isHovered ? styles.hovered : ''} ${
        isPressed ? styles.pressed : ''
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    />
  );
}
