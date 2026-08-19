import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';

interface CommonProps {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonAsButton | ButtonAsAnchor;

/**
 * Button
 * States implemented: default, hover, focus-visible, active, disabled, loading.
 * Renders as <a> when `href` is provided (e.g. "Book Now" → external booking engine),
 * otherwise as a native <button> so keyboard and AT semantics stay correct.
 */
export function Button(props: Props) {
  const { variant = 'primary', loading = false, fullWidth = false, className, children, ...rest } = props;

  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href) {
    const href: string = props.href;
    const { href: _omit, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal) {
      return (
        <Link href={href} className={classes} aria-disabled={loading || undefined} {...anchorRest}>
          {loading && <span className={styles.spinner} aria-hidden="true" />}
          <span className={styles.label}>{children}</span>
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        aria-disabled={loading || undefined}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorRest}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonRest.type ?? 'button'}
      className={classes}
      disabled={buttonRest.disabled || loading}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
