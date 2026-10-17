import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { ContactSection } from '@/components/sections/ContactSection';
import { PAGE_KEYWORDS } from '@/data/seo';

export const metadata: Metadata = {
  title: { absolute: 'Contact Hotel K2, Chakradharpur | Phone, Address & Directions' },
  description:
    'Contact Hotel K2, Chakradharpur — call +91 8709490824 or +91 9123490131, email hotelk2.ckp@gmail.com, or visit us at K2 Complex, Etwari Bazar, Station Link Road, near Chakradharpur Railway Station.',
  keywords: PAGE_KEYWORDS.contact.join(', '),
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Hotel K2, Chakradharpur | Phone, Address & Directions',
    description:
      'Call, email or message Hotel K2 in Chakradharpur for bookings and directions. 24-hour front desk at Etwari Bazar, Station Link Road.',
    url: '/contact',
    images: [{ url: '/newimages/receptionmain.png', width: 1200, height: 630, alt: 'Contact Hotel K2 — Chakradharpur' }],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Contact Us"
        title="Contact Hotel K2, Chakradharpur"
        subtitle="Questions about your stay, bookings or directions? Our 24-hour front desk is here to help — call, email or send us a message."
        breadcrumbLabel="Contact Us"
        path="/contact"
      />

      <ContactSection />
    </>
  );
}
