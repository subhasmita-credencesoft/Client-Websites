import Image from 'next/image';
import Link from 'next/link';

import type { ImageSource } from '@/shared/types/content';

export function CtaBand({
  eyebrow,
  heading,
  description,
  actionLabel,
  actionHref,
  image,
  imageAlt,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  image: ImageSource;
  imageAlt: string;
}) {
  return (
    <section className="offers-band">
      <div>
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{description}</p>
        <Link className="button button--light" href={actionHref}>
          {actionLabel}
        </Link>
      </div>
      <Image src={image} alt={imageAlt} fill sizes="100vw" />
    </section>
  );
}