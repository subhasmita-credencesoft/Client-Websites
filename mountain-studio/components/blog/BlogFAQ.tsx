"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogFAQ } from "@/types";

interface BlogFAQSectionProps {
  faqs: BlogFAQ[];
}

export function BlogFAQSection({ faqs }: BlogFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-[16px] border border-gold/12 bg-dark-2 transition hover:border-gold/25"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <h3 className="font-display text-lg text-ivory">{faq.question}</h3>
              <ChevronDown
                size={18}
                className={cn(
                  "mt-1 shrink-0 text-gold transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden px-5 text-sm leading-7 text-ivory/60",
                isOpen ? "pb-5" : "max-h-0"
              )}
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
