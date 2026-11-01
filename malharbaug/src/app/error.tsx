'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-earth-50 px-6 text-center dark:bg-earth-900">
      <div className="max-w-md">
        <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mt-3 font-sans text-sm text-earth-600 dark:text-earth-300">
          We experienced an unexpected issue loading this page. Please try again or return to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-brand-600 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-earth-300 px-6 py-2.5 font-sans text-sm font-semibold text-earth-700 transition-colors hover:bg-earth-100 dark:border-earth-700 dark:text-earth-200 dark:hover:bg-earth-800"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
