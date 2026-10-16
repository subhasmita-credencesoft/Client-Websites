import type { ReactNode } from 'react';

export type QuickNavItem = {
  index: string;
  label: string;
  href: string;
};

export function QuickNav({ items }: { items: QuickNavItem[] }) {
  return (
    <div className="dining-quick-bar">
      {items.map((item) => (
        <a className="dining-quick-pill" href={item.href} key={item.href}>
          <span>{item.index}</span>{` ${item.label}`}
        </a>
      ))}
    </div>
  );
}

type QuickNavSectionProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  body: ReactNode;
  items: QuickNavItem[];
};

export default function QuickNavSection({ eyebrow, title, body, items }: QuickNavSectionProps) {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="dining-experience-intro">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <QuickNav items={items} />
      </div>
    </section>
  );
}
