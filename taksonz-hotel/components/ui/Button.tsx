import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "ghost" | "light";

interface Common {
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}

export function buttonClass({ variant = "primary", size = "md", className }: Pick<Common, "variant" | "size" | "className">) {
  return [styles.btn, styles[variant], size === "lg" ? styles.lg : "", className ?? ""].join(" ").trim();
}

export function ButtonLink({ variant, size, className, arrow, children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...rest}>
      <span>{children}</span>
      {arrow && <span aria-hidden className={styles.arrow}>→</span>}
    </Link>
  );
}

export function Button({ variant, size, className, arrow, children, ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      <span>{children}</span>
      {arrow && <span aria-hidden className={styles.arrow}>→</span>}
    </button>
  );
}
