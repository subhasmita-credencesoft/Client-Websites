import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "light" | "light-outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variantClasses = {
  primary:
    "bg-[var(--accent-gold)] text-white hover:bg-[var(--accent-gold-dark)] shadow-[0_12px_26px_rgba(198,138,75,0.28)]",
  secondary:
    "bg-[var(--neutral-100)] text-[var(--text-primary)] hover:bg-[var(--neutral-200)]",
  outline:
    "border border-[var(--primary-600)] text-[var(--primary-700)] hover:bg-[var(--primary-50)]",
  light:
    "bg-white text-[var(--primary-700)] hover:bg-[var(--neutral-50)] shadow-[0_10px_24px_rgba(255,255,255,0.18)]",
  "light-outline":
    "border border-white/25 bg-white/8 text-white hover:bg-white/14",
};

const sizeClasses = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-[0.18em] transition duration-300",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://");

    if (isExternal) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
