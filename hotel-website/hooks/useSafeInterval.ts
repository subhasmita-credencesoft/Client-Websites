"use client";

import { useEffect, useRef } from "react";

export default function useSafeInterval(
  callback: () => void,
  delayMs: number,
  enabled = true,
  resetKey?: string | number | boolean,
) {
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      try {
        cbRef.current();
      } catch (error) {
        console.error("Interval callback failed:", error);
      }
    }, delayMs);

    return () => window.clearInterval(id);
  }, [delayMs, enabled, resetKey]);
}
