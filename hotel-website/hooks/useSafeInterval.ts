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
      } catch {
        // Swallow interval callback errors so recurring UI timers do not break the layout.
      }
    }, delayMs);

    return () => window.clearInterval(id);
  }, [delayMs, enabled, resetKey]);
}
