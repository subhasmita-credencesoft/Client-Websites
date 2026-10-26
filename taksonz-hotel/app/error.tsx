"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section" style={{ minHeight: "70svh", display: "grid", alignContent: "center", paddingTop: "calc(var(--header-h) + 3rem)" }}>
      <div className="container" style={{ display: "grid", gap: "1.25rem", justifyItems: "start" }}>
        <h1>Something went wrong.</h1>
        <p style={{ color: "var(--grey)" }}>Please try again. If the problem continues, contact the hotel directly.</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </section>
  );
}
