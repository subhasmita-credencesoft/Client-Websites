import Link from "next/link";
import type { Room } from "../../types/room";
import { formatPrice } from "../../lib/format";

type RoomCardProps = {
  room: Room;
};

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm">
      <div
        className="h-72 bg-sand transition duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${room.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <span className="absolute right-6 top-6 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#d98a4a]">
        <span className="text-[#1f3c44]/60">From</span>
        {formatPrice(room.pricePerNight)}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-6 pb-6 pt-24 text-center text-white">
        <h3 className="font-serif text-2xl">{room.name}</h3>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80">
          {room.size} &middot; {room.capacity} PERSON &middot; {room.bedType}
        </p>
        <Link
          href={`/rooms/${room.slug}`}
          className="mt-2 text-xs font-semibold uppercase tracking-[0.3em]"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
