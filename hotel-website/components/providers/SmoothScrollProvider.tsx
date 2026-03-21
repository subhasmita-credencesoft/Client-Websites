"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    if (prefersReducedMotion) {
      const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => window.cancelAnimationFrame(refreshId);
    }

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const isLowPower = (nav.deviceMemory ?? 8) <= 4 || navigator.hardwareConcurrency <= 4;
    const isMobile = window.innerWidth < 992;
    const isHomePage = pathname === "/";
    const saveData = Boolean(nav.connection?.saveData);
    const lowBandwidth = ["slow-2g", "2g"].includes(nav.connection?.effectiveType ?? "");

    if (isLowPower || isMobile || saveData || lowBandwidth || isHomePage) {
      const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => window.cancelAnimationFrame(refreshId);
    }

    const lenis = new Lenis({
      duration: 0.4,
      smoothWheel: true,
      syncTouch: false,
      syncTouchLerp: 0.08,
      wheelMultiplier: 0.96,
      touchMultiplier: 1.04,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let frameId = 0;
    const onLenisScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        ScrollTrigger.update();
      });
    };
    lenis.on("scroll", onLenisScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(refreshId);
      gsap.ticker.remove(tick);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, [pathname, prefersReducedMotion]);

  return <>{children}</>;
}
