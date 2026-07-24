"use client";

import { useState } from "react";
import { List } from "lucide-react";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

interface BlogTOCProps {
  toc: BlogPost["toc"];
}

export function BlogTOC({ toc }: BlogTOCProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="rounded-[20px] border border-gold/15 bg-dark-2 p-6" aria-label="Table of Contents">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-sm font-medium uppercase tracking-[0.22em] text-ivory/80 lg:cursor-default"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <List size={16} className="text-gold" />
          Table of Contents
        </span>
        <span className={cn("transition lg:hidden", open && "rotate-180")}>▾</span>
      </button>

      <ul className={cn("mt-4 space-y-2", !open && "hidden lg:block")}>
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block py-1 text-sm text-ivory/60 transition hover:text-gold hover:pl-1"
            >
              {item.label}
            </a>
            {item.children && (
              <ul className="ml-4 mt-1 space-y-1 border-l border-gold/10 pl-3">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className="block py-0.5 text-xs text-ivory/45 transition hover:text-gold"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
