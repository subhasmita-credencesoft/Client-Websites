import type { Metadata } from 'next';
import RoomDetail from '@/components/rooms/RoomDetail';
import { fetchRoom, fetchRoomIds } from '@/lib/api/hotel';
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
        title: result.room.name,
        description: result.room.description || `Details, live tariff and rate plans for the ${result.room.name} at Hotel Krishna Palace, Hosapete.`,
        path: `/rooms-rates/${id}/`,
        image: result.room.images[0],
        imageAlt: `${result.room.name} at Hotel Krishna Palace, Hosapete`,
      });
    }
  } catch {
    // fall through to the default metadata below
  }
  return seo({
    title: 'Room details',
    description: 'Room details, live tariff and rate plans at Hotel Krishna Palace, Hosapete.',
    path: `/rooms-rates/${id}/`,
    noIndex: true,
  });
}

export default async function RoomPage({ params }: PageProps) {
  const { id } = await params;
  return <RoomDetail id={id} />;
}
