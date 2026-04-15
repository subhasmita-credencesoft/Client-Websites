"use client";

import { useMemo, useState } from "react";

import { packages, siteMeta } from "@/lib/site-data";
import { formatPrice } from "@/lib/format";
import Button from "@/components/ui/Button";

export function PackageTabs() {
  const [mode, setMode] = useState<"weekday" | "weekend">("weekday");

  const packageRows = useMemo(
    () =>
      packages.map((item) => ({
        ...item,
        price: mode === "weekday" ? item.weekdayPrice : item.weekendPrice,
      })),
    [mode],
  );

  return (
    <div className="space-y-10">
      <div className="inline-flex rounded-full border border-[var(--neutral-300)] bg-white p-1">
        {(["weekday", "weekend"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              mode === item
                ? "bg-[var(--primary-700)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {packageRows.map((item) => (
          <article
            key={item.slug}
            className="flex h-full flex-col rounded-[28px] border border-[var(--neutral-200)] bg-white p-8 shadow-[0_2px_10px_rgba(15,24,25,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,24,25,0.14)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent-gold)]">
              {item.name}
            </p>
            <div className="mt-4 text-4xl font-bold text-[var(--text-primary)]">
              {formatPrice(item.price)}
            </div>
            <p className="mt-2 text-sm text-[var(--text-light)]">per person, per day</p>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">{item.description}</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
              {item.inclusions.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 text-[var(--accent-gold)]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={siteMeta.bookingEngineHref} className="w-full">
                Select Package
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
