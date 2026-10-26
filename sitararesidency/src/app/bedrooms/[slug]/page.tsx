import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RoomDetailView } from '@/features/rooms';
import { business } from '@/core/config/business';
import { roomSlugsById } from '@/core/config/hotelmate';
import {
  defaultStayParams,
  findRoom,
  getHotelMateProperty,
  roomSlugForId,
  roomsToCards,
  roomToDetail,
} from '@/features/booking';
import type { HotelMateRoom } from '@/core/types/hotelmate';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

async function loadRoom(slug: string): Promise<HotelMateRoom | undefined> {
  const property = await getHotelMateProperty(defaultStayParams());
  return findRoom(property, slug);
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = new Set<string>();

  for (const slug of Object.values(roomSlugsById)) {
    slugs.add(slug);
  }

  for (const id of Object.keys(roomSlugsById)) {
    slugs.add(id);
  }

  try {
    const property = await getHotelMateProperty(defaultStayParams());
    for (const room of property.roomList ?? []) {
      const slug = roomSlugForId(room.id) ?? `room-${room.id}`;
      slugs.add(slug);
      slugs.add(String(room.id));
    }
  } catch {
    // Graceful fallback to static mappings if API is unreachable
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await loadRoom(slug);
  if (!room) return { title: 'Room', description: `Rooms at ${business.name}.` };
  return {
    title: `${room.name ?? 'Suite'} | ${business.name}`,
    description: `Book ${room.name ?? 'Suite'} at ${business.name}, Kalamboli, Navi Mumbai. Best rate guarantee with direct booking.`,
  };
}

export default async function BedroomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getHotelMateProperty(defaultStayParams());
  const room = findRoom(property, slug);
  if (!room) notFound();

  const otherRooms = roomsToCards(
    (property.roomList ?? []).filter((r) => r.id !== room.id),
  );

  return (
    <RoomDetailView
      detail={roomToDetail(room)}
      otherRooms={otherRooms}
    />
  );
}