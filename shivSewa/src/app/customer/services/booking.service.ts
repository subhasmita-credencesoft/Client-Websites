import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _booking = new BehaviorSubject<Booking>({
    pickup: null,
    dropoff: null,
    date: '',
    time: '',
    tripType: 'one-way',
    tripTypeValue: 'pickup-drop', // Default trip type
      distanceKm: 0,
      durationMinutes: 0,
    // Rental defaults
    rentalHours: 1,
    rentalKm: 10,

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

    traveller: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      notes: '',
    }
  });

  booking$ = this._booking.asObservable();

  private _step = new BehaviorSubject<number>(0);
  step$ = this._step.asObservable();

  setStep(i: number) {
    this._step.next(i);
  }

  nextStep() {
    this._step.next(Math.min(3, this._step.value + 1));
  }

  prevStep() {
    this._step.next(Math.max(0, this._step.value - 1));
  }

  update(patch: Partial<Booking>) {
    this._booking.next({ ...this._booking.value, ...patch });
  }

  patchDeep(patch: Partial<Booking>) {
    const current = this._booking.value;
    this._booking.next({ ...current, ...patch });
  }

  setBooking(b: Booking) {
    this._booking.next(b);
  }

  generateRef() {
    const ref = Math.floor(100000000 + Math.random() * 900000000).toString();
    this._booking.next({ ...this._booking.value, bookingRef: ref });
    return ref;
  }

  getCurrent() {
    return this._booking.value;
  }

  reset() {
    this._booking.next({
      pickup: null,
      dropoff: null,
      date: '',
      time: '',
      tripType: 'one-way',
      tripTypeValue: 'pickup-drop',

      // Reset rental to defaults
      rentalHours: 1,
      rentalKm: 10,

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

      traveller: {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        notes: '',
      },

      bookingRef: ''
    });

    this._step.next(0);
  }

  setCurrent(data: Partial<Booking>) {
    this._booking.next({
      ...this._booking.value,
      ...data
    });
  }

  // Helper method to get trip type display name
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

  // Helper to check if rental booking
  isRentalBooking(): boolean {
    return this._booking.value.tripTypeValue === 'rental';
  }

  // Helper to check if outstation booking
  isOutstationBooking(): boolean {
    return this._booking.value.tripTypeValue === 'outstation';
  }

  // Helper to check if pickup-drop booking
  isPickupDropBooking(): boolean {
    return this._booking.value.tripTypeValue === 'pickup-drop';
  }
}
