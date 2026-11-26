import React from 'react';
import type { Metadata } from 'next';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
  title: 'Guest Reviews & Ratings | Tarangan Resort Nagaon-Alibag',
  description:
    'Read verified guest reviews for Tarangan Resort in Nagaon, Alibag. 4.7/5 stars on Google with 161+ reviews praising clean cottage rooms, swimming pool, and seafood thalis.',
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
