type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-10 max-w-2xl ${alignClasses}`.trim()}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-bronze">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-serif text-3xl md:text-4xl text-ink">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-sm leading-7 text-ink/70">{subtitle}</p>
      )}
    </div>
  );
}
