import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import ContactForm from '@/components/sections/ContactForm';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/ContactPage.module.scss';
import { CONTACT_FAQS } from '@/data/faqs';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';

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
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Contact & Inquiries', url: '/contact' },
    ]),
    createFaqSchema(CONTACT_FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Baibhab Resorts & Conventions',
      url: `${SITE.domain}/contact`,
      mainEntity: {
        '@type': 'Hotel',
        name: SITE.name,
        telephone: SITE.phoneReservations,
        email: SITE.emailGeneral,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar–Cuttack Highway (NH-16)',
          addressLocality: 'Phulnakhara, Khordha',
          addressRegion: 'Odisha',
          postalCode: '754001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '20.3844',
          longitude: '85.8603',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
    },
  ];

  return (
    <>
      <Seo
        title="Contact & Enquiries — Reservations & Event Proposals"
        description="Get in touch with Baibhab Resorts & Conventions on NH-16: phone numbers, WhatsApp chat, email, physical address, driving directions, and custom event proposal forms."
        path="/contact"
        keywords="contact baibhab resorts, banquet enquiry phulnakhara, resort contact number bhubaneswar, wedding venue booking phone number odisha, resort address nh16"
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
        subtitle="Have questions about room availability or planning a grand event? Our team is available 24/7 to assist you."
      />

      <div className="container" style={{ marginTop: 56 }}>
        <div className={styles.grid}>
          {CONTACT_CARDS.map((card) => {
            const Wrapper = card.tel ? 'a' : card.whatsapp ? 'a' : 'div';
            const extraProps = card.tel
              ? { href: card.tel }
              : card.whatsapp
                ? { href: card.whatsapp, target: '_blank', rel: 'noopener noreferrer' }
                : {};

            return (
              <Wrapper
                key={card.title}
                {...extraProps}
                className={styles.card}
                data-reveal
                data-reveal-stagger
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <iconify-icon icon={card.icon} width="22" aria-hidden="true" />
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
                <div className={styles.cardBody}>
                  {card.lines.map((line) => (
                    <p key={line} className={styles.cardText}>
                      {line}
                    </p>
                  ))}
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className={styles.split} style={{ marginTop: 56 }}>
          <div className={styles.formCol} data-reveal>
            <p className="caption">Send an inquiry</p>
            <h2 className="h2" style={{ marginTop: 8 }}>
              How can we help you?
            </h2>
            <p className={styles.lead}>
              Share your dates, guest count or event requirements — our team will reply within 24 hours.
            </p>
            <ContactForm initialInquiry={inquiry} />
          </div>

          <div className={styles.mapCol} data-reveal>
            <iframe
              title="Baibhab Resorts & Conventions Location Map"
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
