import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';

export type CalloutAction = {
  href: string;
  label: ReactNode;
  outline?: boolean;
  external?: boolean;
  style?: CSSProperties;
};

type CalloutCTAProps = {
  id?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  body: ReactNode;
  actions: CalloutAction[];
};

export default function CalloutCTA({ id, eyebrow, title, body, actions }: CalloutCTAProps) {
  return (
    <section className="callout" id={id}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      {actions.map((action) => {
        const className = action.outline ? 'button button--outline' : 'button';
        const style = action.style ?? (action.outline ? { borderColor: 'var(--ink)', color: 'var(--ink)' } : undefined);
        if (action.href.startsWith('/')) {
          return (
            <Link key={action.href} className={className} style={style} href={action.href}>
              {action.label}
            </Link>
          );
        }
        return (
          <a
            key={action.href}
            className={className}
            style={style}
            href={action.href}
            {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {action.label}
          </a>
        );
      })}
    </section>
  );
}
