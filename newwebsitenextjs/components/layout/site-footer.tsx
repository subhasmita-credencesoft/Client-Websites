import Link from "next/link";
import { footerSections } from "@/lib/data/content/mountain-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#c9a46e]/20 bg-[#0f0d0b] px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-[92rem] gap-8 md:grid-cols-3 md:gap-12">
        {footerSections.map((section, sectionIndex) => (
          <ul key={sectionIndex} className="space-y-3 text-base text-[#f2e8d8]/88 md:text-lg">
            {section.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="leading-relaxed transition-colors hover:text-[#d5b07a]"
                    data-cursor="hover"
                  >
                    {item.label}
                  </a>
                ) : item.href.startsWith("tel:") ? (
                  <a
                    href={item.href}
                    className="leading-relaxed transition-colors hover:text-[#d5b07a]"
                    data-cursor="hover"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="leading-relaxed transition-colors hover:text-[#d5b07a]"
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
      <div className="mx-auto mt-10 max-w-[92rem] border-t border-white/10 pt-6 text-center text-sm tracking-[0.08em] text-white/70 md:text-base">
        © 2026 Hotel Redwings Castle. Designed and Developed by CredenceSoft and Powered By BookOne.
      </div>
    </footer>
  );
}
