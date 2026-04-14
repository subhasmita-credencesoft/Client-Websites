import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "default" | "narrow" | "wide";
  as?: "section" | "div";
} & Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

const sizeClassMap = {
  narrow: "max-w-5xl",
  default: "max-w-7xl",
  wide: "max-w-[96rem]",
} as const;

export function SectionShell({
  children,
  className,
  containerClassName,
  size = "wide",
  as = "section",
  ...props
}: SectionShellProps) {
  const Tag = as;

  return (
    <Tag className={cn("site-section", className)} {...props}>
      <div className={cn("site-container", sizeClassMap[size], containerClassName)}>{children}</div>
    </Tag>
  );
}
