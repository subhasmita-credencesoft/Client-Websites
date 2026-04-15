"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.question}
            className="rounded-[24px] border border-[var(--neutral-200)] bg-white px-6 py-5 shadow-[0_2px_10px_rgba(15,24,25,0.06)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-lg font-semibold text-[var(--text-primary)]">{item.question}</span>
              <span className="text-2xl leading-none text-[var(--accent-gold)]">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? (
              <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">{item.answer}</p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
