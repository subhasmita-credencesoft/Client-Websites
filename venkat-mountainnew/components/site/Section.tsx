"use client";

import type { ReactNode } from "react";

import Container from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SECTION_PADDING } from "@/lib/constants";

type SectionProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  sectionLabel?: string;
  centered?: boolean;
  animate?: boolean;
  background?: "light" | "lighter" | "dark" | "navy";
  id?: string;
};

const bgMap = {
  light: "bg-[var(--bg-light)]",
  lighter: "bg-[var(--bg-lighter)]",
  dark: "bg-[var(--bg-dark)]",
  navy: "bg-[var(--primary-900)] text-white",
};

export function Section({
  children,
  className = "",
  title,
  subtitle,
  sectionLabel,
  centered = false,
  animate = true,
  background = "light",
  id,
}: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const animatedState = animate
    ? isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8"
    : "opacity-100 translate-y-0";

  return (
    <section
      id={id}
      ref={ref}
      className={`${bgMap[background]} ${SECTION_PADDING} transition-all duration-700 ${animatedState} ${className}`}
    >
      <Container>
        {(sectionLabel || title || subtitle) && (
          <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
            {sectionLabel ? (
              <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.35em] text-[var(--accent-gold)]">
                {sectionLabel}
              </p>
            ) : null}
            {title ? (
              <h2 className={`text-4xl font-bold text-[var(--text-primary)] md:text-5xl ${centered ? "mx-auto max-w-4xl" : "max-w-4xl"}`}>
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p
                className={`mt-4 text-base leading-8 text-[var(--text-secondary)] md:text-lg ${
                  centered ? "mx-auto max-w-3xl" : "max-w-3xl"
                }`}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
