import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ROOMS_DATA,
  Room,
} from '@/data/roomsData';
import { RESORT_DATA } from '@/data/resortData';
import RoomDetailClient from './RoomDetailClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ROOMS_DATA.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = ROOMS_DATA.find((r) => r.slug === params.slug);
  if (!room) {
    return {
      title: 'Room Not Found | Tarangan Resort',
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
          url: room.images[0],
          width: 1200,
          height: 630,
          alt: room.title,
        },
      ],
    },
  };
}

export default function RoomDetailPage({ params }: Props) {
  const room = ROOMS_DATA.find((r) => r.slug === params.slug);
  if (!room) {
    notFound();
  }

  const similarRooms = ROOMS_DATA.filter((r) => r.id !== room.id).slice(0, 3);

  return <RoomDetailClient room={room} similarRooms={similarRooms} />;
}
