import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Malhar Baug Resort | Book Direct in Alibaug',
  description:
    'Contact Malhar Baug Resort in Palhe, Nagaon, Alibaug for room bookings, enquiries, directions and group stays near Nagaon Beach.',
  alternates: { canonical: '/contact/' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
