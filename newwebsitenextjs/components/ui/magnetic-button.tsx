"use client";

import type { MouseEvent } from "react";
import { useRef } from "react";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { ButtonSize, ButtonVariant } from "@/types";

type MagneticButtonProps = {
  children: import("react").ReactNode;
  className?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function MagneticButton({
  children,
  className,
  href,
  variant = "secondary",
  size = "md",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const rafRef = useRef<number>(0);
  const rectRef = useRef<DOMRect | null>(null);

  const isMagneticEligible = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (!window.matchMedia("(pointer: fine)").matches) return false;
    return window.innerWidth >= 1024;
  };

  const resetTransform = (scale = 1) => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
  };

  const measureBounds = () => {
    const node = ref.current;
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    rectRef.current = rect;
    return rect;
  };

  const cancelPendingFrame = () => {
    if (!rafRef.current) return;
    window.cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  };

  const handleMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const node = ref.current;
    if (!node || !isMagneticEligible()) return;

    const bounds = rectRef.current ?? measureBounds();
    if (!bounds) return;
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);

    cancelPendingFrame();
    rafRef.current = window.requestAnimationFrame(() => {
      node.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0) scale(1.02)`;
    });
  };

  const handleLeave = () => {
    cancelPendingFrame();
    rectRef.current = null;
    resetTransform(1);
  };

  const handleEnter = () => {
    if (!isMagneticEligible()) return;
    measureBounds();
  };

  const handlePressStart = () => {
    cancelPendingFrame();
    resetTransform(isMagneticEligible() ? 0.98 : 0.97);
  };

  const handlePressEnd = () => {
    resetTransform(1);
  };

  const commonClassName = cn(buttonClassName({ variant, size }), "group backdrop-blur-xl hover:shadow-[0_0_26px_rgba(224,180,129,0.25)]", "will-transform", className);

  const isInternalHref = typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));

  if (href && isInternalHref) {
    return (
      <Link href={href} className="inline-flex">
        <span
          ref={ref as import("react").RefObject<HTMLSpanElement>}
          data-cursor="hover"
          onMouseEnter={handleEnter}
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
        onMouseEnter={handleEnter}
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
      onMouseEnter={handleEnter}
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
