import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  faqs: Array<{ question: string; answer: string }>;
}

export function FaqSection({ eyebrow, title, description, faqs }: FaqSectionProps) {
  return (
    <section className="section-space">
      <div className="container-shell mx-auto max-w-4xl">
        <div className="mb-10">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="display-title text-4xl">{title}</h2>
          {description ? (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ivory/68">
              {description}
            </p>
          ) : null}
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group overflow-hidden rounded-[24px] border border-gold/16 bg-dark-2"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-2xl text-ivory">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-base leading-8 text-ivory/68">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
