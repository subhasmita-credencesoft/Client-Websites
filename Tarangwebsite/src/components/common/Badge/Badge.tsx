import React from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'terracotta' | 'forest' | 'neutral' | 'glass';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  className = '',
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
