"use client";

import type { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils/cn";
import { PageWrapper } from "@/components/ui/page-wrapper";

type SectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  animate?: boolean;
  id?: string;
  size?: "narrow" | "default" | "wide";
};

export function Section({
  children,
  className,
  contentClassName,
  title,
  subtitle,
  centered = false,
  animate = true,
  id,
  size = "default",
}: SectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <PageWrapper
      as="section"
      id={id}
      size={size}
      className={cn(
        "site-section transition-all duration-700",
        animate && (isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"),
        className,
      )}
      contentClassName={contentClassName}
    >
      <div ref={ref}>
        {(title || subtitle) ? (
          <div className={cn("mb-12", centered && "text-center")}>
            {title ? <h2 className="site-title-lg">{title}</h2> : null}
            {subtitle ? <p className={cn("site-copy mt-4 max-w-3xl", centered && "mx-auto")}>{subtitle}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </PageWrapper>
  );
}
