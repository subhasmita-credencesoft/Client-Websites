"use client";

import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const SITE_URL = "https://themountainresorts.com";

function buildJsonLd(items: BreadcrumbItem[]) {
  const listItems = [
    { name: "Home", position: 1, item: SITE_URL },
    ...items.map((item, index) => ({
      name: item.label,
      position: index + 2,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  };
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  const jsonLd = buildJsonLd(items);

  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.68rem] tracking-wide text-white/50">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-white/25" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span className="text-white/70">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
