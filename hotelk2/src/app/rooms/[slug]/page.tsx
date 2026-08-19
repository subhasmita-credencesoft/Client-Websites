import type { Metadata } from 'next';
import { ROOMS } from '@/data/rooms';
import { SITE } from '@/data/site';
import { RoomDetailClient } from '@/components/sections/RoomDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) return { title: `Room not found | ${SITE.name}` };
  return {
    title: `${room.name} | ${SITE.name}`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  return <RoomDetailClient slug={slug} />;
}
