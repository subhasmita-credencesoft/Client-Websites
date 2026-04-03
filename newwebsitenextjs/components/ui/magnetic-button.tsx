"use client";

import type { MouseEvent } from "react";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type MagneticButtonProps = {
  children: import("react").ReactNode;
  className?: string;
  href?: string;
};

export function MagneticButton({ children, className, href }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);

    node.style.transform = `translate3d(${x * 0.14}px, ${y * 0.14}px, 0) scale(1.03)`;
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate3d(0, 0, 0) scale(1)";
  };

  const handlePressStart = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform += " scale(0.97)";
  };

  const handlePressEnd = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate3d(0, 0, 0) scale(1)";
  };

  const commonClassName = cn(
    "group inline-flex items-center justify-center rounded-full border border-[#d7b17c]/40 bg-[#365143]/80 px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#fff6ea] backdrop-blur-xl transition-all duration-500 hover:border-[#dfbe97]/80 hover:bg-[#415b4e] hover:shadow-[0_0_26px_rgba(224,180,129,0.35)]",
    "will-transform",
    className,
  );

  const isInternalHref = typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));

  if (href && isInternalHref) {
    return (
      <Link href={href} className="inline-flex">
        <span
          ref={ref as import("react").RefObject<HTMLSpanElement>}
          data-cursor="hover"
          onMouseMove={handleMove as unknown as (event: MouseEvent<HTMLSpanElement>) => void}
          onMouseLeave={handleLeave}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          className={commonClassName}
        >
          {children}
        </span>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        ref={ref as import("react").RefObject<HTMLAnchorElement>}
        data-cursor="hover"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        className={commonClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as import("react").RefObject<HTMLButtonElement>}
      type="button"
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      className={commonClassName}
    >
      {children}
    </button>
  );
}
