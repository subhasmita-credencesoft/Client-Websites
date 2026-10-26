import Image from 'next/image';
import Link from 'next/link';

import type { ImageSource } from '@/shared/types/content';

export function ExperienceSection({
  eyebrow,
  heading,
  description,
  actionLabel,
  actionHref,
  image,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  image: ImageSource;
}) {
  return (
    <section className="experience-section">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{description}</p>
        <Link href={actionHref} className="text-link">
          {actionLabel} <span aria-hidden>→</span>
        </Link>
      </div>
      <div className="experience-section__image">
        <Image src={image} alt="A comfortable hotel space" fill sizes="(max-width: 800px) 100vw, 50vw" />
      </div>
    </section>
  );
}