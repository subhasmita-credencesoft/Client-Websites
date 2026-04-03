import Link from "next/link";
import { footerSections } from "@/lib/data/content/mountain-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#c9a46e]/20 bg-[#0f0d0b] px-4 py-14 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[92rem] gap-8 md:grid-cols-3 md:gap-12">
        {footerSections.map((section, sectionIndex) => (
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
      <div className="mx-auto mt-10 max-w-[92rem] border-t border-white/10 pt-6 text-center text-xs tracking-[0.06em] text-white/70 sm:text-sm md:text-base">
        <p>&copy; 2026 The Mountain Resort in Karjat , By Redwings. All rights reserved.</p>
        <p className="mt-2">Designed and Developed by CredenceSoft and Powered By BookOne</p>
      </div>
    </footer>
  );
}
