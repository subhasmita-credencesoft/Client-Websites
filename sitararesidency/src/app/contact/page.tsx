import type { Metadata } from 'next';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Wifi,
  ShieldCheck,
  ArrowRight,
  Instagram,
  Facebook,
} from 'lucide-react';

import { business } from '@/core/config/business';
import { JsonLdScript } from '@/shared/ui/json-ld';
import { breadcrumbSchema, pageMetadata, webPageSchema } from '@/core/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us | Hotel Sitara Residency Kalamboli Navi Mumbai',
  description:
    'Contact Hotel Sitara Residency in Kalamboli, Navi Mumbai. Call +91 74004 32396 / 74004 32397 for reservations. 24x7 reception, free parking & Wi-Fi.',
  path: '/contact',
  keywords: [
    'Hotel Sitara Residency contact',
    'hotel phone number Kalamboli',
    'hotel address Navi Mumbai',
    'Kalamboli hotel booking contact',
  ],
});

const nearbyLandmarks = [
  'Kalamboli Railway Station — 1.2 km',
  'Panvel Bus Depot — 3.4 km',
  'Navi Mumbai Airport — 18 km',
  'Mumbai–Pune Expressway — 2 km',
];

const amenityHighlights = [
  { Icon: Wifi, label: 'Free Wi-Fi', sub: 'High-speed throughout' },
  { Icon: Car, label: 'Free Parking', sub: 'Secure on-site' },
  { Icon: ShieldCheck, label: 'Power Backup', sub: '24/7 uninterrupted' },
  { Icon: Clock, label: '24-hr Reception', sub: 'Always here for you' },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <JsonLdScript
        data={[
          webPageSchema({
            name: 'Contact Us | Hotel Sitara Residency',
            description:
              'Contact Hotel Sitara Residency in Kalamboli, Navi Mumbai for reservations, directions and enquiries.',
            path: '/contact',
            type: 'ContactPage',
          }),
          breadcrumbSchema([{ name: 'Contact', path: '/contact' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: `${process.env.NEXT_PUBLIC_SITE_URL ?? business.website}/contact`,
            mainEntity: {
              '@type': 'Hotel',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL ?? business.website}/#hotel`,
              name: business.name,
              telephone: business.phones.primary,
              email: business.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: business.address.streetAddress,
                addressLocality: business.address.locality,
                addressRegion: business.address.region,
                postalCode: business.address.postalCode,
                addressCountry: business.address.country,
              },
            },
          },
        ]}
      />

      {/* ── HERO ── */}
      <section className="contact-hero">
        <Image
          src="/Hotel Sitara Residency Kalamboli Reception (1).avif"
          alt="Hotel Sitara Residency reception"
          fill
          priority
          sizes="100vw"
          className="contact-hero__img"
        />
        <div className="contact-hero__shade" />
        <div className="contact-hero__content">
          <p className="contact-hero__eyebrow">Hotel Sitara Residency · Kalamboli</p>
          <h1 className="contact-hero__heading">Come&nbsp;say&nbsp;hello.</h1>
          <div className="contact-hero__rule" />
          <p className="contact-hero__intro">
            Our team is on hand 24 hours a day. Whether you need a room, directions or just
            a friendly voice — we&apos;re always happy to help.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="contact-cards-section">
        <div className="contact-cards-inner">

          {/* Phone */}
          <div className="contact-card">
            <span className="contact-card__icon-wrap">
              <Phone size={22} />
            </span>
            <p className="contact-card__label">Reservations &amp; Enquiries</p>
            <div className="space-y-3 mb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-muted block">Mobile</span>
                <p className="contact-card__value" style={{ fontSize: '1.15rem' }}>
                  <a href={`tel:${business.phones.primary}`} className="hover:text-terracotta transition-colors">
                    {business.phones.primaryDisplay}
                  </a>
                  <span className="text-sage-muted mx-1">/</span>
                  <a href={`tel:${business.phones.secondary}`} className="hover:text-terracotta transition-colors">
                    {business.phones.secondaryDisplay}
                  </a>
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-muted block">Desk / Landline</span>
                <p className="contact-card__sub" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  <a href={`tel:${business.phones.landlinePrimary}`} className="hover:text-terracotta transition-colors">
                    {business.phones.landlinePrimaryDisplay}
                  </a>
                  <span className="text-sage-muted mx-1">/</span>
                  <a href={`tel:${business.phones.landlineSecondary}`} className="hover:text-terracotta transition-colors">
                    {business.phones.landlineSecondaryDisplay}
                  </a>
                </p>
              </div>
            </div>
            <a href={`tel:${business.phones.primary}`} className="contact-card__cta">
              Call Mobile <ArrowRight size={12} />
            </a>
          </div>

          {/* Email */}
          <a href={`mailto:${business.email}`} className="contact-card">
            <span className="contact-card__icon-wrap">
              <Mail size={22} />
            </span>
            <p className="contact-card__label">Email Us</p>
            <p className="contact-card__value" style={{ fontSize: '1.1rem' }}>{business.email}</p>
            <p className="contact-card__sub">We reply within a few hours</p>
            <span className="contact-card__cta">
              Send email <ArrowRight size={12} />
            </span>
          </a>

          {/* Address */}
          <a
            href={business.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <span className="contact-card__icon-wrap">
              <MapPin size={22} />
            </span>
            <p className="contact-card__label">Our Address</p>
            <address className="contact-card__value contact-card__address">
              {business.address.lines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </address>
            <span className="contact-card__cta">
              Get directions <ArrowRight size={12} />
            </span>
          </a>

          {/* Hours */}
          <div className="contact-card contact-card--no-hover">
            <span className="contact-card__icon-wrap">
              <Clock size={22} />
            </span>
            <p className="contact-card__label">Reception Hours</p>
            <p className="contact-card__value" style={{ fontSize: '1.15rem' }}>Open 24 Hours</p>
            <p className="contact-card__sub">Every day, including holidays</p>
            <p className="contact-card__sub" style={{ marginTop: '6px' }}>
              Phone lines: 8&nbsp;am – 9&nbsp;pm daily
            </p>
          </div>

        </div>
      </section>

      {/* ── MAP + INFO PANEL ── */}
      <section className="contact-map-section">
        <div className="contact-map-section__inner">

          {/* LEFT — info */}
          <div className="contact-map-info">
            <p className="contact-map-info__eyebrow">Find Us</p>
            <h2 className="contact-map-info__heading">How to reach us</h2>
            <p className="contact-map-info__desc">
              We&apos;re located in Riddhi Arcade, Kalamboli — right in the heart of Navi Mumbai,
              with easy access from the expressway and railway station.
            </p>

            <div className="contact-map-info__landmarks">
              <p className="contact-map-info__landmarks-title">Nearby landmarks</p>
              {nearbyLandmarks.map((l) => (
                <div key={l} className="contact-map-info__landmark-row">
                  <MapPin size={13} className="contact-map-info__landmark-icon" />
                  <span>{l}</span>
                </div>
              ))}
            </div>

            <a
              href={business.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button contact-map-info__btn"
            >
              Open in Google Maps
            </a>
          </div>

          {/* RIGHT — map embed */}
          <div className="contact-map-embed">
            <iframe
              title="Hotel Sitara Residency location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.0!2d73.0961!3d18.9986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3a0e3a2b1c5%3A0x7b2d0f3e8c5a4b6d!2sHotel+Sitara+Residency!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

      {/* ── AMENITY STRIP ── */}
      <section className="contact-amenities">
        {amenityHighlights.map(({ Icon, label, sub }) => (
          <div key={label} className="contact-amenities__item">
            <span className="contact-amenities__icon">
              <Icon size={20} />
            </span>
            <p className="contact-amenities__label">{label}</p>
            <p className="contact-amenities__sub">{sub}</p>
          </div>
        ))}
      </section>

      {/* ── SOCIAL + BOOK CTA ── */}
      <section className="contact-cta">
        <div className="contact-cta__inner">
          <p className="contact-cta__eyebrow">Stay connected</p>
          <h2 className="contact-cta__heading">Ready to book your stay?</h2>
          <p className="contact-cta__text">
            Call us directly or book online for the best available rates. We look forward to
            welcoming you to Hotel Sitara Residency.
          </p>
          <div className="contact-cta__actions">
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Check Availability
            </a>
            <a
              href={`tel:${business.phones.primary}`}
              className="contact-cta__phone"
            >
              <Phone size={14} />
              {business.phones.primaryDisplay}
            </a>
          </div>
          <div className="contact-cta__social">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta__social-link"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta__social-link"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
