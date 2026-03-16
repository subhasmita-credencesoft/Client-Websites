"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_PROPERTY_ID, fetchPropertyById } from "../../lib/services/propertyService";
import type { PropertyApiResponse } from "../../types/property";

type PropertyContextValue = {
  property: PropertyApiResponse | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const PropertyDataContext = createContext<PropertyContextValue | undefined>(undefined);

export function PropertyDataProvider({ children }: { children: React.ReactNode }) {
  const [property, setProperty] = useState<PropertyApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await fetchPropertyById(DEFAULT_PROPERTY_ID, { signal });
        setProperty(response);
        setError(null);
        break;
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          break;
        }
        if (attempt === maxAttempts) {
          setError("We could not load property details right now. Please refresh.");
          setProperty(null);
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, []);

  const value = useMemo<PropertyContextValue>(
    () => ({
      property,
      isLoading,
      error,
      refresh: async () => load(),
    }),
    [property, isLoading, error],
  );

  return <PropertyDataContext.Provider value={value}>{children}</PropertyDataContext.Provider>;
}

export function usePropertyData() {
  const context = useContext(PropertyDataContext);
  if (!context) {
    throw new Error("usePropertyData must be used within PropertyDataProvider");
  }
  return context;
}
