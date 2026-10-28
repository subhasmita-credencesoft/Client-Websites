"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Room } from "@/data/rooms";
import { apiRooms, fetchLiveRooms } from "./hotelmate";

interface LiveRoomsState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

const LiveRoomsContext = createContext<LiveRoomsState | null>(null);

export function LiveRoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(apiRooms);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchLiveRooms()
      .then((liveRooms) => {
        if (active) setRooms(liveRooms);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Unable to load room photos.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <LiveRoomsContext.Provider value={{ rooms, loading, error }}>
      {children}
    </LiveRoomsContext.Provider>
  );
}

export function useLiveRooms(): LiveRoomsState {
  const state = useContext(LiveRoomsContext);
  if (!state) throw new Error("useLiveRooms must be used inside LiveRoomsProvider.");
  return state;
}
