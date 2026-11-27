import React from 'react';
import type { Metadata } from 'next';
import { Room, getRoomBySlugOrId } from '@/data/roomsData';
import { fetchAvailableRooms } from '@/services/hotelApi';
import RoomDetailClient from './RoomDetailClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const rooms = await fetchAvailableRooms();
    if (rooms && rooms.length > 0) {
      return rooms.flatMap((room) => [
        { slug: room.slug },
        { slug: room.id },
      ]);
    }
  } catch (error) {
    console.warn('API fetch during generateStaticParams failed, using known room routes', error);
  }

  // Fallback room route params so static export succeeds even without active build network
  return [
    { slug: 'super-deluxe-room' },
    { slug: '6079' },
    { slug: 'premium-deluxe-mud-cottages' },
    { slug: '8675' },
    { slug: 'luxury-suite-cottage' },
    { slug: '8676' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const rooms = await fetchAvailableRooms();
    const room = getRoomBySlugOrId(params.slug, rooms);
    if (!room) {
      return {
        title: 'Accommodations | Tarangan Resort Nagaon-Alibag',
        description: 'Discover luxury cottages and suites at Tarangan Resort Nagaon-Alibag.',
      };
    }

    return {
      title: `${room.title} | Tarangan Resort Nagaon-Alibag`,
      description: room.shortDescription,
      openGraph: {
        title: `${room.title} - Tarangan Resort Nagaon-Alibag`,
        description: room.shortDescription,
        images: [
          {
            url: room.images[0] || '/images/hero/hero-drone-sunset.jpg',
            width: 1200,
            height: 630,
            alt: room.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Accommodations | Tarangan Resort Nagaon-Alibag',
    };
  }
}

export default async function RoomDetailPage({ params }: Props) {
  let room: Room | undefined = undefined;
  let similarRooms: Room[] = [];

  try {
    const rooms = await fetchAvailableRooms();
    room = getRoomBySlugOrId(params.slug, rooms);
    if (room) {
      similarRooms = rooms.filter((r) => r.id !== room?.id).slice(0, 3);
    }
  } catch (error) {
    console.error('SSR Room fetch error:', error);
  }

  return (
    <RoomDetailClient
      slug={params.slug}
      initialRoom={room}
      initialSimilarRooms={similarRooms}
    />
  );
}
