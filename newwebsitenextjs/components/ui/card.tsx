import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import type { CardVariant } from "@/types";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const variantClassMap: Record<CardVariant, string> = {
  default: "site-card",
  subtle: "site-card site-card-subtle",
  emphasis: "site-card site-card-emphasis",
};

export function Card<T extends ElementType = "div">({
  as,
  children,
  className,
  variant = "default",
  ...props
}: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag className={cn(variantClassMap[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
