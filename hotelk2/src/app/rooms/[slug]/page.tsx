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

  const amenitiesList = room.amenities.map((a) => a.label).join(', ');

  return {
    title: `${room.name} — Hotel K2, Chakradharpur | AC Room with ${amenitiesList}`,
    description: `Book ${room.name} at Hotel K2, Chakradharpur, Jharkhand. ${room.description} ${room.occupancy}. AC room with ${amenitiesList}. Located near Chakradharpur Railway Station, Etwari Bazar, Station Link Road. Hotel room booking Chakradharpur — affordable rates. Call +91 8709490824.`,
    keywords: [
      `${room.name} Chakradharpur`,
      `${room.name} Hotel K2`,
      `AC room Chakradharpur`,
      `Hotel room Chakradharpur`,
      `Hotel K2 ${room.name}`,
      `${room.name} booking Chakradharpur`,
      `Room near Chakradharpur Railway Station`,
      `AC rooms in Chakradharpur`,
      `Hotel rooms in Chakradharpur`,
      `Best AC room in Chakradharpur`,
      `Room booking Chakradharpur`,
      `Hotel room booking Chakradharpur`,
      `Affordable rooms Chakradharpur`,
      `Budget hotel room Chakradharpur`,
      `Hotel room price Chakradharpur`,
      `Hotel K2 rooms`,
      `Hotel K2 room booking`,
      `Hotel K2 online booking`,
      `Best hotel rooms Chakradharpur`,
      `Comfortable rooms Chakradharpur`,
      `AC hotel rooms Chakradharpur`,
      `Hotel room rates Chakradharpur`,
      `Book room in Chakradharpur`,
      `Hotel room reservation Chakradharpur`,
      `Hotel near Etwari Bazar room`,
      `Hotel near Carmel School room Chakradharpur`,
    ].join(', '),
    openGraph: {
      title: `${room.name} — Hotel K2, Chakradharpur`,
      description: `Book ${room.name} at Hotel K2, Chakradharpur. ${room.description}`,
      url: `/rooms/${slug}`,
      images: room.image ? [{ url: room.image, width: 800, height: 600, alt: `${room.name} — Hotel K2, Chakradharpur` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${room.name} — Hotel K2, Chakradharpur`,
      description: `Book ${room.name} at Hotel K2, Chakradharpur. ${room.description}`,
      images: room.image ? [room.image] : [],
    },
    alternates: {
      canonical: `/rooms/${slug}`,
    },
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  return <RoomDetailClient slug={slug} />;
}
