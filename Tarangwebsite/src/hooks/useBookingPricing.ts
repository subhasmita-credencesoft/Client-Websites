'use client';

import { useMemo } from 'react';
import { BookingAddons } from '@/types';

interface PricingInput {
  basePrice: number;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  addons: BookingAddons;
}

export function useBookingPricing({
  basePrice,
  checkInDate,
  checkOutDate,
  adults,
  children,
  addons,
}: PricingInput) {
  return useMemo(() => {
    // 1. Calculate nights
    let nights = 1;
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      nights = diffDays > 0 ? diffDays : 1;
    } catch {
      nights = 1;
    }

    // 2. Base room charges
    const baseRoomTotal = basePrice * nights;

    // 3. Extra guest fees (adults > 2)
    const extraAdults = Math.max(0, adults - 2);
    const extraGuestFee = extraAdults * 800 * nights;

    // 4. Add-on fees
    const dinnerFee = addons.dinnerThali ? (adults + children) * 450 * nights : 0;
    const bonfireFee = addons.eveningBonfire ? 800 : 0;
    const earlyCheckInFee = addons.earlyCheckIn ? 500 : 0;
    const petFee = addons.petCare ? 400 : 0;

    const addonsTotal = dinnerFee + bonfireFee + earlyCheckInFee + petFee;

    // 5. Taxes & Grand Total
    const subTotal = baseRoomTotal + extraGuestFee + addonsTotal;
    const gstRate = 0.12; // 12% GST on hospitality
    const gstAmount = Math.round(subTotal * gstRate);
    const grandTotal = subTotal + gstAmount;

    return {
      nights,
      baseRoomTotal,
      extraGuestFee,
      addonsBreakdown: {
        dinnerFee,
        bonfireFee,
        earlyCheckInFee,
        petFee,
      },
      addonsTotal,
      subTotal,
      gstAmount,
      grandTotal,
    };
  }, [basePrice, checkInDate, checkOutDate, adults, children, addons]);
}
