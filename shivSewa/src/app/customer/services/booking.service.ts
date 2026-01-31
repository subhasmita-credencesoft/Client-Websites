import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject } from 'rxjs';
import { FareQuote } from '../pricing/pricing.types';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

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
  baseAmount: 0,
  taxPercentage: 0,
  taxAmount: 0,
  totalAmount: 0,
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
    this._booking.next({
      ...current,
      ...patch,

      // 🔁 keep normalized service type in sync
      tripServiceType: patch.tripTypeValue
        ? this.mapServiceType(patch.tripTypeValue)
        : current.tripServiceType
    });
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
  }

  clearFareQuote() {
    this._booking.next({
      ...this._booking.value,
      fareQuote: undefined
    });
  }

  /* ---------------- HELPERS ---------------- */

  generateRef() {
    const ref = Math.floor(100000000 + Math.random() * 900000000).toString();
    this._booking.next({ ...this._booking.value, bookingRef: ref });
    return ref;
  }

  applyTaxAndPricing(
  baseAmount: number,
  taxDetails: any[]
) {
  let taxPercentage = 0;

  if (taxDetails?.length) {
    const gst = taxDetails.find(t => t.name === 'GST');

    if (gst?.taxSlabsList?.length) {
      const slab = gst.taxSlabsList.find(
        (s: any) => baseAmount >= s.minAmount && baseAmount <= s.maxAmount
      );
      taxPercentage = slab?.percentage ?? gst.percentage ?? 0;
    }
  }

  const taxAmount = +(baseAmount * taxPercentage / 100).toFixed(2);
  const totalAmount = +(baseAmount + taxAmount).toFixed(2);

  this.patchDeep({
    pricing: {
      baseAmount,
      taxPercentage,
      taxAmount,
      totalAmount
    }
  });
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
        baseAmount: 0,
        taxPercentage: 0,
        taxAmount: 0,
        totalAmount: 0,
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
}
