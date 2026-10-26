import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { images } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Diamond Jubilee Hotel Management Services in Sakinaka, Mumbai – enquiries, partnerships and guest support.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader image={images.hero.src} crumb="Contact Us" title="Get in Touch" subtitle="We are here to help. Send us your enquiry and we will get back to you shortly." />
      <Contact />
    </>
  );
}
