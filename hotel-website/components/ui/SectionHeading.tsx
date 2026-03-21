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
  const alignClasses = align === "center" ? "site-heading--center" : "site-heading--left";

  return (
    <div className={`site-heading ${alignClasses}`.trim()}>
      {eyebrow && (
        <p className="site-eyebrow">
          {eyebrow}
        </p>
      )}
      <h2 className="site-title">{title}</h2>
      {subtitle && (
        <p className="site-copy">{subtitle}</p>
      )}
    </div>
  );
}
