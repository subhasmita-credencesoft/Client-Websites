import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  AirVent,
  ArrowRight,
  Car,
  Coffee,
  ShieldCheck,
  Sparkles,
  Star,
  Wifi,
} from 'lucide-react';

import { BookButton, defaultStayParams, getHotelMateProperty, roomsToCards } from '@/features/booking';
import { business } from '@/core/config/business';
import { JsonLdScript } from '@/shared/ui/json-ld';
import { breadcrumbSchema, pageMetadata, roomSchema, webPageSchema } from '@/core/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Rooms & Suites | Hotel Sitara Residency Kalamboli Navi Mumbai',
  description:
    'Comfortable & well-appointed rooms at Hotel Sitara Residency, Kalamboli Navi Mumbai. Executive Rooms, Family Suites & more. 24x7 reception, Wi-Fi, parking. Book direct for best rates.',
  path: '/bedrooms',
  keywords: [
    'hotel rooms in Kalamboli',
    'Executive Room Navi Mumbai',
    'Family Suite Kalamboli',
    'rooms near Panvel',
    'hotel booking Navi Mumbai',
  ],
  image: {
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Rooms and Suites at Hotel Sitara Residency, Kalamboli, Navi Mumbai',
  },
});

const amenities = [
  { Icon: Wifi, label: 'High-Speed Wi-Fi', desc: 'Complimentary across the property' },
  { Icon: AirVent, label: 'Climate Control', desc: 'Individual room AC units' },
  { Icon: Car, label: 'Free Parking', desc: 'Secure on-site parking' },
  { Icon: Coffee, label: '24/7 Room Service', desc: 'In-room dining anytime' },
  { Icon: ShieldCheck, label: 'Power Backup', desc: 'Uninterrupted electricity' },
  { Icon: Sparkles, label: 'Daily Housekeeping', desc: 'Fresh linen & toiletries' },
] as const;

