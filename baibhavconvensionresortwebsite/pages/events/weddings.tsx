import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/EventsPage.module.scss';
import { WEDDINGS_FAQS } from '@/data/faqs';

const WEDDING_OFFERS = [
  'Dedicated Bridal & Groom Dressing Suites.',
  'Flexible decorator policy with in-house and empaneled vendor options.',
  'Authentic Odia marriage feast menus & custom multi-cuisine buffets.',
  'Ample room inventory for overnight guest accommodations.',
];

const WEDDING_IMAGES = [
  {
    src: '/wedding/entrance.jpeg',
    alt: 'Luxurious courtyard entrance illuminated at night',
  },
  {
    src: '/wedding/entrance12.jpeg',
    alt: 'Grand entrance pathway of the resort',
  },
  {
    src: '/newedit/Gate new Design.avif',
    alt: 'Designed entrance gate of Baibhab Resorts',
  },
];

const WeddingsPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Weddings & Social Celebrations"
        description="Mandap setups, Sangeet, Mehendi and grand receptions at Baibhab Resorts  indoor halls and outdoor lawns with dressing suites, in-house catering and guest rooms."
        path="/events/weddings"
      />
      <InnerHero
        image="/wedding/weddinghero.jpeg"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Weddings & Events', href: '/events' },
          { label: 'Weddings & Social' },
        ]}
        eyebrow="Weddings & Social Events"
        title="Celebrate Your Special Day at a Venue That Handles Every Detail"
        subtitle="From pre-wedding rituals like Sangeet and Mehendi to grand reception evenings, Baibhab Resorts offers versatile indoor and outdoor settings."
        cta={{ label: 'Plan Your Wedding', href: '/contact?inquiry=Banquets+%2F+Events' }}
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.featureGrid} data-reveal>
          {WEDDING_IMAGES.map((img) => (
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
          <h2 className="h2">What we offer</h2>
          <ul className={styles.checklist}>
            {WEDDING_OFFERS.map((offer) => (
              <li key={offer} className={styles.checkItem}>
                <iconify-icon icon="solar:check-circle-linear" className={styles.checkIcon} aria-hidden="true" />
                {offer}
              </li>
            ))}
          </ul>

          <div className={styles.ctaBlock}>
            <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-primary">
              Request a Wedding Proposal
            </Link>
            <Link href="/events/venues" className="btn btn-outline">
              Compare Venue Spaces
            </Link>
          </div>
        </div>
      </div>

      <FaqSection
        items={WEDDINGS_FAQS}
        eyebrow="Wedding FAQs"
        title="Wedding Day Questions"
        subtitle="Dressing suites, décor, Odia menus and guest accommodation for your big day."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default WeddingsPage;
