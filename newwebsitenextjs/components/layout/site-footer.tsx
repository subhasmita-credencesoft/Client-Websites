import Link from "next/link";
import { footerSections } from "@/lib/data/content/mountain-content";
import type { FooterSection } from "@/types";

export function SiteFooter() {
  const sections = footerSections as FooterSection[];

  return (
    <footer className="border-t border-[#c9a46e]/20 bg-[#0f0d0b]">
      <div className="site-container max-w-[92rem] py-14 md:py-16">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {sections.map((section, sectionIndex) => (
            <ul key={sectionIndex} className="space-y-3 text-sm text-[#f2e8d8]/88 sm:text-base md:text-lg">
              {section.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block break-words leading-relaxed transition-colors hover:text-[#d5b07a]"
                      data-cursor="hover"
                    >
                      {item.label}
                    </a>
                  ) : item.href.startsWith("tel:") ? (
                    <a
                      href={item.href}
                      className="block break-words leading-relaxed transition-colors hover:text-[#d5b07a]"
                      data-cursor="hover"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="block break-words leading-relaxed transition-colors hover:text-[#d5b07a]"
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
              className="transition-colors hover:text-[#d5b07a]"
              data-cursor="hover"
            >
              CredenceSoft
            </a>{" "}
            and Powered by{" "}
            <a
              href="https://bookonepms.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#d5b07a]"
              data-cursor="hover"
            >
              BookOne
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
