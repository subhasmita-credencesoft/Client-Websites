import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/DiningPage.module.scss';
import { DINING_FAQS } from '@/data/faqs';
import { RESTAURANT, CATERING, DINING_SECTION } from '@/data/dining';

const DiningPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Dining & Catering  Exceptional Flavors, Masterfully Crafted"
        description="A multi-cuisine restaurant serving Odia, North and South Indian, and Continental fare, plus banquet catering with pure-veg menus, live counters and dietary options."
        path="/dining"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
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
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt={RESTAURANT.name}
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <p className="caption">In-house dining</p>
              <h2 className="h2" style={{ marginTop: 8 }}>
                {RESTAURANT.name}
              </h2>
              <p className={styles.text}>{RESTAURANT.concept}</p>
              <p className={styles.hours}>
                <iconify-icon icon="solar:clock-circle-bold" aria-hidden="true" />
                Operating Hours: {RESTAURANT.hours}
              </p>
              <ul className={styles.list}>
                {RESTAURANT.specialties.map((specialty) => (
                  <li key={specialty}>
                    <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.cardGrid}>
            {RESTAURANT.highlights.map((highlight) => (
              <div key={highlight.title} className={styles.card} data-reveal data-reveal-stagger>
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
                <p className={styles.cardTitle}>{option.title}</p>
                <p className={styles.cardText}>{option.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.ctaBlock}>
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
