import Link from "next/link";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { footerSections } from "@/lib/data/content/mountain-content";
import type { FooterSection } from "@/types";

export function SiteFooter() {
  const sections = footerSections as FooterSection[];

  return (
    <footer className="border-t border-[rgba(var(--color-primary-rgb),0.2)] bg-[var(--color-background)]">
      <PageWrapper size="wide" className="py-14 md:py-16">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {sections.map((section, sectionIndex) => (
            <ul key={sectionIndex} className="space-y-3 text-sm text-[var(--color-text-secondary)] sm:text-base md:text-lg">
              {section.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block break-words leading-relaxed transition-colors hover:text-[var(--color-primary-hover)]"
                      data-cursor="hover"
                    >
                      {item.label}
                    </a>
                  ) : item.href.startsWith("tel:") ? (
                    <a
                      href={item.href}
                      className="block break-words leading-relaxed transition-colors hover:text-[var(--color-primary-hover)]"
                      data-cursor="hover"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="block break-words leading-relaxed transition-colors hover:text-[var(--color-primary-hover)]"
                      data-cursor="hover"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs tracking-[0.06em] text-white/70 sm:text-sm md:text-base">
          <p className="mt-2">
            Designed and Developed by{" "}
            <a
              href="https://credencesoft.in/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[var(--color-primary-hover)]"
              data-cursor="hover"
            >
              CredenceSoft
            </a>{" "}
            and Powered by{" "}
            <a
              href="https://bookonepms.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[var(--color-primary-hover)]"
              data-cursor="hover"
            >
              BookOne
            </a>
          </p>
        </div>
      </PageWrapper>
    </footer>
  );
}
