import type { ReactNode } from 'react';

export default function FeatureList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="feature-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
