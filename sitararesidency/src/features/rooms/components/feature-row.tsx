import type { LucideIcon } from 'lucide-react';

export function FeatureRow({
  features,
  label,
}: {
  features: readonly { Icon: LucideIcon; label: string }[];
  label?: string;
}) {
  return (
    <section className="amenities-bar" aria-label={label ?? 'Room amenities'}>
      <div className="amenities-bar__inner">
        {features.map(({ Icon, label: featureLabel }) => (
          <div key={featureLabel} className="amenities-bar__item">
            <span className="amenities-bar__icon-wrap">
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <span className="amenities-bar__label">{featureLabel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}