'use client';

import { ErrorNotice } from '@/features/common';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorNotice error={error} reset={reset} />;
}