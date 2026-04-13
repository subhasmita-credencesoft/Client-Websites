import { notFound } from "next/navigation";
import { RoomDetailClient } from "@/components/rooms/RoomDetailClient";
import { rooms } from "@/lib/data";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

interface RoomDetailPageProps {
  params: {
    slug: string;
  };
}

export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  const room = rooms.find((item) => item.slug === params.slug);

  if (!room) {
    notFound();
  }

  const similar = rooms.filter((item) => item.slug !== room.slug).slice(0, 3);

  return <RoomDetailClient room={room} similar={similar} />;
}
