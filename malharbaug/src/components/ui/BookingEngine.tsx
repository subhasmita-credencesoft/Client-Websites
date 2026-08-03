'use client';

import { useState } from 'react';
import Image from 'next/image';
import { rooms } from '@/data/rooms';

export default function BookingEngine() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState('');

  const selectedRoom = rooms.find((r) => r.id === roomType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Booking request submitted! Our team will confirm your reservation shortly.');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl border border-earth-100 bg-white p-8 shadow-2xl"
    >
      <h2 className="mb-6 font-serif text-2xl font-bold text-brand-800">Book Your Stay</h2>

      <div className="space-y-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="engine-check-in" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
            Check-in Date
          </label>
          <input
            id="engine-check-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-lg border border-earth-200 bg-earth-50 px-4 py-3 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="engine-check-out" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
            Check-out Date
          </label>
          <input
            id="engine-check-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-lg border border-earth-200 bg-earth-50 px-4 py-3 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="engine-adults" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
              Adults
            </label>
            <select
              id="engine-adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full rounded-lg border border-earth-200 bg-earth-50 px-4 py-3 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="engine-children" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
              Children
            </label>
            <select
              id="engine-children"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full rounded-lg border border-earth-200 bg-earth-50 px-4 py-3 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="engine-room" className="text-xs font-semibold uppercase tracking-wider text-earth-600">
            Room Type
          </label>
          <select
            id="engine-room"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full rounded-lg border border-earth-200 bg-earth-50 px-4 py-3 text-sm text-earth-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="">Select a Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>{room.title}</option>
            ))}
          </select>
        </div>

        {selectedRoom && (
          <div className="overflow-hidden rounded-xl border border-earth-100">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-earth-100">
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <h3 className="font-serif text-lg font-bold text-brand-800">{selectedRoom.title}</h3>
              <p className="text-sm text-earth-600">{selectedRoom.tagline}</p>
              <p className="text-sm text-earth-500">Capacity: {selectedRoom.capacity}</p>
              <div className="flex items-baseline gap-2 border-t border-earth-100 pt-3">
                <span className="font-serif text-xl font-bold text-brand-700">{selectedRoom.price}</span>
                <span className="text-xs text-earth-500">price estimate</span>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow transition-colors duration-200 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Book Now
        </button>
      </div>
    </form>
  );
}
