import type { ReactNode } from 'react';
import Link from 'next/link';

export type ShowcaseMeta = {
  label: ReactNode;
  value: ReactNode;
};

export type ShowcaseAction = {
  href: string;
  label: ReactNode;
  outline?: boolean;
  external?: boolean;
};

type OutletShowcaseProps = {
  id?: string;
  reverse?: boolean;
  number: string;
  image: string;
  imageAlt: string;
  badge: ReactNode;
  eyebrow: ReactNode;
  tagline: ReactNode;
  title: ReactNode;
  description: ReactNode;
  meta: ShowcaseMeta[];
  actions: ShowcaseAction[];
};

export default function OutletShowcase({
  id,
  reverse,
  number,
  image,
  imageAlt,
  badge,
  eyebrow,
  tagline,
  title,
  description,
  meta,
  actions,
}: OutletShowcaseProps) {
  return (
    <article className={reverse ? 'outlet-showcase outlet-showcase--reverse' : 'outlet-showcase'} id={id}>
      <div className="outlet-showcase__media">
        <span className="outlet-showcase__number">{number}</span>
        <img src={image} alt={imageAlt} />
        <span className="outlet-showcase__badge">{badge}</span>
      </div>
      <div className="outlet-showcase__content">
        <span className="eyebrow">{eyebrow}</span>
        <span className="outlet-showcase__tagline">{tagline}</span>
        <h3>{title}</h3>
        <p className="outlet-showcase__desc">{description}</p>
        <div className="outlet-showcase__meta">
          {meta.map((item, index) => (
            <div className="outlet-showcase__meta-item" key={index}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
        <div className="outlet-showcase__actions">
          {actions.map((action) => {
            const className = action.outline ? 'button button--outline button--ink' : 'button';
            if (action.href.startsWith('/')) {
              return (
                <Link key={action.href} className={className} href={action.href}>
                  {action.label}
                </Link>
              );
            }
            return (
              <a
                key={action.href}
                className={className}
                href={action.href}
                {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {action.label}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