export default async function BedroomsPage() {
  const property = await getHotelMateProperty(defaultStayParams());
  const roomCards = roomsToCards(property.roomList ?? []);
  // Hero image: use the last room's first API image (family suite) or guaranteed fallback
  const heroImage =
    roomCards[roomCards.length - 1]?.image ||
    '/EXECUTIVE FAMILY SUITE/HOTEL SITARA RESIDENCY CORPORATE ROOM NAVI MUMBAI AIRPORT.avif';

  return (
    <main className="rooms-listing-page">
      <JsonLdScript
        data={[
          webPageSchema({
            name: 'Rooms & Suites | Hotel Sitara Residency Kalamboli Navi Mumbai',
            description:
              'Spacious, clean and comfortable rooms at Hotel Sitara Residency, Kalamboli, Navi Mumbai. Book online for best rates.',
            path: '/bedrooms',
            type: 'CollectionPage',
          }),
          breadcrumbSchema([{ name: 'Rooms & Suites', path: '/bedrooms' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Room types at Hotel Sitara Residency',
            itemListElement: roomCards.map((card, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: card.title,
              url: `${process.env.NEXT_PUBLIC_SITE_URL ?? business.website}/bedrooms/${card.slug}`,
            })),
          },
          ...roomCards.map((card) =>
            roomSchema({
              name: card.title,
              description: card.description,
              path: `/bedrooms/${card.slug}`,
              image: card.image,
            }),
          ),
        ]}
      />
      {/* ═══ CINEMATIC HERO ═══ */}
      <section className="rooms-listing-hero">
        <Image
          src={heroImage}
          alt="Luxury suite at Hotel Sitara Residency"
          fill
          priority
          sizes="100vw"
          className="rooms-listing-hero__bg"
        />
        {/* bright top-down gradient so text bottom is readable but top is bright */}
        <div className="rooms-listing-hero__shade" />

        <div className="rooms-listing-hero__content">
          <p className="rooms-listing-hero__eyebrow">{business.name} · Kalamboli, Navi Mumbai</p>
          <h1 className="rooms-listing-hero__heading">
            Rooms &amp; Suites
          </h1>
          <div className="rooms-listing-hero__rule" />
          <p className="rooms-listing-hero__intro">
            Premium accommodation crafted for business travellers, families and couples seeking
            genuine comfort in the heart of Navi Mumbai.
          </p>
          <div className="rooms-listing-hero__actions">
            <BookButton className="button" testId="button-bedrooms-book">
              Check Availability
            </BookButton>
            <a
              href="#our-rooms"
              className="rooms-listing-hero__explore"
            >
              Explore Rooms
            </a>
          </div>
        </div>

        {/* Rating badge */}
        <div className="rooms-listing-hero__badge">
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={13} fill="#d7b49a" color="#d7b49a" />
            ))}
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/70">
            Premium Property
          </p>
        </div>

        {/* Scroll cue */}
        <div className="rooms-listing-hero__scroll">
          <span className="rooms-listing-hero__scroll-label">Scroll</span>
          <span className="rooms-listing-hero__scroll-line" />
        </div>
      </section>

      {/* ═══ INTRO STRIP ═══ */}
      <section className="rooms-listing-intro">
        <div className="rooms-listing-intro__inner">
          <div className="rooms-listing-intro__kicker">
            <span className="rooms-listing-intro__eyebrow">Our Accommodations</span>
            <div className="rooms-listing-intro__line" />
          </div>
          <div className="rooms-listing-intro__body">
            <h2 className="rooms-listing-intro__heading">
              Every room designed for the guest who values quality
            </h2>
            <p className="rooms-listing-intro__text">
              From our signature Executive Family Suite to our versatile Triple Room, each
              category is thoughtfully appointed with premium bedding, individual climate
              control, high-speed Wi-Fi, and attentive 24-hour service — all at Kalamboli&apos;s
              most convenient location.
            </p>
            <BookButton className="button" testId="button-intro-book">
              Reserve Your Room
            </BookButton>
          </div>
        </div>
      </section>

      {/* ═══ AMENITIES STRIP (LIGHT) ═══ */}
      <div className="rooms-listing-amenities">
        {amenities.map(({ Icon, label, desc }) => (
          <div key={label} className="rooms-listing-amenities__item">
            <div className="rooms-listing-amenities__icon">
              <Icon size={20} />
            </div>
            <strong className="rooms-listing-amenities__label">{label}</strong>
            <span className="rooms-listing-amenities__desc">{desc}</span>
          </div>
        ))}
      </div>

      {/* ═══ ROOM CARDS GRID ═══ */}
      <section id="our-rooms" className="rooms-listing-grid-wrap">
        <div className="rooms-listing-grid-header">
          <div>
            <p className="rooms-listing-grid-header__eyebrow">Choose Your Suite</p>
            <h2 className="rooms-listing-grid-header__heading">Available Rooms</h2>
          </div>
          <p className="rooms-listing-grid-header__sub">
            {roomCards.length} room type{roomCards.length !== 1 ? 's' : ''} · Book direct for
            best rate
          </p>
        </div>

        <div className="rooms-listing-cards">
          {roomCards.map((card, idx) => (
            <Link
              key={card.slug}
              href={`/bedrooms/${card.slug}`}
              className={`rooms-listing-card${idx === 0 ? ' rooms-listing-card--featured' : ''}`}
            >
              <div className="rooms-listing-card__media">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes={
                    idx === 0
                      ? '(max-width: 900px) 100vw, 55vw'
                      : '(max-width: 900px) 100vw, 30vw'
                  }
                  className="rooms-listing-card__img"
                />
                <div className="rooms-listing-card__overlay" />
                {/* Hover arrow */}
                <div className="rooms-listing-card__arrow">
                  <ArrowRight size={18} />
                </div>
              </div>
              <div className="rooms-listing-card__body">
                <span className="rooms-listing-card__eyebrow">{card.eyebrow}</span>
                <h3 className="rooms-listing-card__title">{card.title}</h3>
                <div className="rooms-listing-card__rule" />
                <p className="rooms-listing-card__desc">{card.description}</p>
                <div className="rooms-listing-card__footer">
                  <span className="rooms-listing-card__meta">{card.meta}</span>
                  <span className="rooms-listing-card__cta">
                    Explore <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ BOTTOM CTA BAND ═══ */}
      <section className="rooms-listing-cta">
        <div className="rooms-listing-cta__inner">
          <p className="rooms-listing-cta__eyebrow">Direct Booking Guarantee</p>
          <h2 className="rooms-listing-cta__heading">
            Best Rate. Every Time.
          </h2>
          <p className="rooms-listing-cta__text">
            Skip the OTAs. Book directly with us for exclusive rates, flexible cancellation,
            and personal concierge assistance from check-in to check-out.
          </p>
          <div className="rooms-listing-cta__actions">
            <BookButton className="button" testId="button-cta-book">
              Book Now — Best Rate
            </BookButton>
            <a
              href={`tel:${business.phones.primary}`}
              className="rooms-listing-cta__phone"
            >
              Or call {business.phones.primaryDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}