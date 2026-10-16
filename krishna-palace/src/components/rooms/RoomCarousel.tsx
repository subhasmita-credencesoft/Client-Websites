'use client';

import { useEffect, useState } from 'react';

const INTERVAL_MS = 2000;

export default function RoomCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [images.length]);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  if (!images.length) return null;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.dataset.failed) return;
    image.dataset.failed = '1';
    image.style.visibility = 'hidden';
  };

  return (
    <div
      className="room-media"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} photos`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {images.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt={index === 0 ? alt : ''}
          className={index === active ? 'is-active' : ''}
          decoding="async"
          onError={handleImageError}
        />
      ))}

      {images.length > 1 && (
        <div className="room-dots">
          {images.map((src, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              className={`room-dot${index === active ? ' is-active' : ''}`}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
