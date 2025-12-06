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
  tripType: 'one-way'|'return' = 'one-way';
    pickupSuggestions: string[] = [];
  dropSuggestions: string[] = [];
  @ViewChild('pickupGroup') pickupGroup!: ElementRef;
  @ViewChild('dropGroup') dropGroup!: ElementRef;
    mumbaiLocations: string[] = MUMBAI_LOCATIONS;
  minTime: any;
  maxTime: any;
  bookingData: any;
  constructor(private bookingService: BookingService) {
    const b = this.bookingService.getCurrent();
    this.pickup = b.pickup || '';
    this.dropoff = b.dropoff || '';
    this.date = b.date || '';
    this.time = b.time || '';
    this.tripType = b.tripType || 'one-way';
  }
  ngOnInit(){
      this.generateTimeSlots();
  this.selectDefaultTime();
    this.setDefaultDate();
    this.bookingData = JSON.parse(sessionStorage.getItem('selectedBooking') || '{}');
    if(this.bookingData){
      this.pickup = this.bookingData.pickup;
      this.dropoff = this.bookingData.drop;
    }
  }

  setDefaultDate() {
  const today = new Date();
  this.minDate = today.toISOString().split("T")[0];   // Block past dates
  this.date = this.minDate;                           // Default = today

  // 🔗 Also update time restrictions
  this.onDateChange();
}


onDateChange() {
  const today = new Date().toISOString().split("T")[0];

  if (this.date === today) {
    this.adjustTimeForToday();
  } else {
    this.generateTimeSlots("07:00"); // full set from 7 AM
  }
}
adjustTimeForToday() {
  const now = new Date();
  const currTime = now.toTimeString().slice(0, 5); // "18:56"

  let min = currTime < "07:00" ? "07:00" : currTime;

  // Pass this min time to generate time slots
  this.generateTimeSlots(min);
}
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInsidePickup = this.pickupGroup?.nativeElement.contains(event.target);
    const clickedInsideDrop = this.dropGroup?.nativeElement.contains(event.target);

    if (!clickedInsidePickup) this.pickupSuggestions = [];
    if (!clickedInsideDrop) this.dropSuggestions = [];
  }
  saveAndNext() {
    this.bookingService.patchDeep({
      pickup: this.pickup,
      dropoff: this.dropoff,
      date: this.date,
      time: this.time,
      tripType: this.tripType
    });
    this.bookingService.nextStep();
  }

    //---------------------------------------
  filterPickup(value: string) {
  if (!value) {
    this.pickupSuggestions = [];
    return;
  }

  const lower = value.toLowerCase();

  const startsWith = this.mumbaiLocations
    .filter(loc => loc.toLowerCase().startsWith(lower));

  const contains = this.mumbaiLocations
    .filter(loc => !loc.toLowerCase().startsWith(lower) && loc.toLowerCase().includes(lower));

  // Combine → startsWith on top
  this.pickupSuggestions = [...startsWith, ...contains];
}


  selectPickupLocation(location: string) {
    this.pickup = location;
    this.pickupSuggestions = [];
  }
toggleTimeList() {
  this.showTimes = !this.showTimes;
}

generateTimeSlots(min24: string = "07:00") {
  const slots: string[] = [];
  const [minH, minM] = min24.split(":").map(Number);

  for (let h = 7; h <= 21; h++) {
    for (let m = 0; m < 60; m += 30) {

      // Block times earlier than allowed (today restriction)
      if (h < minH || (h === minH && m < minM)) {
        continue;
      }

      let hour = h > 12 ? h - 12 : h;
      let ampm = h >= 12 ? 'PM' : 'AM';

      let hr = hour.toString().padStart(2, '0');
      let mm = m.toString().padStart(2, '0');

      slots.push(`${hr}:${mm} ${ampm}`);
    }
  }

  this.timeOptions = slots;
}


selectTime(t: string) {
  this.displayTime = t;

  // Convert 12h → 24h for backend use
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

  // Convert to 12-hour format
  const hr12 = h % 12 || 12;
  const ampm = h >= 12 ? "PM" : "AM";

  const formatted = `${hr12.toString().padStart(2, '0')}:${m
    .toString()
    .padStart(2, '0')} ${ampm}`;

  this.displayTime = formatted;

  // Save in 24-hr format
  this.selected24hrTime = `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}`;

  // Regenerate slots based on NOW
  this.adjustTimeForToday();
}
  //---------------------------------------
  // DROPOFF INPUT AUTOCOMPLETE
  //---------------------------------------
  filterDrop(value: string) {
  if (!value) {
    this.dropSuggestions = [];
    return;
  }

  const lower = value.toLowerCase();

  const startsWith = this.mumbaiLocations
    .filter(loc => loc.toLowerCase().startsWith(lower));

  const contains = this.mumbaiLocations
    .filter(loc => !loc.toLowerCase().startsWith(lower) && loc.toLowerCase().includes(lower));

  this.dropSuggestions = [...startsWith, ...contains];
}


  selectDropLocation(location: string) {
    this.dropoff = location;
    this.dropSuggestions = [];
  }
}
