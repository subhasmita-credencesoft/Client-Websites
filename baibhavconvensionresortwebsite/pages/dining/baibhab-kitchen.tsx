import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/EventsPage.module.scss';
import { DINING_FAQS } from '@/data/faqs';

const KITCHEN_OFFERS = [
  'Fresh in-house cooking across Odia, North & South Indian and Continental cuisines.',
  'Live chaat, tandoor and wok counters fired up through lunch and dinner.',
  'Hearty breakfast, lunch and dinner buffets for resort guests and events.',
  'Pure-veg, Jain, vegan and gluten-free menus prepared on request.',
];

const KITCHEN_IMAGES = [
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

const KitchenPage: NextPage = () => {
  return (
    <>
      <Seo
        title="The Baibhab Kitchen — Buffets & Live Counters"
        description="The Baibhab Kitchen at Baibhab Resorts — fresh in-house multi-cuisine cooking, live chaat and tandoor counters, and breakfast, lunch and dinner buffets."
        path="/dining/baibhab-kitchen"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1920&q=80&fit=crop"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Dining', href: '/dining' },
          { label: 'The Baibhab Kitchen' },
        ]}
        eyebrow="Buffets & Live Counters"
        title="The Baibhab Kitchen"
        subtitle="Our in-house multi-cuisine kitchen serves fresh Odia, Indian and Continental fare — from breakfast buffets to live-counter lunches and dinners."
        cta={{ label: 'Talk to the Kitchen', href: '/contact' }}
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.featureGrid} data-reveal>
          {KITCHEN_IMAGES.map((img) => (
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
          <h2 className="h2">Fresh from our in-house kitchen</h2>
          <p className={styles.featureText}>
            Every meal at Baibhab Resorts is prepared on-site by our own culinary team — from the
            breakfast buffet and the Fusion bites restaurant to banquet catering for hundreds of
            guests. Seasonal Odia recipes, Indian favourites and Continental classics are all cooked
            to order or served from live counters.
          </p>
          <ul className={styles.checklist}>
            {KITCHEN_OFFERS.map((offer) => (
              <li key={offer} className={styles.checkItem}>
                <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                {offer}
              </li>
            ))}
          </ul>

          <div className={styles.ctaBlock}>
            <Link href="/contact" className="btn btn-primary">
              Talk to the Kitchen
            </Link>
            <Link href="/dining#restaurant" className="btn btn-outline">
              Explore Fusion bites
            </Link>
          </div>
        </div>
      </div>

      <FaqSection
        items={DINING_FAQS}
        eyebrow="Kitchen FAQs"
        title="The Baibhab Kitchen Questions"
        subtitle="Meal timings, buffets, live counters and dietary options at The Baibhab Kitchen."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default KitchenPage;
