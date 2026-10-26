import Link from 'next/link';

import { ImageCallout } from '@/shared/ui/image-callout';
import type { Callout } from '@/features/home/components/types';

export function VenueSection({
  eyebrow,
  heading,
  actionLabel,
  actionHref,
  items,
}: {
  eyebrow: string;
  heading: string;
  actionLabel: string;
  actionHref: string;
  items: readonly Callout[];
}) {
  return (
    <section className="venue-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
        </div>
        <Link href={actionHref} className="text-link">
          {actionLabel} <span aria-hidden>→</span>
        </Link>
      </div>
      <div className="venue-section__grid">
        {items.map((feature) => (
          <ImageCallout
            key={feature.href}
            image={feature.image}
            eyebrow={feature.eyebrow}
            title={feature.title}
            text={feature.description}
            href={feature.href}
            action={feature.label}
          />
        ))}
      </div>
    </section>
  );
}
