import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MUMBAI_LOCATIONS } from '../../../data/mumbai-locations';

@Component({
  selector: 'app-step-location',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-location.component.html',
  styleUrl: './step-location.component.scss'
})
export class StepLocationComponent {

  pickup = '';
  dropoff = '';
  time: string = '';
  displayTime: string = "";
  selected24hrTime: string = "";
  date: string = '';
  minDate: string = '';
  showTimes = false;
  timeOptions: string[] = [];
  editingLocality = false;
  locality = '';
  tripType: 'one-way' | 'return' = 'one-way';
    @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  pickupSuggestions: string[] = [];
  dropSuggestions: string[] = [];

  @ViewChild('pickupGroup') pickupGroup!: ElementRef;
  @ViewChild('dropGroup') dropGroup!: ElementRef;

  mumbaiLocations: string[] = MUMBAI_LOCATIONS;
  bookingData: any;

  constructor(private bookingService: BookingService) {
    const b = this.bookingService.getCurrent();
    this.pickup = b.pickup || '';
    this.dropoff = b.dropoff || '';
    this.date = b.date || '';
    this.time = b.time || '';
    this.tripType = b.tripType || 'one-way';
    this.locality = b.locality || '';
  }

  ngOnInit() {
    this.generateTimeSlots();
    this.selectDefaultTime();
    this.setDefaultDate();

    this.bookingData = JSON.parse(sessionStorage.getItem('selectedBooking') || '{}');

    if (this.bookingData) {
      this.pickup = this.bookingData.pickup || this.pickup;
      this.dropoff = this.bookingData.drop || this.dropoff;
    }
  }

  //---------------------------------------
  // FORM VALIDATION
  //---------------------------------------
  isFormValid(): boolean {
    return (
      this.pickup.trim() !== '' &&
      this.dropoff.trim() !== '' &&
      this.date.trim() !== '' &&
      this.displayTime.trim() !== '' &&
      this.locality.trim() !== ''
    );
  }

  //---------------------------------------
  // FORM SUBMIT
  //---------------------------------------
  saveAndNext() {
    if (!this.isFormValid()) return;

    this.bookingService.patchDeep({
      pickup: this.pickup,
      dropoff: this.dropoff,
      date: this.date,
      time: this.displayTime,
      tripType: this.tripType,
      locality: this.locality
    });

    this.bookingService.nextStep();
  }

  //---------------------------------------
  setDefaultDate() {
    const today = new Date();
    this.minDate = today.toISOString().split("T")[0];
    this.date = this.date || this.minDate;

    this.onDateChange();
  }

  onDateChange() {
    const today = new Date().toISOString().split("T")[0];
    if (this.date === today) {
      this.adjustTimeForToday();
    } else {
      this.generateTimeSlots("07:00");
    }
  }

  adjustTimeForToday() {
    const now = new Date();
    const currTime = now.toTimeString().slice(0, 5);

    let min = currTime < "07:00" ? "07:00" : currTime;
    this.generateTimeSlots(min);
  }

  //---------------------------------------
  // AUTOCOMPLETE CLOSE WHEN CLICK OUTSIDE
  //---------------------------------------
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInsidePickup = this.pickupGroup?.nativeElement.contains(event.target);
    const clickedInsideDrop = this.dropGroup?.nativeElement.contains(event.target);

    if (!clickedInsidePickup) this.pickupSuggestions = [];
    if (!clickedInsideDrop) this.dropSuggestions = [];
  }

  //---------------------------------------
  // PICKUP
  //---------------------------------------
  filterPickup(value: string) {
    if (!value) {
      this.pickupSuggestions = [];
      return;
    }

    const lower = value.toLowerCase();

    const startsWith = this.mumbaiLocations.filter(loc =>
      loc.toLowerCase().startsWith(lower)
    );

    const contains = this.mumbaiLocations.filter(loc =>
      !loc.toLowerCase().startsWith(lower) && loc.toLowerCase().includes(lower)
    );

    this.pickupSuggestions = [...startsWith, ...contains];
  }

  selectPickupLocation(location: string) {
    this.pickup = location;
    this.pickupSuggestions = [];
  }

  //---------------------------------------
  // LOCALITY
  //---------------------------------------
  enableLocalityEdit() {
    this.editingLocality = true;
  }

  saveLocality() {
    this.editingLocality = false;
    this.bookingService.update({ locality: this.locality });
  }

  //---------------------------------------
  // TIME PICKER
  //---------------------------------------
  toggleTimeList() {
    this.showTimes = !this.showTimes;
  }

  generateTimeSlots(min24: string = "07:00") {
    const slots: string[] = [];
    const [minH, minM] = min24.split(":").map(Number);

    for (let h = 7; h <= 21; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (h < minH || (h === minH && m < minM)) continue;

        let hr12 = h > 12 ? h - 12 : h;
        let ampm = h >= 12 ? 'PM' : 'AM';

        slots.push(`${hr12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`);
      }
    }

    this.timeOptions = slots;
  }

  selectTime(t: string) {
    this.displayTime = t;

    const [time, ampm] = t.split(" ");
    let [hr, min] = time.split(":").map(Number);

    if (ampm === "PM" && hr < 12) hr += 12;
    if (ampm === "AM" && hr === 12) hr = 0;

    this.selected24hrTime = `${hr.toString().padStart(2, '0')}:${min}`;
    this.showTimes = false;
  }

  selectDefaultTime() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();

    const hr12 = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";

    this.displayTime = `${hr12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
    this.selected24hrTime = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  //---------------------------------------
  // DROP
  //---------------------------------------
  filterDrop(value: string) {
    if (!value) {
      this.dropSuggestions = [];
      return;
    }

    const lower = value.toLowerCase();

    const startsWith = this.mumbaiLocations.filter(loc =>
      loc.toLowerCase().startsWith(lower)
    );

    const contains = this.mumbaiLocations.filter(loc =>
      !loc.toLowerCase().startsWith(lower) && loc.toLowerCase().includes(lower)
    );

    this.dropSuggestions = [...startsWith, ...contains];
  }

  selectDropLocation(location: string) {
    this.dropoff = location;
    this.dropSuggestions = [];
  }
}
