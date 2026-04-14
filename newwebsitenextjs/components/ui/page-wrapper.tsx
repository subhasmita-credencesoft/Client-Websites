import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type PageWrapperProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  size?: "narrow" | "default" | "wide";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const sizeClassMap = {
  narrow: "max-w-5xl",
  default: "max-w-7xl",
  wide: "max-w-[96rem]",
} as const;

export function PageWrapper<T extends ElementType = "div">({
  as,
  children,
  className,
  contentClassName,
  size = "default",
  ...props
}: PageWrapperProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag className={cn("page-wrapper", className)} {...props}>
      <div className={cn("page-wrapper__content", sizeClassMap[size], contentClassName)}>{children}</div>
    </Tag>
  );
}
