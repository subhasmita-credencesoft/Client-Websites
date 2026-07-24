import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-ivory/45">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={10} className="text-ivory/25" />}
            {index === items.length - 1 ? (
              <span className="text-gold-light">{item.label}</span>
            ) : (
              <Link href={item.href} className="transition hover:text-ivory/70">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
