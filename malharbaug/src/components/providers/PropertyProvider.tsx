'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { ContactInfo } from '@/lib/api';
import type { Room } from '@/types';

interface PropertyContextValue {
  rooms: Room[];
  contact: ContactInfo;
}

const PropertyContext = createContext<PropertyContextValue | null>(null);

export function PropertyProvider({
  rooms,
  contact,
  children,
}: PropertyContextValue & { children: ReactNode }) {
  const value = useMemo(() => ({ rooms, contact }), [rooms, contact]);

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function useProperty(): PropertyContextValue {
  const value = useContext(PropertyContext);
  if (!value) {
    throw new Error('useProperty must be used within a <PropertyProvider>.');
  }
  return value;
}

export function useRooms(): Room[] {
  return useProperty().rooms;
}

export function useContact(): ContactInfo {
  return useProperty().contact;
}
