import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-3", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80 sm:text-sm">{eyebrow}</p>
      ) : null}
      <div className="space-y-2.5 sm:space-y-3">
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.8rem]">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">{description}</p> : null}
      </div>
    </div>
  );
}