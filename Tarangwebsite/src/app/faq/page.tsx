import React from 'react';
import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Tarangan Resort Nagaon-Alibag',
  description:
    'Answers to common questions about Tarangan Resort in Nagaon, Alibag: check-in/out hours, swimming pool rules, pet policy, seafood menu, and travel directions.',
};

export default function FAQPage() {
  return <FAQClient />;
}
