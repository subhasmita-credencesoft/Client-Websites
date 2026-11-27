'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Room } from '@/types';
import {
  fetchAvailableRooms,
  getTodayDateString,
  getTomorrowDateString,
} from '@/services/hotelApi';
import { ROOMS_DATA } from '@/data/roomsData';
import { AvailabilityQueryParams } from '@/types/hotelApi';

interface UseHotelRoomsOptions {
  initialRooms?: Room[];
  fromDate?: string;
  toDate?: string;
  noOfRooms?: number;
  noOfPersons?: number;
  autoFetch?: boolean;
}

export function useHotelRooms(options?: UseHotelRoomsOptions) {
  const [rooms, setRooms] = useState<Room[]>(options?.initialRooms || []);
  const [loading, setLoading] = useState<boolean>(
    !options?.initialRooms || options.initialRooms.length === 0
  );
  const [error, setError] = useState<string | null>(null);

  const [params, setParams] = useState<AvailabilityQueryParams>({
    fromDate: options?.fromDate || getTodayDateString(),
    toDate: options?.toDate || getTomorrowDateString(),
    noOfRooms: options?.noOfRooms || 1,
    noOfPersons: options?.noOfPersons || 1,
  });

  const isMountedRef = useRef(false);

  const refetch = useCallback(async (customParams?: AvailabilityQueryParams) => {
    const query = customParams || params;
    setLoading(true);
    setError(null);

    try {
      const fetchedRooms = await fetchAvailableRooms(query);
      if (Array.isArray(fetchedRooms)) {
        setRooms(fetchedRooms);
      }
    } catch (err: any) {
      console.warn('Failed to fetch rooms from Hotel API:', err);
      setError(err?.message || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (options?.autoFetch !== false) {
        refetch();
      }
      return;
    }

    if (options?.autoFetch !== false) {
      refetch();
    }
  }, [params.fromDate, params.toDate, params.noOfRooms, params.noOfPersons, options?.autoFetch, refetch]);

  const updateDates = useCallback((fromDate: string, toDate: string) => {
    setParams((prev) => ({ ...prev, fromDate, toDate }));
  }, []);

  const updateGuests = useCallback((noOfPersons: number, noOfRooms: number = 1) => {
    setParams((prev) => ({ ...prev, noOfPersons, noOfRooms }));
  }, []);

  return {
    rooms,
    loading,
    error,
    params,
    setParams,
    updateDates,
    updateGuests,
    refetch,
  };
}
