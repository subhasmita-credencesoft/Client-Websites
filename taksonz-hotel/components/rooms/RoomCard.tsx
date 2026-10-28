"use client";

import Link from "next/link";
import { BedDouble, Maximize2, Users, Utensils, AlertCircle } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { formatINR, type Room } from "@/data/rooms";
import { buildBookingUrl } from "@/data/site";
import { useLiveRooms } from "@/lib/api/LiveRoomsProvider";
import styles from "./RoomCard.module.scss";

export function RoomCard({ room, sizes = "(min-width: 768px) 50vw, 100vw" }: { room: Room; sizes?: string }) {
  const { rooms, loading } = useLiveRooms();
  const currentRoom = rooms.find((item) => item.slug === room.slug) ?? room;
  const img = currentRoom.images[0];
  const hasBreakfast = currentRoom.ratePlans?.some((p) => p.isBreakfastIncluded || p.name.toLowerCase().includes("breakfast"));
  const isUrgent = typeof currentRoom.availableRooms === "number" && currentRoom.availableRooms <= 3 && currentRoom.availableRooms > 0;

  return (
    <article className={styles.card}>
      <Link href={`/rooms/${room.slug}`} className={styles.media} tabIndex={-1} aria-hidden>
        {img ? <Photo src={img.src} alt="" decorative sizes={sizes} /> : <span className={styles.photoStatus}>{loading ? "Loading room photo…" : "Room photo unavailable"}</span>}
        {isUrgent && (
          <span className={styles.badgeUrgent}>
            <AlertCircle size={13} /> Only {currentRoom.availableRooms} {currentRoom.availableRooms === 1 ? "room" : "rooms"} left
          </span>
        )}
      </Link>
      <div className={styles.body}>
        <div>
          <h3><Link href={`/rooms/${currentRoom.slug}`} className={styles.title}>{currentRoom.name}</Link></h3>
          <div className={styles.rateRow}>
            <p className={styles.rate}>From <strong>{formatINR(currentRoom.fromRate)}</strong> / night</p>
            {hasBreakfast && (
              <span className={styles.breakfastPill} title="Breakfast plan available">
                <Utensils size={12} /> Breakfast option
              </span>
            )}
          </div>
        </div>

        <ul className={styles.meta}>
          <li><BedDouble size={16} aria-hidden /> {currentRoom.bed}</li>
          <li><Users size={16} aria-hidden /> Up to {currentRoom.maxGuests} Guests</li>
          <li><Maximize2 size={16} aria-hidden /> {currentRoom.sizeSqm} m²</li>
        </ul>

        {currentRoom.ratePlans && currentRoom.ratePlans.length > 1 && (
          <p className={styles.plansCount}>
            {currentRoom.ratePlans.length} plans available: {currentRoom.ratePlans.map((p) => p.name.replace(/ plan/i, "")).join(" · ")}
          </p>
        )}

        <div className={styles.actions}>
          <Link href={`/rooms/${currentRoom.slug}`} className={styles.more}>
            View details<span className="visually-hidden"> for {currentRoom.name}</span> <span aria-hidden className={styles.arrow}>→</span>
          </Link>
          <a
            href={buildBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
          >
            Book Now
          </a>
        </div>
      </div>
    </article>
  );
}
