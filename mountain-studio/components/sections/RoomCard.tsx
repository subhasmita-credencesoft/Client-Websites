"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { bookingEngineUrl } from "@/lib/data";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-gold/15 bg-dark-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/10 to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {room.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-gold/30 bg-dark/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold-light">
              {badge}
            </span>
          ))}
        </div>
        <button
          aria-label="Add to wishlist"
          onClick={() => setLiked((value) => !value)}
          className="absolute right-5 top-5 rounded-full border border-gold/30 bg-dark/60 p-3 text-ivory transition hover:scale-110"
        >
          <Heart size={16} className={liked ? "fill-gold text-gold" : ""} />
        </button>
        <div className="absolute inset-x-5 bottom-5 translate-y-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gold/15 bg-dark/70 p-4 text-xs uppercase tracking-[0.24em] text-ivory/75 backdrop-blur">
            <span>{room.size} SQFT</span>
            <span>{room.guests} Guests</span>
            <span>{room.view}</span>
          </div>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl">{room.name}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-ivory/50">{room.beds}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((item) => (
            <span key={item} className="rounded-full bg-dark-3 px-3 py-1 text-xs text-ivory/55">
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={`/rooms/${room.slug}`} className="rounded-full border border-gold px-4 py-3 text-xs uppercase tracking-[0.28em] text-gold transition hover:bg-gold hover:text-dark">
            View Details
          </Link>
          <Link href={bookingEngineUrl} className="rounded-full bg-gold px-4 py-3 text-xs uppercase tracking-[0.28em] text-dark transition hover:bg-gold-light">
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
