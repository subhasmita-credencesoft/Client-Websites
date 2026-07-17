"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { imageSet } from "@/lib/data";
import { cn } from "@/lib/utils";

interface FAQPageClientProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQPageClient({ faqs }: FAQPageClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PageHero
        image={imageSet.homeHero}
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Answers to common questions about rooms, booking, and stays at Redwings Studio, Goa."
        priority
      />

      <section className="section-space">
        <div className="container-shell mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className="rounded-[24px] border border-gold/16 bg-dark-2 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-display text-2xl text-ivory">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "shrink-0 text-gold transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                  )}
                >
                  <p className="px-6 text-base leading-8 text-ivory/68">
                    {faq.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
