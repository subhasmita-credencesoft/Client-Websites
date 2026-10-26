import { ImageCallout } from '@/shared/ui/image-callout';
import type { Callout } from '@/features/home/components/types';

export function CalloutSection({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: readonly Callout[];
}) {
  return (
    <section className="home-callouts">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
        </div>
      </div>
      <div className="home-callouts__grid">
        {items.map((callout) => (
          <ImageCallout
            key={callout.href}
            image={callout.image}
            eyebrow={callout.eyebrow}
            title={callout.title}
            text={callout.description}
            href={callout.href}
            action={callout.label}
          />
        ))}
      </div>
    </section>
  );
}
