import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "content";
}

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  const sizeClassName = size === "content" ? "site-container--content" : "";

  return (
    <div className={["site-container", sizeClassName, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
