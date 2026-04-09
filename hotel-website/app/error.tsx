"use client";

import { useEffect } from "react";
import ErrorState from "../components/ui/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global route error:", error);
  }, [error]);

  return (
    <div>
      <ErrorState
        eyebrow="Something Went Wrong"
        title="The experience hit a temporary issue."
        copy="Please try again in a moment. If the issue continues, return to the homepage and continue exploring the resort."
        primaryLabel={undefined}
        primaryHref={undefined}
        secondaryLabel="Back Home"
        secondaryHref="/"
      />
      <div className="-mt-28 flex justify-center pb-16">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-white/14 bg-white/8 px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#c49a3c]/35 hover:bg-white/12"
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
