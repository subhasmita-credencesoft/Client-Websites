"use client";

import { useEffect } from "react";
import Link from "next/link";
import { bookingEngineUrl } from "@/lib/data";

export default function BookingPage() {
  useEffect(() => {
    window.location.href = bookingEngineUrl;
  }, []);

  return (
    <div className="container-shell flex min-h-screen items-center justify-center py-32 text-center">
      <div className="max-w-xl rounded-[32px] border border-gold/18 bg-dark-2 p-8">
        <p className="eyebrow">Redirecting</p>
        <h1 className="font-display text-4xl">Opening the Redwings Studio booking engine.</h1>
        <p className="mt-5 text-base leading-8 text-ivory/68">
          If the booking engine does not open automatically, use the button below.
        </p>
        <Link
          href={bookingEngineUrl}
          className="mt-8 inline-flex rounded-full border border-gold bg-gold px-6 py-3 text-xs uppercase tracking-[0.32em] text-dark transition hover:bg-gold-light"
        >
          Open Booking Engine
        </Link>
      </div>
    </div>
  );
}
