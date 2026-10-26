import Link from "next/link";
import { BedDouble, Maximize2, Users, Utensils, AlertCircle } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { formatINR, type Room } from "@/data/rooms";
import { buildBookingUrl } from "@/data/site";
import styles from "./RoomCard.module.scss";

export function RoomCard({ room, sizes = "(min-width: 768px) 50vw, 100vw" }: { room: Room; sizes?: string }) {
  const img = room.images[0]!;
  const hasBreakfast = room.ratePlans?.some((p) => p.isBreakfastIncluded || p.name.toLowerCase().includes("breakfast"));
  const isUrgent = typeof room.availableRooms === "number" && room.availableRooms <= 3 && room.availableRooms > 0;

  return (
    <article className={styles.card}>
      <Link href={`/rooms/${room.slug}`} className={styles.media} tabIndex={-1} aria-hidden>
        <Photo src={img.src} alt="" decorative sizes={sizes} />
        {isUrgent && (
          <span className={styles.badgeUrgent}>
            <AlertCircle size={13} /> Only {room.availableRooms} {room.availableRooms === 1 ? "room" : "rooms"} left
          </span>
        )}
      </Link>
      <div className={styles.body}>
        <div>
          <h3><Link href={`/rooms/${room.slug}`} className={styles.title}>{room.name}</Link></h3>
          <div className={styles.rateRow}>
            <p className={styles.rate}>From <strong>{formatINR(room.fromRate)}</strong> / night</p>
            {hasBreakfast && (
              <span className={styles.breakfastPill} title="Breakfast plan available">
                <Utensils size={12} /> Breakfast option
              </span>
            )}
          </div>
        </div>

        <ul className={styles.meta}>
          <li><BedDouble size={16} aria-hidden /> {room.bed}</li>
          <li><Users size={16} aria-hidden /> Up to {room.maxGuests} Guests</li>
          <li><Maximize2 size={16} aria-hidden /> {room.sizeSqm} m²</li>
        </ul>

        {room.ratePlans && room.ratePlans.length > 1 && (
          <p className={styles.plansCount}>
            {room.ratePlans.length} plans available: {room.ratePlans.map((p) => p.name.replace(/ plan/i, "")).join(" · ")}
          </p>
        )}

        <div className={styles.actions}>
          <Link href={`/rooms/${room.slug}`} className={styles.more}>
            View details<span className="visually-hidden"> for {room.name}</span> <span aria-hidden className={styles.arrow}>→</span>
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
