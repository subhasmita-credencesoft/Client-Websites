import type { ReactNode } from 'react';
import Link from 'next/link';

export type TimelineItem = {
  time: ReactNode;
  period: ReactNode;
  title: ReactNode;
  body: ReactNode;
  link: { href: string; label: ReactNode };
};

export default function TimelineGrid({ items }: { items: TimelineItem[] }) {
  return (
    <div className="dining-timeline-grid">
      {items.map((item, index) => (
        <div className="timeline-card" key={index}>
          <span className="timeline-card__time">{item.time}</span>
          <span className="timeline-card__period">{item.period}</span>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
          {item.link.href.startsWith('/') ? (
            <Link className="text-link" href={item.link.href}>
              {item.link.label}
            </Link>
          ) : (
            <a className="text-link" href={item.link.href}>
              {item.link.label}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
