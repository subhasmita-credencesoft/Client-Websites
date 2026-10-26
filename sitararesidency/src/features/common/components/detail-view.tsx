import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarCheck } from 'lucide-react';

import { detailFor } from '@/features/common/data/detail-registry';
import type { DetailContent, DetailKind } from '@/core/types/content';
import { BookButton } from '@/features/booking';
import { DetailFacts } from './detail-facts';

export function DetailView({
  kind,
  slug,
  detail,
}: {
  kind: DetailKind;
  slug: string;
  detail?: DetailContent;
}) {
  const content = detail ?? detailFor(kind, slug);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="room-detail-hero">
        <div className="room-detail-hero__media">
          <Image
            src={content.image}
            alt={content.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="room-detail-hero__media-overlay" />
        </div>

        <div className="room-detail-hero__copy">
          <span className="room-detail-hero__eyebrow">{content.eyebrow}</span>
          <h1 className="room-detail-hero__title">{content.title}</h1>
          <div className="room-detail-hero__rule" />
          <p className="room-detail-hero__intro">{content.intro}</p>
          <BookButton
            testId="button-detail-book"
            className="room-detail-hero__cta"
          >
            <CalendarCheck size={16} strokeWidth={1.5} />
            Book this stay
          </BookButton>
        </div>
      </section>

      {/* ── Editorial body ── */}
      <section className="room-detail-body">
        <div className="room-detail-body__grid">
          <div className="room-detail-body__prose">
            {content.paragraphs.map((p, i) => (
              <p key={i} className="room-detail-body__paragraph">
                {p}
              </p>
            ))}

            {content.facilities && content.facilities.length > 0 && (
              <div className="room-detail-facilities">
                <h3 className="room-detail-facilities__title">Room features</h3>
                <ul className="room-detail-facilities__list">
                  {content.facilities.map((facility) => (
                    <li key={facility} className="room-detail-facilities__item">
                      <span className="room-detail-facilities__bullet" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.rates && content.rates.length > 0 && (
              <div className="room-detail-rates">
                <h3 className="room-detail-rates__title">Available plans</h3>
                <div className="room-detail-rates__list">
                  {content.rates.map((rate) => (
                    <div key={rate.name} className="room-detail-rates__row">
                      <span className="room-detail-rates__name">{rate.name}</span>
                      <span className="room-detail-rates__amount">{rate.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="room-detail-body__aside">
            <DetailFacts facts={content.facts} />

            <div className="room-detail-aside-card">
              <span className="room-detail-aside-card__eyebrow">Assistance</span>
              <h4 className="room-detail-aside-card__title">Questions about your stay?</h4>
              <p className="room-detail-aside-card__text">
                Our reception team is available 24/7 to assist with room selection, directions, and special requests.
              </p>
              <Link href="/contact" className="room-detail-aside-card__link">
                Contact reception <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Gallery strip ── */}
      {content.gallery && content.gallery.length > 0 && (
        <section className="room-detail-gallery">
          <div className="room-detail-gallery__header">
            <span className="room-detail-gallery__eyebrow">Visuals</span>
            <h2 className="room-detail-gallery__title">Photo Gallery</h2>
          </div>
          <div className="room-detail-gallery__grid">
            {content.gallery.map((src, i) => (
              <div key={i} className="room-detail-gallery__item">
                <Image
                  src={src}
                  alt={`${content.title} gallery photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
