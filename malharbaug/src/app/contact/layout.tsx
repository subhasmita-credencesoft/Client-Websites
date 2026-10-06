import type { Metadata } from 'next';
import { getContact } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  const locality = contact.address.addressLocality || 'Alibaug';

  return {
    title: 'Contact & Book Direct',
    description: `Contact Malhar Baug Resort in ${locality}, Alibaug for direct bookings, group stays and event enquiries. Call ${contact.phoneDisplay} or send us a message — we reply quickly.`,
    alternates: { canonical: '/contact/' },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
