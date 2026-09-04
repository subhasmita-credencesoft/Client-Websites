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
    src: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80&fit=crop',
    alt: 'Crispy Chicken 65 — an Indo-Chinese starter favourite',
  },
  {
    src: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80&fit=crop',
    alt: 'Tandoori chicken, char-grilled in the clay oven',
  },
  {
    src: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80&fit=crop',
    alt: 'Rich Indian curries served with freshly baked breads',
  },
];

const PremiumBanquetPage: NextPage = () => {
  return (
    <>
      <Seo
        title="The Baibhab Kitchen — Premium Catering"
        description="Signature premium catering at The Baibhab Kitchen — fine-dining menus, live counters, ambient lighting and dedicated banquet service at Baibhab Resorts."
        path="/dining/baibhab-kitchen"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1920&q=80&fit=crop"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Dining', href: '/dining' },
          { label: 'The Baibhab Kitchen' },
        ]}
        eyebrow="The Baibhab Kitchen"
        title="The Baibhab Kitchen"
        subtitle="Fine-dining menus, live counters and dedicated service for weddings, receptions and corporate galas."
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
          <h2 className="h2">The Baibhab Kitchen difference</h2>
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
              Enquire About The Baibhab Kitchen
            </Link>
            <Link href="/events/venues" className="btn btn-outline">
              View Venue Spaces
            </Link>
          </div>
        </div>
      </div>

      <FaqSection
        items={DINING_FAQS}
        eyebrow="Kitchen FAQs"
        title="The Baibhab Kitchen Questions"
        subtitle="Menus, live counters, dietary options and catering service for your event."
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
