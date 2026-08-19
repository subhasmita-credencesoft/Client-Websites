'use client';

import { useState, useEffect } from 'react';
import type { Room } from '@/types';
import { fetchRooms, type AvailabilityParams } from '@/lib/api';
import { ROOMS } from '@/data/rooms';

interface UseRoomsResult {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

interface UseRoomResult {
  room: Room | undefined;
  loading: boolean;
  error: string | null;
}

export function useRooms(params: AvailabilityParams = {}): UseRoomsResult {
  const [rooms, setRooms] = useState<Room[]>(ROOMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fromDate = params.fromDate;
  const toDate = params.toDate;
  const noOfRooms = params.noOfRooms;
  const noOfPersons = params.noOfPersons;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const apiRooms = await fetchRooms({ fromDate, toDate, noOfRooms, noOfPersons });
        if (!cancelled && apiRooms.length > 0) {
          setRooms(apiRooms);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load rooms');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [fromDate, toDate, noOfRooms, noOfPersons]);

  return { rooms, loading, error };
}

export function useRoom(slug: string, params: AvailabilityParams = {}): UseRoomResult {
  const staticRoom = ROOMS.find((r) => r.slug === slug);
  const [room, setRoom] = useState<Room | undefined>(staticRoom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fromDate = params.fromDate;
  const toDate = params.toDate;
  const noOfRooms = params.noOfRooms;
  const noOfPersons = params.noOfPersons;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const allRooms = await fetchRooms({ fromDate, toDate, noOfRooms, noOfPersons });
        const found = allRooms.find((r) => r.slug === slug);
        if (!cancelled && found) {
          setRoom(found);
        } else if (!cancelled) {
          setRoom(staticRoom);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load room');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug, fromDate, toDate, noOfRooms, noOfPersons, staticRoom]);

  return { room, loading, error };
}
