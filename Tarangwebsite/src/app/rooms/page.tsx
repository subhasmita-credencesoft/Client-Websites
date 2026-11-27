import React from 'react';
import type { Metadata } from 'next';
import { fetchAvailableRooms } from '@/services/hotelApi';
import RoomsClient from './RoomsClient';

export const metadata: Metadata = {
  title: 'Rooms & Deluxe Cottages | Tarangan Resort Nagaon-Alibag',
  description:
    'Browse air-conditioned deluxe cottages and suites at Tarangan Resort in Nagaon, Alibag. Featuring swimming pool views, split AC, king beds, and free Wi-Fi.',
};

export default async function RoomsPage() {
  const initialRooms = await fetchAvailableRooms();
  return <RoomsClient initialRooms={initialRooms} />;
}
