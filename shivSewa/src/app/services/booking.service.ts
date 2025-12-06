import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _booking = new BehaviorSubject<Booking>({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    tripType: 'one-way',

    passengers: {
      type: 'solo',
      adults: 1,
      children: 0,
      luggage: 0
    },

    vehicle: {
      name: '',
      seats: 0,
      bags: 0,
      price: 0,
      image: ''
    },

    traveller: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: ''
    }
  });

  booking$ = this._booking.asObservable();

  private _step = new BehaviorSubject<number>(0);
  step$ = this._step.asObservable();

  setStep(i: number) { this._step.next(i); }
  nextStep() { this._step.next(Math.min(3, this._step.value + 1)); }
  prevStep() { this._step.next(Math.max(0, this._step.value - 1)); }

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
}
