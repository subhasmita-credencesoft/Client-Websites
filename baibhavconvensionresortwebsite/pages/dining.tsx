import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/DiningPage.module.scss';
import { DINING_FAQS } from '@/data/faqs';
import { RESTAURANT, CATERING, DINING_SECTION } from '@/data/dining';
import { createBreadcrumbSchema, createFaqSchema, createRestaurantSchema } from '@/lib/schema';

const DiningPage: NextPage = () => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Dining & Catering', url: '/dining' },
    ]),
    createRestaurantSchema(),
    createFaqSchema(DINING_FAQS),
  ];

  return (
    <>
      <Seo
        title="Fusion Bites Multi-Cuisine Restaurant & Banquet Catering"
        description="Dine at Fusion Bites at Baibhab Resorts on NH-16. Authentic Odia specialties, North & South Indian, Continental fare, and customized pure-veg banquet catering for weddings and events."
        path="/dining"
        keywords="restaurants in phulnakhara, fusion bites bhubaneswar, dining near sum hospital phulnakhara, pure veg catering bhubaneswar, multi cuisine restaurant cuttack highway, banquet catering odisha"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1920&q=80&fit=crop"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Dining & Catering' },
        ]}
        eyebrow="Dining & Catering"
        title={DINING_SECTION.title}
        subtitle={DINING_SECTION.subtitle}
      />

      <section id="restaurant" className={styles.section}>
        <div className="container">
          <div className={styles.split} data-reveal>
            <div className={styles.splitImageWrap}>
              <Image
                src="/restaurantdining.png"
                alt="Fusion Bites multi-cuisine restaurant and dining hall at Baibhab Resorts Bhubaneswar"
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <p className="caption">In-house dining · Lunch & Dinner</p>
              <h2 className="h2" style={{ marginTop: 8 }}>
                {RESTAURANT.name}
              </h2>
              <p className={styles.text}>{RESTAURANT.concept}</p>
              <p className={styles.hours}>
                <iconify-icon icon="solar:clock-circle-bold" aria-hidden="true" />
                Lunch: {RESTAURANT.hours.lunch}
              </p>
              <p className={styles.hours}>
                <iconify-icon icon="solar:moon-stars-bold" aria-hidden="true" />
                Dinner: {RESTAURANT.hours.dinner}
              </p>
              <ul className={styles.list}>
                {RESTAURANT.specialties.map((specialty) => (
                  <li key={specialty}>
                    <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                    {specialty}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/dining/baibhab-kitchen" className="btn btn-outline">
                  The Baibhab Kitchen
                </Link>
                <Link href="/contact" className="btn btn-primary">
                  Reserve a Table
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.cardGrid}>
            {RESTAURANT.highlights.map((highlight) => (
              <div key={highlight.title} className={styles.card} data-reveal data-reveal-stagger>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url('${highlight.image}')` }}
                  role="img"
                  aria-label={`${highlight.title} at Fusion Bites Baibhab Resorts`}
                />
                <p className={styles.cardTitle}>{highlight.title}</p>
                <p className={styles.cardText}>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catering" className={styles.section}>
        <div className="container">
          <p className="caption">Banquet & event catering</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            Catering for Celebrations of Every Scale
          </h2>
          <p className={styles.text}>{CATERING.description}</p>
          <div className={styles.cardGrid} data-reveal-stagger>
            {CATERING.options.map((option) => (
              <div key={option.title} className={styles.card} data-reveal>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url('${option.image}')` }}
                  role="img"
                  aria-label={`${option.title} catering at Baibhab Resorts`}
                />
                <p className={styles.cardTitle}>{option.title}</p>
                <p className={styles.cardText}>{option.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.ctaBlock}>
            <Link href="/events/weddings" className="btn btn-outline">
              Wedding Venues & Stays
            </Link>
            <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-primary">
              Plan Catering for Your Event
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        items={DINING_FAQS}
        eyebrow="Dining FAQs"
        title="Food & Catering Questions"
        subtitle="Common questions about our restaurant, menus, dietary options and banquet catering."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default DiningPage;
