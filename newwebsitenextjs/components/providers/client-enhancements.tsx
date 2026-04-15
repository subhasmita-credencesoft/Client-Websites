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

    let cancelled = false;
    let settledTimer = 0;
    let maxWaitTimer = 0;
    let activationTimer = 0;
    let activationIdleId = 0;
    let observer: MutationObserver | null = null;

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
    const hasEnhancementTargets = Boolean(
      document.querySelector(
        "[data-reveal], [data-card], [data-parallax], [data-bg-parallax], [data-cinematic-section], [data-horizontal-scroll], [data-sticky-fade-section], [data-marquee-track]",
      ),
    );

    if (reducedMotion || prefersDataSaving || slowConnection) {
      const reducedMotionReadyFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;
        setReady(true);
      });

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(reducedMotionReadyFrame);
      };
    }

    if (!hasEnhancementTargets) {
      const readyFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;
        setReady(true);
      });

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(readyFrame);
      };
    }

    const activateAnimations = () => {
      if (cancelled) return;
      setEnableAnimations(isAnimationEligibleRoute && !lowMemory);
    };

    const activateSmoothScroll = () => {
      if (cancelled) return;
      setEnableSmoothScroll(isDesktop && hasFinePointer && !lowMemory);
    };

    const activateAfterHydration = () => {
      if (cancelled) return;

      const commitActivation = () => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (cancelled) return;
            setReady(true);
            activateAnimations();
            activateSmoothScroll();
          });
        });
      };

      if ("requestIdleCallback" in window) {
        activationIdleId = window.requestIdleCallback(() => {
          if (cancelled) return;
          commitActivation();
        }, { timeout: 2200 });
      }

      activationTimer = window.setTimeout(() => {
        if (cancelled) return;
        commitActivation();
      }, 1400);
    };

    const scheduleSettledActivation = () => {
      if (cancelled) return;
      window.clearTimeout(settledTimer);
      settledTimer = window.setTimeout(() => {
        observer?.disconnect();
        activateAfterHydration();
      }, 420);
    };

    const activateAfterDomSettles = () => {
      if (cancelled) return;

      observer?.disconnect();
      observer = new MutationObserver(() => {
        scheduleSettledActivation();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      scheduleSettledActivation();

      maxWaitTimer = window.setTimeout(() => {
        observer?.disconnect();
        activateAfterHydration();
      }, 3200);
    };

    const onWindowLoad = () => {
      activateAfterDomSettles();
    };

    if (document.readyState === "complete") {
      activateAfterDomSettles();
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    const fallbackTimer = window.setTimeout(() => {
      activateAfterDomSettles();
    }, 1800);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("load", onWindowLoad);
      window.clearTimeout(settledTimer);
      window.clearTimeout(maxWaitTimer);
      window.clearTimeout(activationTimer);
      window.clearTimeout(fallbackTimer);
      if ("cancelIdleCallback" in window && activationIdleId) {
        window.cancelIdleCallback(activationIdleId);
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
