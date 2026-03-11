import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
};

const variantClasses = {
  primary: "bg-accent text-white hover:bg-[#a9552b]",
  outline: "border border-ink/20 text-ink hover:border-ink/40",
  ghost: "text-ink hover:bg-ink/5",
};

const sizeClasses = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full font-semibold transition",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
