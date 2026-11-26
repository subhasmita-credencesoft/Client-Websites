import React from 'react';
import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Photo Gallery | Tarangan Resort Nagaon-Alibag',
  description:
    'View high-resolution photos of Tarangan Resort: deluxe cottage bedrooms, swimming pool, kids splash pool, authentic coastal seafood thalis, and lush coconut lawns.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
