"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export default function useClientReady() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
