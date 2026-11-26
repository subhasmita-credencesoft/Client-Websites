import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconRight,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const combinedClasses = `${styles.btn} ${styles[variant]} ${styles[size]} ${
    fullWidth ? styles.fullWidth : ''
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {icon && <span className={styles.iconLeft}>{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && <span className={styles.iconLeft}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
}
