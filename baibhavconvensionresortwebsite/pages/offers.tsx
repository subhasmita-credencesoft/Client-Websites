import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/OffersPage.module.scss';
import { OFFERS_FAQS } from '@/data/faqs';
import { OFFERS } from '@/data/offers';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { Offer } from '@/types';

interface OffersPageProps {
  offers: Offer[];
}

const OffersPage: NextPage<OffersPageProps> = ({ offers }) => {
  const weddingOffers = offers.filter((offer) => offer.category === 'Wedding & Events');
  const stayOffers = offers.filter((offer) => offer.category === 'Seasonal Stay');

  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Offers & Packages', url: '/offers' },
    ]),
    createFaqSchema(OFFERS_FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: 'Special Offers and Bundled Packages at Baibhab Resorts',
      url: `${SITE.domain}/offers`,
      itemListElement: offers.map((offer, index) => ({
        '@type': 'Offer',
        position: index + 1,
        name: offer.title,
        description: offer.description,
        price: offer.price ? offer.price.replace(/[^\d]/g, '') || undefined : undefined,
        priceCurrency: 'INR',
        url: offer.ctaHref.startsWith('http') ? offer.ctaHref : `${SITE.domain}${offer.ctaHref}`,
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Wedding, Event & Stay Offers — Bundled Packages"
        description="Save with bundled wedding and event packages at Baibhab Resorts: banquet hall rentals, multi-cuisine catering, and guest rooms, plus seasonal stay discounts on NH-16."
        path="/offers"
        keywords="resort packages bhubaneswar, wedding package deals phulnakhara, hotel stay offers nh16, corporate delegate packages odisha, banquet hall discounts bhubaneswar"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/newedit/Luxurious Courtyard Entrance at Night.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Offers & Packages' },
        ]}
        eyebrow="Offers & Packages"
        title="Curated Packages for Every Occasion"
        subtitle="Bundled wedding and event offerings plus seasonal stay deals — all backed by our in-house catering and room inventory."
      />

      <section className={styles.section}>
        <div className="container">
          <p className="caption" data-reveal>Wedding & event packages</p>
          <div className={styles.grid}>
            {weddingOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="caption" data-reveal>Seasonal stay deals</p>
          <div className={styles.grid}>
            {stayOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ marginBottom: 32 }} data-reveal>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e7e7e7',
          borderRadius: 16,
          padding: '40px 32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#111111', marginBottom: 6 }}>Need a Custom Package?</h3>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 , lineHeight: 1.6 }}>
              Speak with our event planners to design a personalized package for your wedding, conference, or family gathering.
            </p>
          </div>
          <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-primary">
            Request Custom Proposal
          </Link>
        </div>
      </div>

      <FaqSection
        items={OFFERS_FAQS}
        eyebrow="Offers FAQs"
        title="Packages & Deals Questions"
        subtitle="What each package includes, customisation, seasonal stay deals and corporate bulk-booking discounts."
      />
    </>
  );
};

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className={styles.card} data-reveal data-reveal-stagger>
      <p className={styles.cardTag}>{offer.tagline}</p>
      <h2 className={styles.cardTitle}>{offer.title}</h2>
      <p className={styles.cardText}>{offer.description}</p>
      <ul className={styles.cardList}>
        {offer.includes.map((item) => (
          <li key={item}>
            <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.cardFooter}>
        {offer.price && <span className={styles.price}>{offer.price}</span>}
        {offer.ctaHref.startsWith('http') ? (
          <a href={offer.ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {offer.ctaLabel}
          </a>
        ) : (
          <Link href={offer.ctaHref} className="btn btn-primary">
            {offer.ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}

export const getStaticProps: GetStaticProps<OffersPageProps> = async () => {
  return {
    props: {
      offers: OFFERS,
    },
  };
};

export default OffersPage;
