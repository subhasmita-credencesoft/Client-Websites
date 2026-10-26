import Image from 'next/image';
import type { ReactNode } from 'react';

import type { ImageSource } from '@/core/types/content';

export function CatalogHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  action,
  className = '',
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: ImageSource;
  imageAlt: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rooms-hero ${className}`.trim()}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="rooms-hero__bg" />
      <div className="rooms-hero__shade-left" />
      <div className="rooms-hero__shade-bottom" />
      <div className="rooms-hero__content">
        <p className="rooms-hero__eyebrow">{eyebrow}</p>
        <h1 className="rooms-hero__heading">{title}</h1>
        <div className="rooms-hero__rule" />
        <p className="rooms-hero__intro">{intro}</p>
        {action && <div className="rooms-hero__action">{action}</div>}
      </div>
      <div className="rooms-hero__scroll-hint" aria-hidden>
        <span className="rooms-hero__scroll-line" />
        <span className="rooms-hero__scroll-label">Explore</span>
      </div>
    </section>
  );
}
