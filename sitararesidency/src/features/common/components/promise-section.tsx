import type { LucideIcon } from 'lucide-react';

import { Clock3 } from 'lucide-react';
import { InfoTile } from '@/shared/ui/info-tile';

export function PromiseSection({
  eyebrow,
  heading,
  description,
  tiles,
  icons = [Clock3, Clock3],
}: {
  eyebrow: string;
  heading: string;
  description: string;
  tiles: readonly { title: string; description: string }[];
  icons?: readonly LucideIcon[];
}) {
  return (
    <section className="bg-sage px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1000px]">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]">
          <p className="font-mono-label text-[10px] text-terracotta">{eyebrow}</p>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl leading-tight text-forest">{heading}</h2>
            <p className="mt-6 text-sm leading-7 text-sage-muted">{description}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {tiles.map((tile, index) => {
                const Icon = icons[index];
                return <InfoTile key={tile.title} icon={<Icon />} title={tile.title} text={tile.description} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}