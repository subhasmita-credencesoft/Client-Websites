import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/OffersPage.module.scss';
import { OFFERS_FAQS } from '@/data/faqs';
import { OFFERS } from '@/data/offers';
import { Offer } from '@/types';

interface OffersPageProps {
  offers: Offer[];
}

const OffersPage: NextPage<OffersPageProps> = ({ offers }) => {
  const weddingOffers = offers.filter((offer) => offer.category === 'Wedding & Events');
  const stayOffers = offers.filter((offer) => offer.category === 'Seasonal Stay');

  return (
    <>
      <Seo
        title="Wedding, Event & Stay Offers"
        description="Wedding and event packages bundling venue, catering and guest rooms, plus seasonal stay deals and corporate bulk-booking discounts."
        path="/offers"
      />
      <InnerHero
        image="/newedit/Luxurious Courtyard Entrance at Night.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Offers & Packages' },
        ]}
        eyebrow="Offers & Packages"
        title="Curated Packages for Every Occasion"
        subtitle="Bundled wedding and event offerings plus seasonal stay deals  all backed by our in-house catering and room inventory."
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
