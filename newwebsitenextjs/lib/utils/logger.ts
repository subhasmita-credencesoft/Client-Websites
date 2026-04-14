import type { PerformanceMetricPayload } from "@/types";

export function logPerformanceMetric(metric: PerformanceMetricPayload) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.info("[web-vitals]", metric);
    return;
  }

  try {
    const body = JSON.stringify(metric);

    if ("sendBeacon" in navigator) {
      navigator.sendBeacon("/__web-vitals", body);
      return;
    }

    void fetch("/__web-vitals", {
      method: "POST",
      body,
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    // Swallow reporting failures so analytics never affect UX.
  }
}
