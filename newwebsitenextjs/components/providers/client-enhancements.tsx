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

    const activateAnimations = () => {
      setReady(true);
      setEnableAnimations(isAnimationEligibleRoute && !lowMemory);
    };

    const activateSmoothScroll = () => {
      setReady(true);
      setEnableSmoothScroll(isDesktop && hasFinePointer && !lowMemory);
    };

    let animationActivated = false;
    const activateAnimationsOnce = () => {
      if (animationActivated) return;
      animationActivated = true;
      activateAnimations();
    };

    let smoothActivated = false;
    const activateSmoothScrollOnce = () => {
      if (smoothActivated) return;
      smoothActivated = true;
      activateSmoothScroll();
    };

    const onScrollIntent = () => {
      activateAnimationsOnce();
      window.removeEventListener("scroll", onScrollIntent, listenerOptions);
    };

    const onSmoothIntent = () => {
      activateAnimationsOnce();
      activateSmoothScrollOnce();
      window.removeEventListener("pointerdown", onSmoothIntent, listenerOptions);
      window.removeEventListener("touchstart", onSmoothIntent, listenerOptions);
      window.removeEventListener("keydown", onSmoothIntent);
      window.removeEventListener("wheel", onSmoothIntent, listenerOptions);
    };

    const listenerOptions: AddEventListenerOptions = { passive: true };

    window.addEventListener("scroll", onScrollIntent, listenerOptions);
    window.addEventListener("pointerdown", onSmoothIntent, listenerOptions);
    window.addEventListener("touchstart", onSmoothIntent, listenerOptions);
    window.addEventListener("keydown", onSmoothIntent);
    window.addEventListener("wheel", onSmoothIntent, listenerOptions);

    const animationIdleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(() => activateAnimationsOnce(), { timeout: 1800 })
      : 0;
    const animationTimer = window.setTimeout(() => {
      activateAnimationsOnce();
    }, 1100);

    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(() => activateSmoothScrollOnce(), { timeout: 4200 })
      : 0;
    const timer = window.setTimeout(() => {
      activateSmoothScrollOnce();
    }, 3600);

    return () => {
      window.removeEventListener("scroll", onScrollIntent, listenerOptions);
      window.removeEventListener("pointerdown", onSmoothIntent, listenerOptions);
      window.removeEventListener("touchstart", onSmoothIntent, listenerOptions);
      window.removeEventListener("keydown", onSmoothIntent);
      window.removeEventListener("wheel", onSmoothIntent, listenerOptions);
      window.clearTimeout(animationTimer);
      window.clearTimeout(timer);
      if ("cancelIdleCallback" in window && animationIdleId) {
        window.cancelIdleCallback(animationIdleId);
      }
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
