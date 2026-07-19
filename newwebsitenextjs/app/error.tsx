"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (error) {
      console.error("[GlobalError]", error.message, error.digest);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-24 text-center">
        <div className="max-w-2xl">
          <p className="site-eyebrow">Something Went Wrong</p>
          <h1 className="site-title-md mt-4">We couldn&apos;t finish loading this page.</h1>
          <p className="site-copy mt-4">
            The interface is protected by an error boundary so one failure doesn&apos;t break the whole experience.
          </p>
          {error?.digest ? (
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">Error ID: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            className="site-button site-button-primary mt-8 px-8"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}
