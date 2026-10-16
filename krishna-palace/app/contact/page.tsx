import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ContactDetails from '@/components/sections/contact/ContactDetails';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import { hotel } from '@/data/site';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Contact & directions',
  description: 'Contact Hotel Krishna Palace in Hosapete by phone or email, and find the Station Road address.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="We’re easy to find."
        eyebrow="Contact & directions"
        description="For room enquiries, restaurant questions, event details or a little help before you arrive, reach our team directly."
        image="/facecadeimage.avif"
        alt="Rooftop terrace and Hosapete town beyond"
        secondImage="/FOC00586_converted.jpg"
        secondAlt="The Hampi stone chariot in evening light"
        secondTitle="Hosapete, close to Hampi."
        secondDescription="Find us on Station Road, a welcoming base for the heritage region."
      />

      <ContactDetails />

      <CalloutCTA
        eyebrow="Here to help"
        title="Reach us directly."
        body="Speak with the hotel about your visit, published room tariffs, dining or banquet enquiries."
        actions={[
          { href: `tel:${hotel.phoneHref}`, label: 'Call the hotel' },
          { href: `mailto:${hotel.reservationEmail}`, label: 'Email reservations', outline: true },
        ]}
      />
    </>
  );
}
