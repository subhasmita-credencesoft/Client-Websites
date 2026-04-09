"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_PROPERTY_ID, fetchPropertyById } from "../../lib/services/propertyService";
import type { PropertyApiResponse } from "../../types/property";
import useErrorHandler from "@/hooks/useErrorHandler";

const PROPERTY_CACHE_KEY = `property-data:${DEFAULT_PROPERTY_ID}`;

let memoryCache: PropertyApiResponse | null = null;

function readCachedProperty(): PropertyApiResponse | null {
  if (memoryCache) return memoryCache;
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(PROPERTY_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PropertyApiResponse | null;
    memoryCache = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function writeCachedProperty(property: PropertyApiResponse | null) {
  memoryCache = property;
  if (typeof window === "undefined") return;

  try {
    if (!property) {
      window.sessionStorage.removeItem(PROPERTY_CACHE_KEY);
      return;
    }
    window.sessionStorage.setItem(PROPERTY_CACHE_KEY, JSON.stringify(property));
  } catch {
    // Ignore cache write failures and keep runtime data available.
  }
}

type PropertyContextValue = {
  property: PropertyApiResponse | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const PropertyDataContext = createContext<PropertyContextValue | undefined>(undefined);

export function PropertyDataProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [property, setProperty] = useState<PropertyApiResponse | null>(() => readCachedProperty());
  const [isLoading, setIsLoading] = useState(() => !readCachedProperty());
  const [error, setError] = useState<string | null>(null);
  const { logError, notifyError } = useErrorHandler();

  const load = useCallback(async (signal?: AbortSignal, background = false) => {
    if (!background) {
      setIsLoading(true);
    }
    setError(null);
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await fetchPropertyById(DEFAULT_PROPERTY_ID, { signal });
        setProperty(response);
        writeCachedProperty(response);
        setError(null);
        break;
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          break;
        }
        logError(`Property fetch failed (attempt ${attempt}/${maxAttempts})`, err);
        if (attempt === maxAttempts) {
          setError(
            notifyError(
              err,
              "We could not load property details right now. Please refresh.",
            ),
          );
          if (!readCachedProperty()) {
            setProperty(null);
          }
        }
      }
    }
    if (!background) {
      setIsLoading(false);
    }
  }, [logError, notifyError]);

  useEffect(() => {
    const controller = new AbortController();
    const cachedProperty = readCachedProperty();
    const isHomePage = pathname === "/";
    const delayMs = cachedProperty ? (isHomePage ? 1600 : 600) : (isHomePage ? 450 : 0);
    const id = window.setTimeout(() => {
      void load(controller.signal, Boolean(cachedProperty));
    }, delayMs);
    return () => {
      window.clearTimeout(id);
      controller.abort();
    };
  }, [load, pathname]);

  const refresh = useCallback(async () => load(undefined, false), [load]);

  const value = useMemo<PropertyContextValue>(
    () => ({
      property,
      isLoading,
      error,
      refresh,
    }),
    [property, isLoading, error, refresh],
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
