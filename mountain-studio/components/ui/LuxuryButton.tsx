import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps {
  href?: string;
  label: string;
  variant?: "gold" | "ghost" | "outline";
  className?: string;
  play?: boolean;
}

export function LuxuryButton({
  href = "#",
  label,
  variant = "gold",
  className,
  play = false
}: LuxuryButtonProps) {
  const content = (
    <>
      {play ? <Play size={16} className="transition group-hover:rotate-[15deg]" /> : null}
      <span>{label}</span>
      {!play ? <ArrowRight size={16} /> : null}
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        "group shimmer-button inline-flex items-center gap-3 rounded-full px-6 py-3 text-xs uppercase tracking-[0.34em] transition duration-300",
        variant === "gold" && "bg-gold text-dark hover:bg-gold-light",
        variant === "ghost" && "border border-gold/50 text-ivory hover:bg-gold hover:text-dark",
        variant === "outline" && "border border-gold text-gold hover:bg-gold hover:text-dark",
        className
      )}
    >
      {content}
    </Link>
  );
}
