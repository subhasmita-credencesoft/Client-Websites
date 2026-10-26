import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/CtaBand';
import { Properties } from '@/components/sections/Properties';
import { images } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Hotels managed by DJHMS, including Hotel Maharana Inn (Mumbai) and Hotel Sitara Residency (Navi Mumbai).',
  alternates: { canonical: '/properties' },
};

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        image={images.property.src}
        crumb="Properties"
        title="Our Properties"
        subtitle="Explore our managed portfolio featuring Hotel Maharana Inn in Chembur, Mumbai and Hotel Sitara Residency in Kalamboli, Navi Mumbai."
      />
      <Properties layout="grid" />
      <CtaBand />
    </>
  );
}
