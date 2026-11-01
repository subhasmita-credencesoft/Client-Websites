import { notFound } from 'next/navigation';
import { getRooms, resolveRoom, roomSlugs, legacyRoomSlugs } from '@/lib/api';
import RoomDetailView from '@/features/rooms/RoomDetailView';
import { siteConfig } from '@/lib/site';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Props['params'][]> {
  const [slugs, legacySlugs] = await Promise.all([roomSlugs(), legacyRoomSlugs()]);
  return [...slugs, ...legacySlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = resolveRoom(await getRooms(), params.slug);
  if (!room) return { title: 'Room Not Found' };
  return {
    title: `${room.title} in Alibaug`,
    description: `${room.title} at Malhar Baug Resort, Alibaug near Nagaon Beach. ${room.tagline}. ${room.capacity}. Rates ${room.price} — book direct for best rates.`,
    alternates: { canonical: `/rooms/${room.slug}/` },
    openGraph: {
      title: `${room.title} | Malhar Baug Resort Alibaug`,
      description: room.description,
      images: [{ url: room.image, alt: `${room.title} at Malhar Baug Resort Alibaug` }],
    },
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const rooms = await getRooms();
  const room = resolveRoom(rooms, params.slug);
  if (!room) notFound();
  return <RoomDetailView slug={params.slug} />;
}
