import Image from 'next/image';
import Link from 'next/link';

import type { ImageSource } from '@/shared/types/content';

export function WelcomeSection({
  image,
  eyebrow,
  heading,
  description,
  action,
}: {
  image: ImageSource;
  eyebrow: string;
  heading: string;
  description: readonly string[];
  action: string;
}) {
  return (
    <section className="welcome-section" aria-label="About Hotel Sitara Residency">
      <div className="welcome-section__container">
        <div className="welcome-section__media-wrap">
          <div className="welcome-section__media">
            <Image
              src={image}
              alt={`${eyebrow} - Hotel Sitara Residency Building`}
              fill
              priority
              sizes="(max-width: 960px) 100vw, (max-width: 1400px) 52vw, 720px"
              className="welcome-section__img"
            />
          </div>
        </div>
        <div className="welcome-section__content">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
          <span className="line" />
          <p>{description[0]}</p>
          <p>{description[1]}</p>
          <Link href="/bedrooms" className="button">
            {action}
          </Link>
        </div>
      </div>
    </section>
  );
}
