import { Check } from "lucide-react";

interface BadgeListProps {
  items: string[];
}

export function BadgeList({ items }: BadgeListProps) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md"
        >
          <Check className="h-4 w-4 text-amber-300" />
          {item}
        </li>
      ))}
    </ul>
  );
}