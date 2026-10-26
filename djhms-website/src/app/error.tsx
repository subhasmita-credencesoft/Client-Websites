'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { LegalPage } from '@/components/ui/LegalPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <LegalPage title="Something went wrong">
      <p>An unexpected error occurred while loading this page.</p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
        <Button onClick={() => reset()}>Try again</Button>
        <Button href="/" variant="outline">Back to Home</Button>
      </div>
    </LegalPage>
  );
}
