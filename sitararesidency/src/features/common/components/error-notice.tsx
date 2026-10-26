'use client';

export function ErrorNotice({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-parchment p-6">
      <div className="max-w-lg w-full text-center">
        <p className="font-mono-label text-[10px] text-terracotta">A small interruption</p>
        <h1 className="mt-4 font-display text-5xl text-forest">We lost the thread.</h1>
        <p className="mt-4 text-sm leading-7 text-sage-muted">Something did not load as expected. Please try again and we’ll get you back to planning your stay.</p>
        {process.env.NODE_ENV === 'development' ? (
          <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-3 text-left text-xs text-gray-800">
            {error.message || String(error)}
          </pre>
        ) : null}
        <button type="button" onClick={reset} className="button mt-7">
          Try again
        </button>
      </div>
    </main>
  );
}