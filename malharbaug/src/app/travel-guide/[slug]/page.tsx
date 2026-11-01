import { notFound } from 'next/navigation';
import { travelGuides } from '@/data/travelGuide';
import TravelGuidePostView from '@/features/travel-guide/TravelGuidePostView';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return travelGuides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = travelGuides.find((g) => g.slug === params.slug);
  if (!guide) return { title: 'Guide Not Found' };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/travel-guide/${guide.slug}/` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.date,
      images: [{ url: guide.image, alt: guide.imageAlt }],
    },
  };
}

export default function TravelGuideArticlePage({ params }: Props) {
  const guide = travelGuides.find((g) => g.slug === params.slug);
  if (!guide) notFound();
  return <TravelGuidePostView slug={params.slug} />;
}
