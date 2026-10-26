import type { Metadata } from 'next';
import { About } from '@/components/sections/About';
import { CtaBand } from '@/components/sections/CtaBand';
import { ValuesGrid } from '@/components/sections/ValuesGrid';
import { images } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Diamond Jubilee Hotel Management Services – our mission, vision and values.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader image={images.about.src} crumb="About Us" title="About Us" subtitle="A Mumbai-based hospitality management company focused on reliable, professional and guest-centric service." />
      <About />
      <ValuesGrid />
      <CtaBand />
    </>
  );
}
