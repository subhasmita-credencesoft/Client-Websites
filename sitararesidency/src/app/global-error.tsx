'use client';

import { ErrorNotice } from '@/features/common';

import '@/styles/globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-US">
      <body>
        <ErrorNotice error={error} reset={reset} />
      </body>
    </html>
  );
}
