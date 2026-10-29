import type { FaqItem } from '@/data/faqs';

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  items: FaqItem[];
  id?: string;
};

export default function FaqSection({
  eyebrow = 'Frequently Asked Questions',
  title = 'Everything you need to know.',
  body = 'Find clear answers to common questions about stays, dining, banquets, and exploring Hampi from Hotel Krishna Palace.',
  items,
  id = 'faq',
}: FaqSectionProps) {
  if (!items || !items.length) return null;

  return (
    <section className="section faq-section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="section-head">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 id={`${id}-heading`}>{title}</h2>
        </div>
        {body && <p>{body}</p>}
      </div>

      <div className="faq-list">
        {items.map((item, index) => (
          <details className="faq-item" key={item.question} open={index === 0}>
            <summary className="faq-question">
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
