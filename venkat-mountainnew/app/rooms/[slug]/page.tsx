import { RoomDetailPage } from "@/components/site/RoomDetailPage";
import { roomDetails } from "@/lib/site-data";

type RoomRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function RoomPage({ params }: RoomRouteProps) {
  const { slug } = await params;

  return <RoomDetailPage slug={slug} />;
}

export function generateStaticParams() {
  return roomDetails.map((room) => ({ slug: room.slug }));
}
