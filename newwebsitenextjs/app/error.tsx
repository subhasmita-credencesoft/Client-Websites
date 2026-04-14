"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: ErrorProps) {
  return (
    <main className="min-h-screen bg-[#11100e] text-white">
      <div className="site-container flex min-h-screen items-center justify-center py-24 text-center">
        <div className="max-w-2xl">
          <p className="site-eyebrow">Something Went Wrong</p>
          <h1 className="site-title-md mt-4">We couldn&apos;t finish loading this page.</h1>
          <p className="site-copy mt-4">
            The interface is protected by an error boundary so one failure doesn&apos;t break the whole experience.
          </p>
          <button type="button" onClick={reset} className="site-button site-button-primary mt-8 px-8">
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}
