"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
export default function GlobalGsapEffects() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const isLowPowerDevice = (nav.deviceMemory ?? 8) <= 4 || navigator.hardwareConcurrency <= 4;
    const isMobileViewport = window.innerWidth < 992;
    const saveData = Boolean(nav.connection?.saveData);
    if (pathname === "/") return;
    if (reduceMotion || isLowPowerDevice || isMobileViewport || saveData) return;
    // Keep global page-level GSAP disabled by default for faster scrolling and lower CPU.
    // Section-specific GSAP timelines still run inside their own components.
    return;
  }, [pathname, reduceMotion]);
  return null;
}
