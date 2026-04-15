import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type GridProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const colClassMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
} as const;

const gapClassMap = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
} as const;

export function Grid({
  children,
  columns = 3,
  gap = "lg",
  className,
}: GridProps) {
  return <div className={cn("grid", colClassMap[columns], gapClassMap[gap], className)}>{children}</div>;
}
