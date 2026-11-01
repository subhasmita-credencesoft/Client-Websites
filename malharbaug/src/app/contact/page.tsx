import type { Metadata } from 'next';
import ContactView from '@/features/contact/ContactView';

export const metadata: Metadata = {
  title: 'Contact Us | Malhar Baug Resort Alibaug',
  description:
    'Contact Malhar Baug Resort, Alibaug — call, WhatsApp or email us for reservations, event bookings and group inquiries. Located in Nagaon, 2 km from Nagaon Beach.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return <ContactView />;
}
