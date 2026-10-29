import type { Metadata } from 'next';
import RoomDetail from '@/components/rooms/RoomDetail';
import JsonLd from '@/components/seo/JsonLd';
import { DEFAULT_ROOM_DETAILS } from '@/data/rooms';
import { fetchRoom, fetchRoomIds } from '@/lib/api/hotel';
import { getBreadcrumbSchema, getSingleRoomSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const dynamic = 'force-static';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const ids = await fetchRoomIds();
  return ids.map((id) => ({ id }));
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const result = await fetchRoom(id);
    if (result) {
      return seo({
        title: `${result.room.name} | Hotel Krishna Palace`,
        description:
          result.room.description ||
          `Details, published tariff and amenities for the ${result.room.name} at Hotel Krishna Palace in Hosapete near Hampi.`,
        path: `/rooms-rates/${id}/`,
        image: result.room.images[0] || '/images/13-kp-hosapete-suit-room-1.jpg',
        imageAlt: `${result.room.name} at Hotel Krishna Palace, Hosapete`,
      });
    }
  } catch {
    // fallback below
  }

  const fallback = DEFAULT_ROOM_DETAILS[id];
  if (fallback) {
    return seo({
      title: `${fallback.name} | Hotel Krishna Palace`,
      description: fallback.description,
      path: `/rooms-rates/${id}/`,
      image: fallback.images[0] || '/images/13-kp-hosapete-suit-room-1.jpg',
      imageAlt: `${fallback.name} at Hotel Krishna Palace, Hosapete`,
    });
  }

  return seo({
    title: 'Room details | Hotel Krishna Palace',
    description: 'Room details, live tariff and rate plans at Hotel Krishna Palace, Hosapete.',
    path: `/rooms-rates/${id}/`,
    noIndex: true,
  });
}

export default async function RoomPage({ params }: PageProps) {
  const { id } = await params;
  const roomData = await fetchRoom(id);
  const room = roomData?.room || DEFAULT_ROOM_DETAILS[id];

  return (
    <>
      {room && (
        <JsonLd
          schema={[
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://krishnapalacehotel.com/' },
              { name: 'Rooms & Rates', url: 'https://krishnapalacehotel.com/rooms-rates/' },
              { name: room.name, url: `https://krishnapalacehotel.com/rooms-rates/${id}/` },
            ]),
            getSingleRoomSchema(room),
          ]}
        />
      )}
      <RoomDetail id={id} />
    </>
  );
}
