import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us & Direct Booking Desk | Tarangan Resort Nagaon-Alibag',
  description:
    'Contact Tarangan Resort in Nagaon, Alibag. Phone: 077568 38900, WhatsApp assistance, email inquiry, and resort location on Sahan Bypass Road, Palhe.',
};

export default function ContactPage() {
  return <ContactClient />;
}
