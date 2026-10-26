import type { ReactNode } from 'react';

export function InfoTile({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-forest/15 bg-parchment p-7">
      <span className="text-terracotta">{icon}</span>
      <h2 className="mt-8 font-display text-3xl italic text-forest">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-sage-muted">{text}</p>
    </div>
  );
}