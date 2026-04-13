interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title text-4xl sm:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-ivory/68 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
