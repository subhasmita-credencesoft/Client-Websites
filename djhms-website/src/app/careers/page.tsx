import type { Metadata } from 'next';
import { Careers } from '@/components/sections/Careers';
import { CtaBand } from '@/components/sections/CtaBand';
import { OpenPositions } from '@/components/sections/OpenPositions';
import { images } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Build your career in hospitality with DJHMS. See open positions and apply online.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader image={images.career.src} crumb="Careers" title="Careers at DJHMS" subtitle="Explore open roles and apply online – we are always looking for people who love hospitality." />
      <OpenPositions />
      <Careers />
      <CtaBand hide="careers" />
    </>
  );
}
