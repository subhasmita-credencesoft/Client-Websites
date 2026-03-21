"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }
  const media = window.matchMedia(query);
  const listener = () => onStoreChange();
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function getSnapshot(query: string) {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(query).matches;
}

export default function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => getSnapshot(query),
    () => false,
  );
}
