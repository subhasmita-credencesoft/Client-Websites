import { BedDouble, Briefcase, Coffee, Heart, MapPin, Mic, Monitor, PartyPopper, Snowflake, Users, UtensilsCrossed, Wifi, type LucideIcon } from "lucide-react";
import type { IconName } from "@/data/content";

const map: Record<IconName, LucideIcon> = {
  bed: BedDouble,
  utensils: UtensilsCrossed,
  users: Users,
  "map-pin": MapPin,
  wifi: Wifi,
  snowflake: Snowflake,
  monitor: Monitor,
  coffee: Coffee,
  heart: Heart,
  briefcase: Briefcase,
  party: PartyPopper,
  mic: Mic,
};

export function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const C = map[name];
  return <C size={size} aria-hidden />;
}
