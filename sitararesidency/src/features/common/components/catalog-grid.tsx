import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { CardItem } from '@/core/types/content';

export function CatalogCard({
  item,
  href,
  actionLabel,
  index = 0,
}: {
  item: CardItem;
  href: string;
  actionLabel: string;
  index?: number;
}) {
  const isFeatured = index === 0;
  return (
    <article className={`room-card ${isFeatured ? 'room-card--featured' : ''}`}>
      <Link href={href} className="room-card__inner" aria-label={`${actionLabel}: ${item.title}`}>
        <div className="room-card__media">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes={isFeatured ? '(max-width: 768px) 100vw, 55vw' : '(max-width: 768px) 100vw, 28vw'}
            className="room-card__img"
          />
          <div className="room-card__overlay" />
          <span className="room-card__cta-icon" aria-hidden>
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="room-card__body">
          <span className="room-card__eyebrow">{item.eyebrow}</span>
          <h2 className="room-card__title">{item.title}</h2>
          <div className="room-card__rule" />
          <p className="room-card__desc">{item.description}</p>
          {item.meta && <p className="room-card__meta">{item.meta}</p>}
          <span className="room-card__link">
            {actionLabel} <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function CatalogGrid({
  items,
  hrefFor,
  actionLabel,
  className = '',
}: {
  items: CardItem[];
  hrefFor: (slug: string) => string;
  actionLabel: string;
  className?: string;
}) {
  return (
    <section className={`rooms-grid ${className}`.trim()}>
      {items.map((item, i) => (
        <CatalogCard key={item.slug} item={item} href={hrefFor(item.slug)} actionLabel={actionLabel} index={i} />
      ))}
    </section>
  );
}
