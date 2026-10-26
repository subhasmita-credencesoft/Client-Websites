import {
  ArrowRight,
  BedDouble,
  Building2,
  Check,
  ConciergeBell,
  Eye,
  Gem,
  Globe,
  Handshake,
  Hotel,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/types';

const icons: Record<IconName, LucideIcon> = {
  hotel: Hotel,
  bed: BedDouble,
  shield: ShieldCheck,
  users: Users,
  building: Building2,
  sparkles: Sparkles,
  concierge: ConciergeBell,
  trending: TrendingUp,
  wrench: Wrench,
  handshake: Handshake,
  target: Target,
  eye: Eye,
  gem: Gem,
  check: Check,
  arrow: ArrowRight,
  phone: Phone,
  mail: Mail,
  pin: MapPin,
  globe: Globe,
};

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ name, size = 20, strokeWidth = 1.75, className }: IconProps) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" focusable="false" />;
}
