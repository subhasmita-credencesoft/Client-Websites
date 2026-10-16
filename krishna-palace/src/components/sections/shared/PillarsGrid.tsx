import type { ReactNode } from 'react';

export type Pillar = {
  kicker: ReactNode;
  title: ReactNode;
  body: ReactNode;
};

export default function PillarsGrid({ items }: { items: Pillar[] }) {
  return (
    <div className="pillars-grid">
      {items.map((item, index) => (
        <div className="pillar-card" key={index}>
          <span>{item.kicker}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
