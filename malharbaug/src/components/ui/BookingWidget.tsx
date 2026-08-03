'use client';

import { useState } from 'react';
import { rooms } from '@/data/rooms';
import { bookingEngineUrl } from '@/data/booking';

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(bookingEngineUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-earth-100 bg-white p-6 shadow-2xl md:flex-row md:items-end"
    >
      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="widget-check-in" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
          Check-in
        </label>
        <input
          id="widget-check-in"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full rounded-lg border border-earth-200 bg-earth-50 px-3 py-2 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="widget-check-out" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
          Check-out
        </label>
        <input
          id="widget-check-out"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full rounded-lg border border-earth-200 bg-earth-50 px-3 py-2 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="widget-adults" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
          Adults
        </label>
        <select
          id="widget-adults"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="w-full rounded-lg border border-earth-200 bg-earth-50 px-3 py-2 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="widget-children" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
          Children
        </label>
        <select
          id="widget-children"
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          className="w-full rounded-lg border border-earth-200 bg-earth-50 px-3 py-2 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          {Array.from({ length: 11 }, (_, i) => i).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="widget-room" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
          Room Type
        </label>
        <select
          id="widget-room"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="w-full rounded-lg border border-earth-200 bg-earth-50 px-3 py-2 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>{room.title}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="flex-shrink-0 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow transition-colors duration-200 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Check Availability
      </button>
    </form>
  );
}
