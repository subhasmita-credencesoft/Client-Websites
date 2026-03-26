"use client";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn("mx-auto max-w-3xl text-center", className)}
    >
      <p
        data-reveal-child
        className="mb-4 text-xs uppercase tracking-[0.4em] text-[#dfbe97]/90"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal-child
        className="text-balance text-3xl leading-[1.1] md:text-5xl"
      >
        {title}
      </h2>
      {description ? <p data-reveal-child className="mx-auto mt-5 max-w-2xl text-balance text-sm leading-relaxed text-white/65 md:text-[0.95rem]">{description}</p> : null}
    </div>
  );
}
