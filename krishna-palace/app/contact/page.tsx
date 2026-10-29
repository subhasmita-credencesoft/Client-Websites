import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ContactDetails from '@/components/sections/contact/ContactDetails';
import FaqSection from '@/components/common/FaqSection';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { contactFaqs } from '@/data/faqs';
import { hotel } from '@/data/site';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Contact Hotel Krishna Palace, Hosapete',
  description:
    'Contact Hotel Krishna Palace on Station Road, Hosapete. Call +91 90356 80385 or email reservations for room bookings, dining and event inquiries.',
  path: '/contact/',
  image: '/facecadeimage.avif',
  imageAlt: 'Exterior facade of Hotel Krishna Palace on Station Road in Hosapete',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={[
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://krishnapalacehotel.com/' },
            { name: 'Contact & Directions', url: 'https://krishnapalacehotel.com/contact/' },
          ]),
          getFaqSchema(contactFaqs),
        ]}
      />

      <PageHero
        title="Contact Hotel Krishna Palace, Hosapete"
        eyebrow="Contact & directions"
        description="For room enquiries, restaurant questions, event details or a little help before you arrive, reach our team directly."
        image="/facecadeimage.avif"
        alt="Exterior facade and rooftop terrace of Hotel Krishna Palace, Hosapete"
        secondImage="/images/32-tourism-1.jpg"
        secondAlt="The celebrated stone chariot of Hampi in evening light"
        secondTitle="Hosapete, close to Hampi."
        secondDescription="Find us on Station Road, a welcoming base for the heritage region."
      />

      <ContactDetails />

      <FaqSection
        eyebrow="Location & Contact Questions"
        title="Reach & arrivals FAQ."
        body="Common questions regarding directions, check-in, proximity to Hospet Junction, and booking assistance."
        items={contactFaqs}
      />

      <CalloutCTA
        eyebrow="Here to help"
        title="Reach us directly."
        body="Speak with the hotel about your visit, published room tariffs, dining or banquet enquiries."
        actions={[
          { href: `tel:${hotel.phoneHref}`, label: `Call ${hotel.phoneDisplay}` },
          { href: `mailto:${hotel.reservationEmail}`, label: 'Email reservations', outline: true },
        ]}
      />
    </>
  );
}
