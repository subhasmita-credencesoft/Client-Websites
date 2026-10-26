'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type SmartImageProps = Omit<ImageProps, 'src'> & { src: string; fallback: string };

/**
 * Remote photos (Unsplash) are loaded by the visitor's browser straight from Unsplash's CDN, which already
 * serves resized/compressed images, so the Next.js server never needs outbound access.
 * If a photo fails to load, the local fallback image is shown instead.
 */
export function SmartImage({ src, fallback, alt, ...rest }: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const current = failed ? fallback : src;
  return <Image {...rest} alt={alt} src={current} unoptimized={current.startsWith('http')} onError={() => setFailed(true)} />;
}
