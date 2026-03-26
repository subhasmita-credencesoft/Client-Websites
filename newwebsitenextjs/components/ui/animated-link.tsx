"use client";

import { cn } from "@/lib/utils/cn";

type AnimatedLinkProps = {
  href: string;
  label: string;
  active?: boolean;
};

export function AnimatedLink({ href, label, active }: AnimatedLinkProps) {
  return (
    <a
      href={href}
      data-cursor="hover"
      className={cn(
        "relative text-[0.74rem] uppercase tracking-[0.32em] text-white/78 transition-colors duration-400 hover:text-white",
        active && "text-white",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#f7ead3] to-[#ba8f64] transition-transform duration-500",
          active && "scale-x-100",
        )}
      />
    </a>
  );
}
