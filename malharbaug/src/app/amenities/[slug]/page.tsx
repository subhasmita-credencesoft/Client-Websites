import { notFound } from 'next/navigation';
import { resortFacilities } from '@/data/amenities';
import AmenityDetailView from '@/features/amenities/AmenityDetailView';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return resortFacilities.map((facility) => ({ slug: facility.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const facility = resortFacilities.find((f) => f.slug === params.slug);
  if (!facility) return { title: 'Facility Not Found' };
  return {
    title: `${facility.title} at the Resort`,
    description: `${facility.title} at Malhar Baug Resort, Alibaug — ${facility.description} Book your stay near Nagaon Beach with direct booking rates.`,
    alternates: { canonical: `/amenities/${facility.slug}/` },
  };
}

export default function AmenityDetailPage({ params }: Props) {
  const facility = resortFacilities.find((f) => f.slug === params.slug);
  if (!facility) notFound();
  return <AmenityDetailView slug={params.slug} />;
}
