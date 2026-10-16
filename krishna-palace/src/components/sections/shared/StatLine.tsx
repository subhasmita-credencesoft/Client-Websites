import type { ReactNode } from 'react';

export type Stat = {
  strong: ReactNode;
  label: ReactNode;
};

export default function StatLine({ items }: { items: Stat[] }) {
  return (
    <div className="stateline">
      {items.map((item, index) => (
        <div key={index}>
          <strong>{item.strong}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
