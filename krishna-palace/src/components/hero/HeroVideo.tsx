'use client';

import { useEffect, useRef } from 'react';

type HeroVideoProps = {
  src: string;
  poster: string;
};

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  return (
    <video
      ref={ref}
      className="cinematic-photo cinematic-photo--base"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
