import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { CardItem } from '@/shared/types/content';

export function CardsBand({
  eyebrow,
  heading,
  actionLabel,
  actionHref,
  items,
  cardHref,
  variant = 'default',
}: {
  eyebrow: string;
  heading: string;
  actionLabel: string;
  actionHref: string;
  items: CardItem[];
  cardHref: (slug: string) => string;
  variant?: 'default' | 'offers';
}) {
  const isRooms = variant === 'default';
  return (
    <section className={`premium-band ${isRooms ? 'premium-band--rooms' : 'premium-band--offers'}`}>
      {/* Header row */}
      <div className="premium-band__header">
        <div className="premium-band__header-left">
          <span className="premium-band__eyebrow">{eyebrow}</span>
          <h2 className="premium-band__heading">{heading}</h2>
        </div>
        <Link href={actionHref} className="premium-band__view-all">
          {actionLabel} <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Cards */}
      <div className={`premium-band__grid ${isRooms ? 'premium-band__grid--rooms' : ''}`}>
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={cardHref(item.slug)}
            data-testid={`card-${item.slug}`}
            className={`premium-card ${i === 0 && isRooms ? 'premium-card--tall' : ''}`}
          >
            <div className="premium-card__media">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="image-fade object-cover"
              />
              <div className="premium-card__gradient" />
            </div>
            <div className="premium-card__body">
              <span className="premium-card__num">0{i + 1}</span>
              <span className="premium-card__eyebrow">{item.eyebrow}</span>
              <h3 className="premium-card__title">{item.title}</h3>
              {item.meta && <span className="premium-card__meta">{item.meta}</span>}
              <span className="premium-card__arrow" aria-hidden>
                <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
