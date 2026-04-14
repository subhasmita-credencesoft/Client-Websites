import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { cn } from "@/lib/utils/cn";
 
export type SectionShellProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "default" | "narrow" | "wide";
  as?: "section" | "div";
} & Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

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
    <PageWrapper
      as={Tag}
      className={cn("site-section", className)}
      contentClassName={containerClassName}
      size={size}
      {...props}
    >
      {children}
    </PageWrapper>
  );
}
