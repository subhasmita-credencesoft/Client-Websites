"use client";

import { useEffect, useState } from "react";
import type { Room } from "@/data/rooms";
import { apiRooms, fetchLiveRooms } from "./hotelmate";

/**
 * Hook to retrieve live room data directly from TheHotelMate API on the client.
 * Defaults to the pre-seeded API rooms for immediate zero-layout-shift render.
 */
export function useLiveRooms(initialRooms: Room[] = apiRooms) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchLiveRooms()
      .then((live) => {
        if (isMounted && live && live.length > 0) {
          setRooms(live);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err instanceof Error ? err.message : "Error fetching rooms");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { rooms, loading, error };
}
