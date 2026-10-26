import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function NotFoundSection({
  eyebrow,
  code,
  heading,
  description,
  homeAction,
  contactAction,
}: {
  eyebrow: string;
  code: string;
  heading: string;
  description: string;
  homeAction: string;
  contactAction: string;
}) {
  return (
    <main className="flex min-h-[70vh] items-center bg-sage px-5 py-28 text-forest md:px-10">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="font-mono-label text-[10px] text-terracotta">{eyebrow}</p>
        <div className="mt-5 grid gap-10 md:grid-cols-[.7fr_1.3fr] md:items-end">
          <p className="font-display text-[9rem] leading-[.75] text-forest md:text-[14rem]">{code}</p>
          <div>
            <h1 className="max-w-xl font-display text-5xl leading-[.9] md:text-7xl">{heading}</h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-sage-muted">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                data-testid="link-404-home"
                className="inline-flex items-center gap-3 bg-forest px-5 py-3 text-[10px] font-mono-label text-cream"
              >
                <ArrowLeft className="h-3 w-3" />
                {homeAction}
              </Link>
              <Link
                href="/contact"
                data-testid="link-404-contact"
                className="inline-flex items-center gap-3 border border-forest px-5 py-3 text-[10px] font-mono-label"
              >
                {contactAction} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}