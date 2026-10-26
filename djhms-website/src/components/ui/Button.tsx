import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Button.module.scss';

type Variant = 'gold' | 'outline' | 'navy' | 'block';

interface CommonProps {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps & { href: string; external?: boolean };
type NativeProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: AnchorProps | NativeProps) {
  const { variant = 'gold', arrow = false, className, children } = props;
  const cls = `${styles.button} ${styles[variant]} ${className ?? ''}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrow" size={16} />}
    </>
  );

  if (props.href !== undefined) {
    const { href, external } = props as AnchorProps;
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }

  const { variant: _v, arrow: _a, className: _c, children: _ch, href: _h, ...rest } = props as NativeProps;
  return (
    <button type="button" {...rest} className={cls}>
      {content}
    </button>
  );
}
