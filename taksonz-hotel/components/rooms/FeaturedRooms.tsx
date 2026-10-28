"use client";

import { RoomCard } from "./RoomCard";
import { Reveal } from "@/components/ui/Reveal";
import { useLiveRooms } from "@/lib/api/LiveRoomsProvider";

export function FeaturedRooms({ className }: { className?: string }) {
  const { rooms } = useLiveRooms();

  return (
    <ul className={className}>
      {rooms.map((r, i) => (
        <Reveal as="li" key={r.slug} delay={i * 0.08}>
          <RoomCard room={r} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" />
        </Reveal>
      ))}
    </ul>
  );
}
