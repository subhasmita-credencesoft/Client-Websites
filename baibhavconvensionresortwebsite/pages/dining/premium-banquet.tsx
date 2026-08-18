import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/EventsPage.module.scss';
import { DINING_FAQS } from '@/data/faqs';

const PREMIUM_BANQUET_OFFERS = [
  'Signature Royal Imperial Hall experience for premium wedding receptions and galas.',
  'Curated fine-dining menus with live chef counters, carving stations and artisanal desserts.',
  'Premium table settings, ambient lighting and dedicated banquet captain service.',
  'End-to-end coordination with décor, AV and guest accommodation under one roof.',
];

const PREMIUM_BANQUET_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80&fit=crop',
    alt: 'Premium banquet hall at Baibhab Resorts',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80&fit=crop',
    alt: 'Reception area for premium events',
  },
  {
    src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80&fit=crop',
    alt: 'Premium lawn for grand receptions',
  },
];

const PremiumBanquetPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Premium Banquet & Fine Catering"
        description="Signature premium banquet experience at the Royal Imperial Hall — fine-dining menus, live counters, ambient lighting and dedicated banquet service at Baibhab Resorts."
        path="/dining/premium-banquet"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80&fit=crop"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Dining', href: '/dining' },
          { label: 'Premium Banquet' },
        ]}
        eyebrow="Premium Banquet & Catering"
        title="A Premium Banquet Experience"
        subtitle="Signature Royal Imperial Hall catering with fine-dining menus, live counters and dedicated service for weddings, receptions and corporate galas."
        cta={{ label: 'Request a Proposal', href: '/contact?inquiry=Banquets+%2F+Events' }}
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.featureGrid} data-reveal>
          {PREMIUM_BANQUET_IMAGES.map((img) => (
            <figure key={img.src} className={styles.featureImageWrap}>
              <Image
                src={img.src}
                alt={img.alt}
                className={styles.featureImage}
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <figcaption className={styles.featureCaption}>{img.alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.contentBlock} data-reveal>
          <h2 className="h2">The premium banquet difference</h2>
          <ul className={styles.checklist}>
            {PREMIUM_BANQUET_OFFERS.map((offer) => (
              <li key={offer} className={styles.checkItem}>
                <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                {offer}
              </li>
            ))}
          </ul>

          <div className={styles.ctaBlock}>
            <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-primary">
              Enquire About Premium Banquet
            </Link>
            <Link href="/events/venues" className="btn btn-outline">
              View Venue Spaces
            </Link>
          </div>
        </div>
      </div>

      <FaqSection
        items={DINING_FAQS}
        eyebrow="Banquet FAQs"
        title="Premium Catering Questions"
        subtitle="Menus, live counters, dietary options and banquet service for your premium event."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default PremiumBanquetPage;
