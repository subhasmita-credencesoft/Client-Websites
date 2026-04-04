"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SmoothScrollProvider = dynamic(
  () => import("./smooth-scroll-provider").then((mod) => mod.SmoothScrollProvider),
  { ssr: false },
);

const AnimationSystem = dynamic(
  () => import("./animation-system").then((mod) => mod.AnimationSystem),
  { ssr: false },
);

export function ClientEnhancements() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [enableAnimations, setEnableAnimations] = useState(false);
  const [enableSmoothScroll, setEnableSmoothScroll] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 1280;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const connection = "connection" in navigator ? (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection : undefined;
    const prefersDataSaving = connection?.saveData === true;
    const slowConnection = connection?.effectiveType?.includes("2g") ?? false;
    const isAnimationEligibleRoute = !pathname.startsWith("/booking-engine");
    const lowMemory = "deviceMemory" in navigator && typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number"
      ? ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 0) <= 4
      : false;

    if (reducedMotion || prefersDataSaving || slowConnection) {
      return;
    }

    const activate = () => {
      setReady(true);
      setEnableAnimations(isAnimationEligibleRoute && !lowMemory);
      setEnableSmoothScroll(isDesktop && hasFinePointer && !lowMemory);
    };

    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(() => activate(), { timeout: 2400 })
      : 0;
    const timer = window.setTimeout(() => {
      activate();
    }, 1800);

    return () => {
      window.clearTimeout(timer);
      if ("cancelIdleCallback" in window && idleId) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [pathname]);

  if (!ready) {
    return null;
  }

  return (
    <>
      {enableSmoothScroll ? <SmoothScrollProvider /> : null}
      {enableAnimations ? <AnimationSystem /> : null}
    </>
  );
}
