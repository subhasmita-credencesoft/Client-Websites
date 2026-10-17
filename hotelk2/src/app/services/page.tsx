import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { FaqSection } from '@/components/layout/FaqSection';
import { CtaSection } from '@/components/layout/CtaSection';
import { Services } from '@/components/sections/Services';
import { Reveal } from '@/components/ui/Reveal';
import { PAGE_KEYWORDS } from '@/data/seo';
import styles from '@/components/layout/PageContent.module.scss';

export const metadata: Metadata = {
  title: { absolute: 'Hotel Services & Facilities in Chakradharpur | Hotel K2' },
  description:
    'Hotel facilities in Chakradharpur at Hotel K2 — free Wi-Fi, 24-hour room service, car rental, self-drive scooty, banquet hall, conference hall, catering, ATM, family saloon and power backup.',
  keywords: PAGE_KEYWORDS.services.join(', '),
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Hotel Services & Facilities in Chakradharpur | Hotel K2',
    description:
      'Free Wi-Fi, 24-hour room service, car rental, banquet and conference hall, catering and more at Hotel K2, Chakradharpur.',
    url: '/services',
    images: [{ url: '/newimages/receptionmain.png', width: 1200, height: 630, alt: 'Hotel K2 facilities — Chakradharpur' }],
  },
};

const SERVICE_DETAILS = [
  {
    title: 'Free Wi-Fi & entertainment',
    body: 'Stay connected with free high-speed Wi-Fi in your room and throughout the hotel, plus LED television for downtime.',
  },
  {
    title: '24-hour room service',
    body: 'Our front desk and room service run around the clock, so help is always a call away — day or night.',
  },
  {
    title: 'Car rental & self-drive scooty',
    body: 'Explore Chakradharpur, Hirni Falls and the wider West Singhbhum region with on-request car rental or a self-drive scooty.',
  },
  {
    title: 'Banquet & conference hall',
    body: 'Host business meetings, events and celebrations in our banquet and conference hall, with catering available.',
  },
  {
    title: 'Catering & dining space',
    body: 'In-house catering and a dedicated dining space and kitchen support everything from family meals to functions.',
  },
  {
    title: 'Practical essentials',
    body: 'Power backup, an on-site ATM, family saloon and baby food on request keep your stay convenient and comfortable.',
  },
];

const FAQS = [
  {
    q: 'What facilities does Hotel K2 in Chakradharpur offer?',
    a: 'Hotel K2 offers free Wi-Fi, LED TV, AC rooms, 24-hour room service, 24-hour front desk, power backup, car rental, self-drive scooty, a banquet and conference hall, catering, an ATM and a family saloon.',
  },
  {
    q: 'Does Hotel K2 provide car rental and scooty in Chakradharpur?',
    a: 'Yes. Car rental and self-drive scooty are available on request, making it easy to visit nearby attractions such as Hirni Falls, Nakti Dam and local temples.',
  },
  {
    q: 'Is free Wi-Fi available in the rooms?',
    a: 'Yes. Free high-speed Wi-Fi is available in all rooms and common areas at Hotel K2, Chakradharpur.',
  },
  {
    q: 'Can Hotel K2 host meetings and events?',
    a: 'Yes. Hotel K2 has a conference and banquet hall suitable for business meetings, functions and celebrations, with catering available on request.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Services"
        title="Hotel Services & Facilities in Chakradharpur"
        subtitle="Everything you need for a comfortable stay — from free Wi-Fi and 24-hour room service to car rental, banquet hall and catering."
        breadcrumbLabel="Services"
        path="/services"
      />

      <Services />

      <section className={`${styles.band} ${styles.bandAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>In Detail</span>
            <h2 className={styles.heading}>Facilities that make your stay easy</h2>
            <p className={styles.lead}>
              Hotel K2 is built around the needs of travellers in Chakradharpur — practical
              essentials, dependable service and a few extras that make a difference.
            </p>
          </div>

          <div className={styles.grid3}>
            {SERVICE_DETAILS.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 100} className={styles.tile}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={FAQS} title="Hotel facilities in Chakradharpur — FAQ" id="services-faq-heading" />

      <CtaSection
        title="Stay with all the essentials"
        text="Book your room at Hotel K2 and enjoy free Wi-Fi, 24-hour room service, power backup and more, right in the heart of Chakradharpur."
        secondaryHref="/rooms"
        secondaryLabel="View our rooms"
      />
    </>
  );
}
