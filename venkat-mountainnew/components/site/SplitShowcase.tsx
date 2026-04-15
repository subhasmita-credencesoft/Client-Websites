import Image from "next/image";

import Button from "@/components/ui/Button";

type SplitShowcaseProps = {
  image: string;
  alt: string;
  sectionLabel?: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  cta?: {
    label: string;
    href: string;
    variant?: "primary" | "outline" | "secondary" | "light" | "light-outline";
  };
  reverse?: boolean;
};

export function SplitShowcase({
  image,
  alt,
  sectionLabel,
  title,
  paragraphs,
  points,
  cta,
  reverse = false,
}: SplitShowcaseProps) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="relative overflow-hidden rounded-[32px] border border-[var(--neutral-200)] bg-[var(--neutral-100)] shadow-[0_2px_12px_rgba(15,24,25,0.08)]">
        <div className="relative aspect-[4/3]">
          <Image src={image} alt={alt} fill className="object-cover" />
        </div>
      </div>
      <div>
        {sectionLabel ? (
          <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.35em] text-[var(--accent-gold)]">
            {sectionLabel}
          </p>
        ) : null}
        <h3 className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">{title}</h3>
        <div className="mt-5 space-y-4 text-base leading-8 text-[var(--text-secondary)]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {points?.length ? (
          <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--text-secondary)]">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl bg-[var(--neutral-50)] px-4 py-3">
                <span className="mt-1 text-[var(--accent-gold)]">◆</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {cta ? (
          <div className="mt-8">
            <Button href={cta.href} variant={cta.variant ?? "primary"}>
              {cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
