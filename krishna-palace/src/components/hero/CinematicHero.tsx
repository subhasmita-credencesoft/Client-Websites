import type { ReactNode } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/layout/SiteHeader';
import HeroVideo from '@/components/hero/HeroVideo';
import { hotel } from '@/data/site';

type CinematicHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  image: string;
  alt: string;
  video?: string;
  secondImage: string;
  secondAlt: string;
  secondEyebrow: string;
  secondTitle: string;
  secondDescription: string;
  home?: boolean;
};

export default function CinematicHero({
  eyebrow, title, description, image, alt, video, secondImage, secondAlt,
  secondEyebrow, secondTitle, secondDescription, home = false,
}: CinematicHeroProps) {
  return (
    <section className={`cinematic-hero${home ? ' cinematic-hero--home' : ''}`} aria-label={eyebrow ? `${eyebrow}: ${title}` : `${title}`}>
      <SiteHeader />
      <div className="cinematic-pin">
        {video
          ? <HeroVideo src={video} poster={image} />
          : <img className="cinematic-photo cinematic-photo--base" src={image} alt={alt} fetchPriority="high" />}
        {!home && <div className="cinematic-wordmark" aria-hidden="true">HOSAPETE</div>}
        <img className="cinematic-photo cinematic-photo--after" src={secondImage} alt={secondAlt} />
        <div className="cinematic-scrim" aria-hidden="true" />
        <div className="cinematic-copy cinematic-copy--first">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          <p>{description}</p>
          {home && <div className="hero-actions"><a className="button" href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">Book now</a><Link className="button button--outline" href="/tourism/">Explore the region</Link></div>}
        </div>
        <div className="cinematic-copy cinematic-copy--second" aria-hidden="true">
          <span className="eyebrow">{secondEyebrow}</span>
          <h2>{secondTitle}</h2>
          <p>{secondDescription}</p>
        </div>
        <span className="cinematic-index" aria-hidden="true">HOSAPETE · HAMPI · KARNATAKA</span>
        <div className="cinematic-progress" aria-hidden="true"><span /></div>
        <span className="cinematic-scroll-cue" aria-hidden="true">Scroll to discover <i /></span>
      </div>
    </section>
  );
}
