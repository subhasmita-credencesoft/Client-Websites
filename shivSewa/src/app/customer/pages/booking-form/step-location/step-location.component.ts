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

  // note: matches template `#dateInputElem`
  @ViewChild('dateInputElem') dateInputRef!: ElementRef<HTMLInputElement>;

  pickupSuggestions: string[] = [];
  dropSuggestions: string[] = [];

  // preserve existing group refs used by click-outside handler
  @ViewChild('pickupGroup') pickupGroup!: ElementRef;
  @ViewChild('dropGroup') dropGroup!: ElementRef;

  // NEW: refs to actual input elements used for focusing
  @ViewChild('pickupInput') pickupInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dropInput') dropInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('timeInputElem') timeInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('localityInput') localityInputRef!: ElementRef<HTMLInputElement>;

  // NEW: invalid flags for one-by-one highlighting
  pickupInvalid = false;
  dropInvalid = false;
  dateInvalid = false;
  timeInvalid = false;
  localityInvalid = false;

  // NEW: ordered required fields - controls the one-by-one sequence
  private requiredFieldOrder: Array<'pickup'|'drop'|'date'|'time'|'locality'> = ['pickup','drop','date','time','locality'];

  // NEW: index of last-focused invalid in requiredFieldOrder; -1 means none yet
  private lastInvalidIndex = -1;

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // --- NEW METHODS & HELPERS (for "click disabled -> focus next invalid")
  // called when typing/selecting to clear that field's invalid flag
  onFieldInput(field: 'pickup'|'drop'|'date'|'time'|'locality', value: string | null): void {
    switch (field) {
      case 'pickup': if (value && value.trim()) this.pickupInvalid = false; break;
      case 'drop': if (value && value.trim()) this.dropInvalid = false; break;
      case 'date': if (value) this.dateInvalid = false; break;
      case 'time': if (value) this.timeInvalid = false; break;
      case 'locality': if (value && value.trim()) this.localityInvalid = false; break;
    }
    // reset pointer when fully valid so next invalid cycle starts from beginning
    if (this.isFormValid()) this.lastInvalidIndex = -1;
  }

  // called for non-text fields (time click) to clear flag if time already chosen
  onFieldTouched(field: 'time') {
    if (field === 'time' && this.displayTime) this.timeInvalid = false;
  }

  // main handler for Next button clicks (robust cycle-through-empty-fields)
  onNextClick(ev: Event): void {
    if (this.isFormValid()) {
      this.saveAndNext();
      return;
    }

    ev.preventDefault();

    const order = this.requiredFieldOrder;
    const total = order.length;

    // helper to test if a field is empty
    const isEmptyField = (f: typeof order[number]) => {
      switch (f) {
        case 'pickup': return !this.pickup || !this.pickup.trim();
        case 'drop': return !this.dropoff || !this.dropoff.trim();
        case 'date': return !this.date;
        case 'time': return !this.displayTime;
        case 'locality': return !this.locality || !this.locality.trim();
      }
    };

    // find next empty field after lastInvalidIndex, wrapping around
    let foundIndex = -1;
    for (let offset = 1; offset <= total; offset++) {
      const idx = (this.lastInvalidIndex + offset) % total;
      const field = order[idx];
      if (isEmptyField(field)) { foundIndex = idx; break; }
    }

    // if nothing empty (race), reset pointer and return
    if (foundIndex === -1) {
      this.lastInvalidIndex = -1;
      return;
    }

    // set last focused index
    this.lastInvalidIndex = foundIndex;
    const nextField = order[foundIndex];

    // if locality is next but its input isn't rendered, make it render first
    if (nextField === 'locality') {
      this.editingLocality = true;
    }

    this.setInvalidFlag(nextField, true);
    this.focusField(nextField);
  }

  // set a single invalid flag; clear others
  private setInvalidFlag(field: 'pickup'|'drop'|'date'|'time'|'locality', flag: boolean): void {
    this.pickupInvalid = field === 'pickup' ? flag : false;
    this.dropInvalid   = field === 'drop' ? flag : false;
    this.dateInvalid   = field === 'date' ? flag : false;
    this.timeInvalid   = field === 'time' ? flag : false;
    this.localityInvalid = field === 'locality' ? flag : false;
  }

  // focus the requested field (safe guards + open time list)
  private focusField(field: 'pickup'|'drop'|'date'|'time'|'locality'): void {
    setTimeout(() => {
      try {
        switch (field) {
          case 'pickup':
            this.pickupInputRef?.nativeElement?.focus();
            this.pickupInputRef?.nativeElement?.scrollIntoView({ block: 'center', behavior: 'smooth' });
            break;
          case 'drop':
            // if drop input is disabled because pickup not chosen, focus pickup instead
            if (!this.pickup) {
              this.pickupInputRef?.nativeElement?.focus();
            } else {
              this.dropInputRef?.nativeElement?.focus();
              this.dropInputRef?.nativeElement?.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
            break;
          case 'date':
            this.dateInputRef?.nativeElement?.focus();
            break;
          case 'time':
            this.timeInputRef?.nativeElement?.focus();
            this.showTimes = true;
            break;
          case 'locality':
            // editingLocality may have been set just before calling focusField.
            // Wait a tick to allow the input to render, then focus it.
            setTimeout(() => {
              try {
                this.localityInputRef?.nativeElement?.focus();
                this.localityInputRef?.nativeElement?.scrollIntoView({ block: 'center', behavior: 'smooth' });
              } catch (e) {
                // noop
              }
            }, 60);
            break;
        }
      } catch (e) {
        console.warn('Focus failed', e);
      }
    }, 50);
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
