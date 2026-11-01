import type { Metadata } from 'next';
import RoomsListView from '@/features/rooms/RoomsListView';
import { getRooms } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const rooms = await getRooms();
  const titles = rooms.map((room) => room.title).join(', ');
  const prices = rooms
    .map((room) => room.priceValue)
    .filter((value): value is number => typeof value === 'number');
  const from =
    prices.length > 0
      ? ` Rates starting ₹${Math.min(...prices).toLocaleString('en-IN')}/night.`
      : '';
  return {
    title: 'Rooms & Villas',
    description: `Choose from ${titles} at Malhar Baug Resort, Alibaug near Nagaon Beach.${from}`,
    alternates: { canonical: '/rooms/' },
  };
}

export default function RoomsPage() {
  return <RoomsListView />;
}
