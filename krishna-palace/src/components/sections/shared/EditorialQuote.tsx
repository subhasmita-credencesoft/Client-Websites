import type { ReactNode } from 'react';

export default function EditorialQuote({ quote, cite }: { quote: ReactNode; cite: ReactNode }) {
  return (
    <div className="editorial-quote-wrap">
      <blockquote className="editorial-quote">{quote}</blockquote>
      <span className="editorial-quote-cite">{cite}</span>
    </div>
  );
}
