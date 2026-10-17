import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/layout/PageBanner';
import { FaqSection } from '@/components/layout/FaqSection';
import { CtaSection } from '@/components/layout/CtaSection';
import { BlogTeasers } from '@/components/blog/BlogTeasers';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { PAGE_KEYWORDS } from '@/data/seo';
import styles from '@/components/layout/PageContent.module.scss';

export const metadata: Metadata = {
  title: { absolute: 'Conference & Banquet Hall in Chakradharpur | Hotel K2' },
  description:
    'Conference hall in Chakradharpur at Hotel K2 — a banquet and conference hall for business meetings, seminars, functions and celebrations, with catering, seating and in-hall facilities.',
  keywords: PAGE_KEYWORDS['conference-hall'].join(', '),
  alternates: { canonical: '/conference-hall' },
  openGraph: {
    title: 'Conference & Banquet Hall in Chakradharpur | Hotel K2',
    description:
      'Book the conference and banquet hall at Hotel K2, Chakradharpur, for business meetings, seminars and celebrations with catering.',
    url: '/conference-hall',
    images: [{ url: '/conference/confresshall1.jpeg', width: 1200, height: 630, alt: 'Conference hall in Chakradharpur — Hotel K2' }],
  },
};

const CONFERENCE_IMAGES = [
  { src: '/conference/confresshall1.jpeg', alt: 'Conference hall seating at Hotel K2, Chakradharpur' },
  { src: '/conference/confresshall2.jpeg', alt: 'Banquet hall at Hotel K2, Chakradharpur' },
  { src: '/conference/confresshall3.jpeg', alt: 'Meeting hall setup at Hotel K2, Chakradharpur' },
  { src: '/conference/confresshall4.jpeg', alt: 'Event venue at Hotel K2, Chakradharpur' },
];

const FEATURES = [
  'Conference and banquet hall for meetings, seminars and celebrations',
  'Comfortable seating with a flexible layout',
  'Catering and dining arrangements on request',
  'Convenient location near Chakradharpur Railway Station',
  'Parking and easy access on Station Link Road',
  'Support from the 24-hour front desk for your event',
];

const FAQS = [
  {
    q: 'Does Hotel K2 have a conference hall in Chakradharpur?',
    a: 'Yes. Hotel K2 has a conference and banquet hall suitable for business meetings, seminars, training sessions, functions and celebrations in Chakradharpur.',
  },
  {
    q: 'Can I book the banquet hall for an event or function?',
    a: 'Yes. The banquet hall can be booked for parties, family functions and celebrations. Call the front desk at +91 8709490824 to check availability and discuss your requirements.',
  },
  {
    q: 'Is catering available for events at Hotel K2?',
    a: 'Yes. Catering and dining arrangements can be provided for events held in our conference and banquet hall, on request.',
  },
  {
    q: 'How do I enquire about booking the conference hall?',
    a: 'Call Hotel K2 at +91 8709490824 or +91 9123490131, or email hotelk2.ckp@gmail.com with your date and expected number of guests for a quote.',
  },
];

export default function ConferenceHallPage() {
  return (
    <>
      <PageBanner
        eyebrow="Conference Hall"
        title="Conference & Banquet Hall in Chakradharpur"
        subtitle="Host business meetings, seminars, functions and celebrations in a well-located hall at Hotel K2, with catering and front-desk support."
        breadcrumbLabel="Conference Hall"
        path="/conference-hall"
      />

      <section className={styles.band}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Events & Meetings</span>
            <h2 className={styles.heading}>A flexible space for work and celebration</h2>
            <p className={styles.lead}>
              From corporate meetings to family functions, Hotel K2&rsquo;s conference and
              banquet hall in Chakradharpur offers a convenient, well-serviced venue for
              gatherings of all kinds.
            </p>
          </div>

          <div className={styles.gallery}>
            {CONFERENCE_IMAGES.map((image) => (
              <div key={image.src} className={styles.galleryItem}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.bandAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>What&rsquo;s Included</span>
            <h2 className={styles.heading}>Hall features & facilities</h2>
          </div>

          <div className={styles.grid2}>
            {FEATURES.map((feature, index) => (
              <Reveal key={feature} delay={(index % 2) * 120} className={styles.tile}>
                <span className={styles.tileIcon} aria-hidden="true">
                  <Icon name="check" size={32} />
                </span>
                <h3>{feature}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={FAQS} title="Conference hall in Chakradharpur — FAQ" id="conference-faq-heading" />

      <BlogTeasers
        slugs={[
          'banquet-and-conference-hall-chakradharpur',
          'where-to-stay-in-chakradharpur',
          'choosing-a-room-at-hotel-k2',
        ]}
        kicker="Event Planning"
        title="Planning an event in Chakradharpur"
        intro="Practical guides to help you organise a celebration or meeting, and keep your guests comfortable at Hotel K2."
      />

      <CtaSection
        title="Enquire about the conference hall"
        text="Call our 24-hour front desk to check availability, discuss seating and plan catering for your meeting, seminar or celebration in Chakradharpur."
      />
    </>
  );
}
