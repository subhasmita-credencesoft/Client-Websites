"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "../ui/Container";

const stats = [
  { value: 524, suffix: "", label: "luxury rooms" },
  { value: 74, suffix: "k", label: "guests" },
  { value: 1.8, suffix: "k", label: "five star ratings" },
  { value: 2.5, suffix: "m", label: "served breakfast" },
];

export default function StatsBanner() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const formatted = useMemo(
    () =>
      counts.map((value, index) => {
        const target = stats[index].value;
        const isDecimal = target % 1 !== 0;
        const display = isDecimal
          ? value.toFixed(1)
          : Math.round(value).toString();
        return `${display}${stats[index].suffix}`;
      }),
    [counts],
  );

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(stats.map((stat) => stat.value * progress));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_imgbox1.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <Container className="relative z-10 py-20">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="space-y-3">
              <p
                className="font-serif text-5xl md:text-6xl"
                style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}
              >
                {formatted[index]}
              </p>
              <p
                className="text-xs uppercase tracking-[0.3em] text-white/90"
                style={{ textShadow: "0 4px 12px rgba(0,0,0,0.45)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
