import type { LucideIcon } from 'lucide-react';

import { MapPin } from 'lucide-react';

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export function ContactDetailGrid({
  details,
  icons,
}: {
  details: readonly ContactDetail[];
  icons?: readonly LucideIcon[];
}) {
  return (
    <section className="contact-detail-grid">
      {details.map((detail, index) => {
        const Icon = icons?.[index] ?? MapPin;
        return (
          <article key={detail.label}>
            <Icon />
            <p>{detail.label}</p>
            {detail.href ? (
              <a href={detail.href}>{detail.value}</a>
            ) : (
              <address>{detail.value}</address>
            )}
          </article>
        );
      })}
    </section>
  );
}