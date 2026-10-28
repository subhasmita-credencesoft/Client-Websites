"use client";

import { useState } from "react";
import { RoomCard } from "./RoomCard";
import { Reveal } from "@/components/ui/Reveal";
import { roomCategories } from "@/data/rooms";
import { useLiveRooms } from "@/lib/api/LiveRoomsProvider";
import styles from "./RoomList.module.scss";

export function RoomList() {
  const { rooms } = useLiveRooms();
  const [cat, setCat] = useState<(typeof roomCategories)[number]>("All Rooms");
  const shown = cat === "All Rooms" ? rooms : rooms.filter((r) => r.category === cat);

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter rooms by category">
        {roomCategories.map((c) => (
          <button
            key={c}
            className={styles.chip}
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {shown.length} rooms shown
      </p>
      <ul className={styles.grid}>
        {shown.map((r, i) => (
          <Reveal as="li" key={r.slug} delay={(i % 2) * 0.1}>
            <RoomCard room={r} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
