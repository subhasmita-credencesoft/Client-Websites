import type { ReactNode } from 'react';

import { business } from '@/core/config/business';

export function BookButton({
  className,
  testId,
  children,
}: {
  className: string;
  testId?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={business.bookingUrl}
      data-testid={testId}
      className={className}
    >
      {children}
    </a>
  );
}