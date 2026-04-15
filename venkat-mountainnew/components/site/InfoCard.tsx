import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  description: string;
  image?: string;
  details?: string[];
  href?: string;
  hrefLabel?: string;
  icon?: ReactNode;
};

export function InfoCard({
  title,
  description,
  image,
  details,
  href,
  hrefLabel = "Learn more",
  icon,
}: InfoCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-[var(--neutral-200)] bg-white shadow-[0_2px_10px_rgba(15,24,25,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,24,25,0.14)]">
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--neutral-100)]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="p-8">
        {icon ? (
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-50)] text-[var(--accent-gold)] shadow-[inset_0_0_0_1px_rgba(198,138,75,0.18)]">
            {icon}
          </div>
        ) : null}
        <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{description}</p>
        {details?.length ? (
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent-gold)]" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {href ? (
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)] transition hover:text-[var(--accent-gold-dark)]"
          >
            {hrefLabel}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
