import { Injectable } from '@angular/core';
import { Booking, BookingCoupon } from '../models/booking.model';
import { BehaviorSubject } from 'rxjs';
import { FareQuote } from '../pricing/pricing.types';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private lastTaxDetails: any[] = [];

  private _booking = new BehaviorSubject<Booking>({
    pickup: null,
    dropoff: null,

    // date & time (used in step-location)
    date: '',
    time: '',

    // ✅ Trip direction (one-way / return)
    tripType: 'one-way',

    // ✅ EXISTING (DO NOT REMOVE)
    // pickup-drop | outstation | rental
    tripTypeValue: 'pickup-drop',

    // ✅ NEW (normalized for pricing engine)
    // pickup_drop | outstation | rental
    tripServiceType: 'pickup_drop',

    distanceKm: 0,
    durationMinutes: 0,

    // Rental defaults
    rentalHours: 1,
    rentalKm: 10,

    vehicleCategory: '',

    passengers: {
      type: 'personal',
      adults: 1,
      children: 0,
      luggage: 0
    },

    vehicle: {
      name: '',
      seats: 0,
      bags: 0,
      price: 0,
      image: '',
      carNumber: '',
    },
    pricing: {
  fareAmount: 0,
  discountAmount: 0,
  taxableAmount: 0,
  baseAmount: 0,
  taxPercentage: 0,
  taxAmount: 0,
  totalAmount: 0,
},
    coupon: {
      code: '',
      status: 'none',
      discountPercentage: 0,
      discountAmount: 0,
      message: ''
    },

    traveller: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      notes: '',
    },

    // ✅ NEW: pricing result
    fareQuote: undefined
  });

  booking$ = this._booking.asObservable();

  private _step = new BehaviorSubject<number>(0);
  step$ = this._step.asObservable();

  /* ---------------- STEP CONTROL ---------------- */

  setStep(i: number) {
    this._step.next(i);
  }

  nextStep() {
    this._step.next(Math.min(3, this._step.value + 1));
  }

  prevStep() {
    this._step.next(Math.max(0, this._step.value - 1));
  }

  /* ---------------- STATE UPDATE ---------------- */

  update(patch: Partial<Booking>) {
    this._booking.next({ ...this._booking.value, ...patch });
  }

  patchDeep(patch: Partial<Booking>) {
    const current = this._booking.value;
    const nextState: Booking = {
      ...current,
      ...patch,

      // 🔁 keep normalized service type in sync
      tripServiceType: patch.tripTypeValue
        ? this.mapServiceType(patch.tripTypeValue)
        : current.tripServiceType
    };

    if (patch.tripTypeValue) {
      nextState.coupon = this.revalidateCouponForTripType(
        nextState.coupon ?? current.coupon,
        patch.tripTypeValue
      );
    }

    this._booking.next(nextState);
  }

  setCurrent(data: Partial<Booking>) {
    this.patchDeep(data);
  }

  setBooking(b: Booking) {
    this._booking.next(b);
  }

  getCurrent(): Booking {
    return this._booking.value;
  }

  /* ---------------- PRICING ---------------- */

  setFareQuote(quote: FareQuote) {
    this._booking.next({
      ...this._booking.value,
      fareQuote: quote
    });
    this.applyTaxAndPricing(quote.total, this.lastTaxDetails);
  }

  clearFareQuote() {
    this._booking.next({
      ...this._booking.value,
      fareQuote: undefined
    });
    this.applyTaxAndPricing(0, this.lastTaxDetails);
  }

  /* ---------------- HELPERS ---------------- */

  generateRef() {
    const ref = Math.floor(100000000 + Math.random() * 900000000).toString();
    this._booking.next({ ...this._booking.value, bookingRef: ref });
    return ref;
  }

  setCouponCode(rawCode: string) {
    const normalized = this.normalizeCouponCode(rawCode);
    const coupon = this.evaluateCoupon(normalized, this._booking.value.tripTypeValue);

    this._booking.next({
      ...this._booking.value,
      coupon
    });

    const fareAmount = this._booking.value.fareQuote?.total ?? 0;
    this.applyTaxAndPricing(fareAmount, this.lastTaxDetails);
  }

  clearCoupon() {
    this.setCouponCode('');
  }

  applyTaxAndPricing(fareAmount: number, taxDetails: any[]) {
    this.lastTaxDetails = taxDetails ?? [];

    const current = this._booking.value;
    const tripType = current.tripTypeValue;
    const coupon = this.revalidateCouponForTripType(current.coupon, tripType);

    const safeFareAmount = this.round2(Math.max(0, fareAmount || 0));
    const discountableFareAmount = this.getDiscountableFareAmount(
      safeFareAmount,
      tripType,
      current.fareQuote
    );
    const discountAmount =
      coupon.status === 'applied'
        ? this.round2(
            Math.min(
              discountableFareAmount,
              (discountableFareAmount * coupon.discountPercentage) / 100
            )
          )
        : 0;
    const taxableAmount = this.round2(Math.max(0, safeFareAmount - discountAmount));

    let taxPercentage = 0;
    if (this.lastTaxDetails.length) {
      const gst = this.lastTaxDetails.find(t => t.name === 'GST');
      if (gst?.taxSlabsList?.length) {
        const slab = gst.taxSlabsList.find(
          (s: any) => taxableAmount >= s.minAmount && taxableAmount <= s.maxAmount
        );
        taxPercentage = slab?.percentage ?? gst.percentage ?? 0;
      } else {
        taxPercentage = gst?.percentage ?? 0;
      }
    }

    const taxAmount = this.round2((taxableAmount * taxPercentage) / 100);
    const totalAmount = this.round2(taxableAmount + taxAmount);

    this._booking.next({
      ...current,
      coupon: {
        ...coupon,
        discountAmount
      },
      pricing: {
        fareAmount: safeFareAmount,
        discountAmount,
        taxableAmount,
        baseAmount: taxableAmount,
        taxPercentage,
        taxAmount,
        totalAmount
      }
    });
  }

  getCouponPreviewForFare(
    fareAmount: number,
    tripTypeValue?: Booking['tripTypeValue'],
    fareQuote?: FareQuote
  ): { coupon: BookingCoupon; discountAmount: number; finalAmount: number } {
    const current = this._booking.value;
    const safeFare = this.round2(Math.max(0, fareAmount || 0));
    const activeTripType = tripTypeValue ?? current.tripTypeValue;
    const coupon = this.evaluateCoupon(
      current.coupon?.code || '',
      activeTripType
    );
    const discountableFareAmount = this.getDiscountableFareAmount(
      safeFare,
      activeTripType,
      fareQuote
    );

    const discountAmount =
      coupon.status === 'applied'
        ? this.round2(
            Math.min(
              discountableFareAmount,
              (discountableFareAmount * coupon.discountPercentage) / 100
            )
          )
        : 0;

    const finalAmount = this.round2(Math.max(0, safeFare - discountAmount));
    return { coupon: { ...coupon, discountAmount }, discountAmount, finalAmount };
  }


  reset() {
    this._booking.next({
      pickup: null,
      dropoff: null,
      date: '',
      time: '',
      tripType: 'one-way',
      tripTypeValue: 'pickup-drop',
      tripServiceType: 'pickup_drop',

      distanceKm: 0,
      durationMinutes: 0,

      rentalHours: 1,
      rentalKm: 10,
      vehicleCategory: '',

      passengers: {
        type: 'personal',
        adults: 1,
        children: 0,
        luggage: 0
      },

      vehicle: {
        name: '',
        seats: 0,
        bags: 0,
        price: 0,
        image: '',
        carNumber: '',
      },
      pricing: {
        fareAmount: 0,
        discountAmount: 0,
        taxableAmount: 0,
        baseAmount: 0,
        taxPercentage: 0,
        taxAmount: 0,
        totalAmount: 0,
      },
      coupon: {
        code: '',
        status: 'none',
        discountPercentage: 0,
        discountAmount: 0,
        message: ''
      },

      traveller: {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        notes: '',
      },

      bookingRef: '',
      fareQuote: undefined
    });

    this._step.next(0);
  }

  /* ---------------- DISPLAY HELPERS ---------------- */

  getTripTypeDisplay(): string {
    const tripType = this._booking.value.tripTypeValue;
    switch (tripType) {
      case 'pickup-drop':
        return 'Pickup & Drop';
      case 'outstation':
        return 'Outstation';
      case 'rental':
        return 'Rental';
      default:
        return 'Unknown';
    }
  }

  isRentalBooking(): boolean {
    return this._booking.value.tripTypeValue === 'rental';
  }

  isOutstationBooking(): boolean {
    return this._booking.value.tripTypeValue === 'outstation';
  }

  isPickupDropBooking(): boolean {
    return this._booking.value.tripTypeValue === 'pickup-drop';
  }

  /* ---------------- INTERNAL ---------------- */

  private mapServiceType(
    legacy: 'pickup-drop' | 'outstation' | 'rental'
  ): 'pickup_drop' | 'outstation' | 'rental' {
    if (legacy === 'pickup-drop') return 'pickup_drop';
    return legacy;
  }

  private normalizeCouponCode(rawCode?: string): string {
    return (rawCode || '').trim().toUpperCase();
  }

  private revalidateCouponForTripType(
    coupon: BookingCoupon | undefined,
    tripTypeValue: Booking['tripTypeValue']
  ): BookingCoupon {
    return this.evaluateCoupon(coupon?.code || '', tripTypeValue);
  }

  private evaluateCoupon(
    code: string,
    tripTypeValue: Booking['tripTypeValue']
  ): BookingCoupon {
    const normalizedCode = this.normalizeCouponCode(code);

    if (!normalizedCode) {
      return {
        code: '',
        status: 'none',
        discountPercentage: 0,
        discountAmount: 0,
        message: ''
      };
    }

    const couponRules: Record<string, { discountPercentage: number; allowedTripType: Booking['tripTypeValue'] }> = {
      OUT10: { discountPercentage: 10, allowedTripType: 'outstation' },
      PICKUP20: { discountPercentage: 20, allowedTripType: 'pickup-drop' }
    };

    const rule = couponRules[normalizedCode];
    if (!rule) {
      return {
        code: normalizedCode,
        status: 'invalid',
        discountPercentage: 0,
        discountAmount: 0,
        message: 'Invalid coupon code.'
      };
    }

    if (!tripTypeValue || tripTypeValue !== rule.allowedTripType) {
      return {
        code: normalizedCode,
        status: 'ineligible',
        discountPercentage: 0,
        discountAmount: 0,
        message: normalizedCode === 'OUT10'
          ? 'OUT10 is valid only for outstation trips.'
          : 'PICKUP20 is valid only for pickup & drop trips.'
      };
    }

    return {
      code: normalizedCode,
      status: 'applied',
      discountPercentage: rule.discountPercentage,
      discountAmount: 0,
      message: `${normalizedCode} applied successfully.`
    };
  }

  private round2(value: number): number {
    return +value.toFixed(2);
  }

  private getDiscountableFareAmount(
    fareAmount: number,
    tripTypeValue?: Booking['tripTypeValue'],
    fareQuote?: FareQuote
  ): number {
    const safeFareAmount = this.round2(Math.max(0, fareAmount || 0));
    if (tripTypeValue !== 'outstation') return safeFareAmount;

    const quote = fareQuote ?? this._booking.value.fareQuote;
    if (!quote?.lines?.length) return safeFareAmount;

    const driverAllowance = this.round2(
      quote.lines
        .filter(line => line.code === 'DRIVER')
        .reduce((sum, line) => sum + Math.max(0, line.amount || 0), 0)
    );

    return this.round2(Math.max(0, safeFareAmount - driverAllowance));
  }
}
