import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Book Direct',
  description:
    'Contact Malhar Baug Resort in Palhe, Nagaon, Alibaug for direct bookings, group stays and event enquiries. Call +91 98765 43210 or send us a message — we reply quickly.',
  alternates: { canonical: '/contact/' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
