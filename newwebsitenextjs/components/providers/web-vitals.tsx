"use client";

import { useReportWebVitals } from "next/web-vitals";
import { logPerformanceMetric } from "@/lib/utils/logger";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    logPerformanceMetric({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      label: metric.label,
    });
  });

  return null;
}
