import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArrowRight } from 'lucide-react';

export function ButtonLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      data-testid={`link-${href.replaceAll('/', '-').replace(/^-/, '')}`}
      className={`group inline-flex items-center gap-3 border px-5 py-3 text-[11px] font-mono-label transition-all duration-300 hover:-translate-y-0.5 ${
        inverse
          ? 'border-parchment text-cream hover:bg-parchment hover:text-forest'
          : 'border-forest text-forest hover:bg-forest hover:text-cream'
      }`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}