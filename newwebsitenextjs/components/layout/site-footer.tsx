import { footerColumns } from "@/lib/data/mountain-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#c9a46e]/20 bg-[#1e3329] px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-[92rem] gap-10 md:grid-cols-4">
        {footerColumns.map((column, columnIndex) => (
          <ul key={columnIndex} className="space-y-3 text-base text-white/85 md:text-lg">
            {column.map((item) => (
              <li key={item}>
                <a href="#" className="leading-relaxed transition-colors hover:text-[#c9a46e]" data-cursor="hover">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
}
