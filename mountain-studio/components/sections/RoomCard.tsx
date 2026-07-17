"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { bookingEngineUrl } from "@/lib/data";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group overflow-hidden rounded-[32px] border border-gold/10 bg-dark-2 shadow-[0_4px_40px_rgba(0,0,0,0.3)] transition duration-500 hover:-translate-y-1 hover:border-gold/25 hover:shadow-[0_12px_60px_rgba(201,168,76,0.08)]">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />

        {/* Badges */}
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {room.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-gold/25 bg-dark/65 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-gold-light backdrop-blur-sm">
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist */}
        <button
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          onClick={() => setLiked((v) => !v)}
          className="absolute right-5 top-5 rounded-full border border-white/15 bg-dark/50 p-2.5 text-ivory/80 backdrop-blur-sm transition hover:scale-110 hover:text-gold"
        >
          <Heart size={15} className={liked ? "fill-gold text-gold" : ""} />
        </button>

        {/* Price badge */}
        <div className="absolute right-5 bottom-5 rounded-2xl border border-gold/20 bg-dark/70 px-4 py-2.5 backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">From</p>
          <p className="font-display text-xl text-gold-light">₹{room.price.toLocaleString("en-IN")}</p>
          <p className="text-[10px] text-ivory/55">per night</p>
        </div>

        {/* Quick stats on hover */}
        <div className="absolute inset-x-5 bottom-5 translate-y-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-dark/75 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory/70 backdrop-blur-md">
            <span>{room.size} sqft</span>
            <span className="h-3 w-px bg-gold/30" />
            <span>{room.guests} guests</span>
            <span className="h-3 w-px bg-gold/30" />
            <span>{room.view}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        {/* Title + rating */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-ivory">{room.name}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-ivory/55">{room.beds} · {room.floor}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-gold/20 bg-dark-3 px-3 py-1.5">
            <Star size={12} className="text-gold" fill="currentColor" />
            <span className="text-xs text-ivory/70">{room.rating}</span>
          </div>
        </div>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full bg-dark-3 px-3 py-1 text-[11px] text-ivory/50">
              {item}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="rounded-full bg-dark-3 px-3 py-1 text-[11px] text-ivory/50">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gold/8" />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/rooms/${room.slug}`}
            className="flex-1 rounded-full border border-gold/30 py-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/80 transition hover:border-gold hover:text-gold"
          >
            View Details
          </Link>
          <Link
            href={bookingEngineUrl}
            className="flex-1 rounded-full bg-gold py-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-dark transition hover:bg-gold-light"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
