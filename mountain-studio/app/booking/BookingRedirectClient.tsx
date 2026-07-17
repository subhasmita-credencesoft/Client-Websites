"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bookingEngineUrl } from "@/lib/data";

export function BookingRedirectClient() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          window.location.href = bookingEngineUrl;
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-32">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-8 h-16 w-16 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        <p className="eyebrow">Booking Engine</p>
        <h1 className="mt-4 font-display text-4xl text-ivory">Taking You to the Booking Engine</h1>
        <p className="mt-4 text-sm leading-relaxed text-ivory/50">
          You&apos;ll be redirected to the Redwings Studio booking engine in {countdown} second{countdown !== 1 ? "s" : ""}.
        </p>
        <div className="mt-8">
          <Link
            href={bookingEngineUrl}
            className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-dark transition hover:bg-gold-light"
          >
            Open Booking Engine
          </Link>
        </div>
        <p className="mt-8 text-xs text-ivory/30">
          <Link href="/rooms" className="underline transition hover:text-gold">Browse rooms instead</Link>
        </p>
      </div>
    </div>
  );
}
