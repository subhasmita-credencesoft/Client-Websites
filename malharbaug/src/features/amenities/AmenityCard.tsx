import type { Amenity } from '@/types';

interface AmenityCardProps {
  amenity: Amenity;
}

export default function AmenityCard({ amenity }: AmenityCardProps) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 text-center transition-shadow duration-200 hover:shadow-lg dark:border-brand-800/30 dark:bg-earth-800">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/40">
        <iconify-icon icon={amenity.icon} width="24" height="24"></iconify-icon>
      </div>
      <h3 className="font-sans text-sm font-semibold text-earth-900 dark:text-white">
        {amenity.title}
      </h3>
      <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
        {amenity.description}
      </p>
    </div>
  );
}
