import type { LucideIcon } from 'lucide-react';

import { BedDouble } from 'lucide-react';
import { InfoTile } from '@/shared/ui/info-tile';

export function FacilityGrid({
  tiles,
  icons = [BedDouble, BedDouble, BedDouble, BedDouble],
}: {
  tiles: readonly { title: string; description: string }[];
  icons?: readonly LucideIcon[];
}) {
  return (
    <section className="bg-cream px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1100px] gap-5 md:grid-cols-2">
        {tiles.map((tile, index) => {
          const Icon = icons[index];
          return <InfoTile key={tile.title} icon={<Icon />} title={tile.title} text={tile.description} />;
        })}
      </div>
    </section>
  );
}