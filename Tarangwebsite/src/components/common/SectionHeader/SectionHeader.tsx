import React from 'react';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[align]} ${className}`}>
      {badge && (
        <div className={styles.badge}>
          {badgeIcon && <span className={styles.badgeIcon}>{badgeIcon}</span>}
          <span>{badge}</span>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
