import { Check, Clock, Users } from 'lucide-react';

import type { DetailContent } from '@/core/types/content';

export function RoomAmenities({ detail }: { detail: DetailContent }) {
  const hasFacilities = detail.facilities && detail.facilities.length > 0;

  return (
    <>
      {/* In-Room Amenities from API */}
      <section className="rounded-sm border border-forest/10 bg-white p-5 sm:p-7 md:p-10 shadow-xs">
        <span className="font-mono-label text-[10px] uppercase tracking-widest text-terracotta font-bold">
          In-Room Comforts
        </span>
        <h2 className="mt-2 font-display text-2xl text-forest md:text-3xl">
          Included Amenities &amp; Facilities
        </h2>
        <div className="mt-3 h-0.5 w-12 bg-terracotta/40" />

        {hasFacilities ? (
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
            {detail.facilities!.map((fac) => (
              <span
                key={fac}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-sm border border-forest/10 bg-cream/50 px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-medium text-forest"
              >
                <Check size={13} className="text-terracotta shrink-0" />
                {fac}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-sage-muted">
            Contact our team for the full amenities list for this room.
          </p>
        )}
      </section>

      {/* Stay Specifications — sourced from API occupancy & pricing */}
      <section className="rounded-sm border border-forest/10 bg-white p-5 sm:p-7 md:p-10 shadow-xs">
        <span className="font-mono-label text-[10px] uppercase tracking-widest text-terracotta font-bold">
          Stay Specifications
        </span>
        <h2 className="mt-2 font-display text-2xl text-forest md:text-3xl">
          Policies &amp; Key Details
        </h2>
        <div className="mt-3 h-0.5 w-12 bg-terracotta/40" />

        <div className="mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2 text-xs">
          <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-sm bg-cream/60 border border-forest/10">
            <Clock size={16} className="text-terracotta shrink-0 mt-0.5" />
            <div>
              <strong className="block text-forest font-semibold">Check-in &amp; Check-out</strong>
              <p className="mt-1 text-sage-muted">
                Check-in from 12:00 PM. Check-out by 11:00 AM. Early check-in on availability.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-sm bg-cream/60 border border-forest/10">
            <Users size={16} className="text-terracotta shrink-0 mt-0.5" />
            <div>
              <strong className="block text-forest font-semibold">Occupancy &amp; Extra Guests</strong>
              <p className="mt-1 text-sage-muted">
                {detail.occupancy}.{' '}
                {detail.extraGuestFee
                  ? `Extra guest charge ${detail.extraGuestFee}.`
                  : 'No extra guest surcharge listed.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
