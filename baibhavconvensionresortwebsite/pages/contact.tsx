import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import ContactForm from '@/components/sections/ContactForm';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/ContactPage.module.scss';
import { CONTACT_FAQS } from '@/data/faqs';
import { SITE } from '@/data/site';

interface ContactPageProps {
  inquiry?: string;
}

const CONTACT_CARDS = [
  {
    icon: 'solar:map-point-bold',
    title: 'Resort Address',
    lines: [SITE.address],
  },
  {
    icon: 'solar:phone-calling-rounded-bold',
    title: 'Room Reservations',
    lines: [SITE.phoneReservations, SITE.emailStay],
    tel: `tel:+${SITE.phoneReservationsRaw}`,
  },
  {
    icon: 'solar:calendar-bold',
    title: 'Event & Wedding Sales',
    lines: [SITE.phoneEvents, SITE.emailEvents],
    tel: `tel:+${SITE.phoneEventsRaw}`,
  },
  {
    icon: 'simple-icons:whatsapp',
    title: 'WhatsApp Instant Support',
    lines: ['Chat with our team anytime'],
    whatsapp: `https://wa.me/${SITE.whatsappRaw}`,
  },
];

const MAP_EMBED = 'https://www.google.com/maps?q=Phulnakhara%20Cuttack%20Bhubaneswar%20NH16&output=embed';

const ContactPage: NextPage<ContactPageProps> = ({ inquiry = '' }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Baibhab Resorts & Conventions',
    url: `${SITE.domain}/contact`,
    mainEntity: {
      '@type': 'Hotel',
      name: SITE.name,
      telephone: SITE.phoneReservations,
      email: SITE.emailGeneral,
      address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressRegion: 'Odisha', addressCountry: 'IN' },
    },
  };

  return (
    <>
      <Seo
        title="Contact Baibhab Resorts — Phone, WhatsApp & Address"
        description="Reach Baibhab Resorts & Conventions  room reservations, event and wedding sales, WhatsApp instant support, and a quick contact form."
        path="/contact"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/newedit/Gate new Design.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Contact & Inquiries' },
        ]}
        eyebrow="Contact & Inquiries"
        title="Connect With Us"
        subtitle="Have questions about room availability or planning an event? Our team is ready to help 24/7."
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.grid}>
          {CONTACT_CARDS.map((card) => (
            <div key={card.title} className={styles.card} data-reveal data-reveal-stagger>
              <iconify-icon icon={card.icon} width="28" aria-hidden="true" />
              <p className={styles.cardTitle}>{card.title}</p>
              {card.lines.map((line) => (
                <p key={line} className={styles.cardText}>
                  {line}
                </p>
              ))}
              {card.tel && (
                <a href={card.tel} className={styles.cardLink}>
                  Call now
                </a>
              )}
              {card.whatsapp && (
                <a
                  href={card.whatsapp}
                  className={styles.cardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ marginTop: 72, marginBottom: 96 }}>
        <div className={styles.split} data-reveal>
          <div className={styles.formWrap}>
            <h2 className="h2">Send us a message</h2>
            <div style={{ marginTop: 24 }}>
              <ContactForm initialInquiry={inquiry} />
            </div>
          </div>
          <div className={styles.mapWrap}>
            <iframe
              title="Map  Baibhab Resorts & Conventions, Phulnakhara"
              src={MAP_EMBED}
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <FaqSection
        items={CONTACT_FAQS}
        eyebrow="Contact FAQs"
        title="Questions About Reaching Us"
        subtitle="How to reach the resort, response times, site visits and pickup assistance."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  return {
    props: {
      inquiry: '',
    },
  };
};

export default ContactPage;
