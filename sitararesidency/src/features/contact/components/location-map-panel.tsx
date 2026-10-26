import type { LucideIcon } from 'lucide-react';

import { Car } from 'lucide-react';

export function LocationMapPanel({
  eyebrow,
  heading,
  description,
  actionLabel,
  actionHref,
  features,
  featureIcons,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  features: readonly string[];
  featureIcons?: readonly LucideIcon[];
}) {
  return (
    <section className="location-map-panel">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{description}</p>
        <a className="button" href={actionHref} target="_blank" rel="noopener noreferrer">
          {actionLabel}
        </a>
      </div>
      <div className="location-map-panel__features">
        {features.map((feature, index) => {
          const Icon = featureIcons?.[index] ?? Car;
          return (
            <div key={feature}>
              <Icon />
              <span>{feature}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}