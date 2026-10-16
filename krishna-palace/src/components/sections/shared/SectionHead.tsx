import type { ReactNode } from 'react';

type SectionHeadProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  body?: ReactNode;
};

export default function SectionHead({ eyebrow, title, body }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
