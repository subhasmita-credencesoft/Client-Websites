import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/EventsPage.module.scss';
import { WEDDINGS_FAQS } from '@/data/faqs';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createEventVenueSchema, createFaqSchema } from '@/lib/schema';

const WEDDING_OFFERS = [
  'Dedicated Bridal & Groom Dressing Suites with private vanity setups.',
  'Flexible decorator policy with in-house and empaneled vendor options.',
  'Authentic Odia marriage feast menus & custom multi-cuisine buffets by Fusion Bites.',
  'Ample room inventory for overnight guest accommodations (Premium & Deluxe rooms).',
  'Guaranteed weather-backup indoor banquet halls for outdoor lawn celebrations.',
  'Free parking for 200+ vehicles with dedicated driver rest lounge.',
];

const WEDDING_IMAGES = [
  {
    src: '/wedding/entrance.jpeg',
    alt: 'Luxurious courtyard entrance and mandap setup illuminated at night at Baibhab Resorts Bhubaneswar',
  },
  {
    src: '/wedding/entrance12.jpeg',
    alt: 'Grand wedding venue entrance pathway at Baibhab Resorts & Conventions Phulnakhara',
  },
  {
    src: '/newedit/Gate new Design.avif',
    alt: 'Decorated entrance gate at Baibhab Resorts & Conventions for wedding celebrations',
  },
];

const WeddingsPage: NextPage = () => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Weddings & Events', url: '/events' },
      { name: 'Weddings & Social', url: '/events/weddings' },
    ]),
    createEventVenueSchema(),
    createFaqSchema(WEDDINGS_FAQS),
  ];

  return (
    <>
      <Seo
        title="Wedding Venues & Banquets in Bhubaneswar — Cuttack"
        description="Host grand weddings, mandap setups, Sangeet and receptions at Baibhab Resorts on NH-16. Column-free banquet halls, 8000 sq. ft. open lawns, bridal suites, and guest rooms."
        path="/events/weddings"
        keywords="wedding venues in bhubaneswar, banquet hall for wedding in phulnakhara, wedding resorts near cuttack, open lawn wedding venue odisha, sangeet reception venues bhubaneswar, marriage garden nh16"
        image="/wedding/weddinghero.jpeg"
        imageAlt="Grand wedding reception celebration at Baibhab Resorts & Conventions"
        jsonLd={jsonLd}
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
        subtitle="From pre-wedding rituals like Sangeet and Mehendi to grand reception evenings, Baibhab Resorts offers versatile indoor and outdoor settings on the Bhubaneswar–Cuttack corridor."
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
          <h2 className="h2">What we offer for your celebration</h2>
          <p className={styles.featureText}>
            Our experienced hospitality and banquet team coordinates every facet of your celebration — from
            stage decor and floral lighting to live Odia culinary spreads and overnight guest rooms.
          </p>
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
            <Link href="/stay" className="btn btn-outline">
              Guest Room Inventory
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
