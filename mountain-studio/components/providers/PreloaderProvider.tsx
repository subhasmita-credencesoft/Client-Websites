"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

interface PreloaderContextValue {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function PreloaderProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let releaseTimer: number | null = null;
    let fallbackTimer: number | null = null;

    const finishLoading = () => {
      if (releaseTimer) {
        window.clearTimeout(releaseTimer);
      }

      // Keep the preloader visible briefly after load so the existing exit animation still feels intentional.
      releaseTimer = window.setTimeout(() => setIsLoading(false), 900);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    // Fallback in case the load event is delayed by third-party assets.
    fallbackTimer = window.setTimeout(() => setIsLoading(false), 3500);

    return () => {
      window.removeEventListener("load", finishLoading);
      if (releaseTimer) {
        window.clearTimeout(releaseTimer);
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading]);

  return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>;
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within PreloaderProvider");
  }
  return context;
}
