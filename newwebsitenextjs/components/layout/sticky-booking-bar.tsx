"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";

export function StickyBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-[96rem] px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[rgba(200,154,85,0.25)] bg-[rgba(12,10,8,0.96)] px-4 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6 sm:py-3.5 md:px-8">
          <div className="hidden min-w-0 flex-col sm:flex">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
              Quick Booking
            </span>
            <span className="mt-0.5 truncate text-[0.82rem] font-medium text-white/90">
              Check dates and availability
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-3">
            <Link
              href={DIRECT_BOOKING_ENGINE_URL}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-[#c9a46e] bg-[#c9a46e] px-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#d7b57c] sm:flex-none sm:px-6 sm:text-[0.66rem]"
              data-cursor="hover"
            >
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/15 px-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white sm:flex-none sm:px-6 sm:text-[0.66rem]"
              data-cursor="hover"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
