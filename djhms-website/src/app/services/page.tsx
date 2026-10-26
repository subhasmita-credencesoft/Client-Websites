import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/CtaBand';
import { Services } from '@/components/sections/Services';
import { images, services } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Hotel management, housekeeping, front office, reservations, maintenance and partnership services from DJHMS.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader image={services[0]?.image ?? images.hero.src} crumb="Services" title="Our Services" subtitle="Comprehensive hospitality management solutions that support hotel operations, guest experiences and business growth." />
      <Services />
      <CtaBand hide="careers" />
    </>
  );
}
