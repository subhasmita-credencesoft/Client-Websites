import Image from 'next/image';
import Link from 'next/link';

import type { ImageSource } from '@/shared/types/content';

export function ImageCallout({
  image,
  eyebrow,
  title,
  text,
  href,
  action,
}: {
  image: ImageSource;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  action: string;
}) {
  return (
    <article className="image-callout">
      <div className="image-callout__media">
        <Image src={image} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" />
      </div>
      <div className="image-callout__body">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link href={href} className="text-link">
          {action} <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}