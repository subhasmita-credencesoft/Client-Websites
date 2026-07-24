"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">
          An unexpected error occurred
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ivory/55">
          We apologize for the inconvenience. Please try again or return to the
          homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-gold px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-dark transition hover:bg-gold-light"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-gold/40 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
