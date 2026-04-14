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
        className="site-eyebrow mb-4"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal-child
        className="site-title-lg text-balance"
      >
        {title}
      </h2>
      {description ? <p data-reveal-child className="site-copy mx-auto mt-5 max-w-2xl text-balance">{description}</p> : null}
    </div>
  );
}
