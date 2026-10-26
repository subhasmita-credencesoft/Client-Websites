import Image from 'next/image';
import Link from 'next/link';

import type { ImageSource } from '@/shared/types/content';

export function SplitFeature({
  image,
  eyebrow,
  title,
  text,
  href,
  action,
  reverse = false,
}: {
  image: ImageSource;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  action: string;
  reverse?: boolean;
}) {
  return (
    <section className={`home-split ${reverse ? 'home-split--reverse' : ''}`}>
      <div className="home-split__image">
        <Image src={image} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" />
      </div>
      <div className="home-split__content">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <span className="line" />
          <p>{text}</p>
          <Link className="text-link" href={href}>
            {action} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}