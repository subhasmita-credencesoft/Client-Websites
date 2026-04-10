import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  label: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg" | "sm";
  className?: string;
}

export function CtaButton({ href, label, variant = "default", size = "default", className }: CtaButtonProps) {
  return (
    <Button asChild className={cn("group gap-2", className)} size={size} variant={variant}>
      <Link href={href}>
        <span>{label}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </Button>
  );
}