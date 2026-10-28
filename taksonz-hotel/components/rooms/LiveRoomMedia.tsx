"use client";

import type { ReactNode } from "react";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { PageHero } from "@/components/ui/PageHero";
import { useLiveRooms } from "@/lib/api/LiveRoomsProvider";

interface RoomMediaProps {
  slug: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function LiveRoomHero({ slug, title, subtitle, children }: RoomMediaProps) {
  const { rooms } = useLiveRooms();
  const image = rooms.find((room) => room.slug === slug)?.images[0]?.src;

  return <PageHero title={title} subtitle={subtitle} image={image}>{children}</PageHero>;
}

export function LiveRoomGallery({ slug }: { slug: string }) {
  const { rooms, loading, error } = useLiveRooms();
  const images = rooms.find((room) => room.slug === slug)?.images ?? [];

  if (images.length > 0) return <ImageGrid images={images} variant="strip" />;

  return (
    <p role="status" style={{ paddingBlock: "1rem", color: "var(--grey)" }}>
      {loading ? "Loading room photos…" : error ? "Room photos are temporarily unavailable." : "No room photos are available."}
    </p>
  );
}
