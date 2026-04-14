import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import type { ButtonSize, ButtonVariant } from "@/types";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "site-button-primary",
  secondary: "site-button-secondary",
  outline: "site-button-outline",
  ghost: "site-button-ghost",
  danger: "site-button-danger",
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "px-4 text-[var(--text-sm)]",
  md: "px-6 text-[var(--text-sm)]",
  lg: "px-8 text-[var(--text-base)]",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn("site-button", variantClassMap[variant], sizeClassMap[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClassName({ variant, size, className })} {...props} />;
}
