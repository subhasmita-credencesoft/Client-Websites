import { Users, Presentation, LayoutGrid, Monitor, Sparkles } from 'lucide-react';
import { eventSpaces } from '@/features/events/data/events';

export function EventCapacityTable() {
  return (
    <div className="overflow-x-auto rounded-none border border-forest/15 bg-cream/50 p-1">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead className="border-b border-forest/15 bg-forest/5 font-mono-label text-[11px] uppercase tracking-wider text-forest">
          <tr>
            <th className="px-5 py-4 font-semibold">Venue Space</th>
            <th className="px-4 py-4 text-center font-semibold">
              <span className="flex items-center justify-center gap-1.5">
                <Presentation className="h-3.5 w-3.5 text-terracotta" /> Theatre
              </span>
            </th>
            <th className="px-4 py-4 text-center font-semibold">
              <span className="flex items-center justify-center gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5 text-terracotta" /> Classroom
              </span>
            </th>
            <th className="px-4 py-4 text-center font-semibold">
              <span className="flex items-center justify-center gap-1.5">
                <Monitor className="h-3.5 w-3.5 text-terracotta" /> U-Shape
              </span>
            </th>
            <th className="px-4 py-4 text-center font-semibold">
              <span className="flex items-center justify-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-terracotta" /> Cluster
              </span>
            </th>
            <th className="px-4 py-4 text-center font-semibold">
              <span className="flex items-center justify-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-terracotta" /> Reception
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/10 font-sans text-forest/90">
          {eventSpaces.map((space) => (
            <tr key={space.id} className="hover:bg-forest/[0.02] transition-colors">
              <td className="px-5 py-4">
                <div className="font-serif font-semibold text-base text-forest">{space.name}</div>
                <div className="font-mono-label text-[10px] text-terracotta mt-0.5">
                  Area: {space.area} · Height: {space.ceilingHeight}
                </div>
              </td>
              <td className="px-4 py-4 text-center font-mono-label font-medium text-forest">
                {space.capacities.theatre} guests
              </td>
              <td className="px-4 py-4 text-center font-mono-label font-medium text-forest">
                {space.capacities.classroom} guests
              </td>
              <td className="px-4 py-4 text-center font-mono-label font-medium text-forest">
                {space.capacities.uShape} guests
              </td>
              <td className="px-4 py-4 text-center font-mono-label font-medium text-forest">
                {space.capacities.cluster} guests
              </td>
              <td className="px-4 py-4 text-center font-mono-label font-medium text-terracotta font-semibold">
                {space.capacities.floating} guests
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
