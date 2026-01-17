import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MUMBAI_LOCATIONS } from '../../../data/mumbai-locations';
import { GeoLocation } from '../../../models/geo-location';
import { LocationService } from '../../../services/location/location.service';
import { VehicleCategory } from '../../../pricing/pricing.types';
import { PricingService } from '../../../pricing/pricing.service';
type TripType = 'pickup-drop' | 'outstation' | 'rental';

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
  selectedPickup?: GeoLocation;
selectedDrop?: GeoLocation;
  // note: matches template `#dateInputElem`
  @ViewChild('dateInputElem') dateInputRef!: ElementRef<HTMLInputElement>;

pickupSuggestions: { place_id: string; name: string; description?: string }[] = [];
dropSuggestions: { place_id: string; name: string; description?: string }[] = [];

pickupResults: GeoLocation[] = [];
dropResults: GeoLocation[] = [];
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
  returnDate: string = '';
returnDisplayTime: string = '';
returnTime24: string = '';
 distanceKm = 0;
  durationMinutes = 0;
   pickupTime24 = '';
showReturnTimes = false;
returnDateInvalid = false;
returnTimeInvalid = false;
  pickupAutocomplete!: google.maps.places.AutocompleteService;
  dropAutocomplete!: google.maps.places.AutocompleteService;
  placesService!: google.maps.places.PlacesService;
  selectedTripType: TripType = 'pickup-drop';
  constructor(private bookingService: BookingService,
              private locationService: LocationService,
              private pricingService: PricingService,
  ) {
    const b = this.bookingService.getCurrent();
    console.log('Booking data from service in StepLocation:', b);
    if(b.tripTypeValue) {
      this.selectedTripType = b.tripTypeValue
    }
    if(b.pickup){
                const pickuploc: GeoLocation = {
        place_id: b.pickup?.place_id || '',
        name:  b.pickup?.name || '',
        latitude: b.pickup?.latitude as number,
        longitude: b.pickup?.longitude as number,
        service_address: {
          city: b.pickup?.service_address?.city || '',
          state: b.pickup?.service_address?.state || '',
          postcode: b.pickup?.service_address?.postcode || '',
          suburb: b.pickup?.service_address?.suburb || null,
          locality: b.pickup?.service_address?.locality || null,
          addressLine1: b.pickup?.service_address?.addressLine1 || '',
          addressLine2: b.pickup?.service_address?.addressLine2 || null,
          country: b.pickup?.service_address?.country || ''
        }
      };
      this.selectedPickup = pickuploc;
    }

    if (b.dropoff){
            const droploc: GeoLocation = {
        place_id: b.dropoff?.place_id || '',
        name:  b.dropoff?.name || '',
        latitude: b.dropoff?.latitude as number,
        longitude: b.dropoff?.longitude as number,
        service_address: {
          city: b.dropoff?.service_address?.city || '',
          state: b.dropoff?.service_address?.state || '',
          postcode: b.dropoff?.service_address?.postcode || '',
          suburb: b.dropoff?.service_address?.suburb || null,
          locality: b.dropoff?.service_address?.locality || null,
          addressLine1: b.dropoff?.service_address?.addressLine1 || '',
          addressLine2: b.dropoff?.service_address?.addressLine2 || null,
          country: b.dropoff?.service_address?.country || ''
        }
      };
      this.selectedDrop = droploc;
    }

    this.pickup = b.pickup?.name || '';
    this.dropoff = b.dropoff?.name || '';
    this.date = b.date || '';
    this.time = b.time || '';
    this.returnDate = b.returnDate || '';
    this.returnDisplayTime = b.returnTime || '';
    this.returnTime24 = b.returnTime || '';
    this.tripType = b.tripType || 'one-way';
    this.locality = b.locality || '';
    this.distanceKm = b.distanceKm || 0;
    this.durationMinutes = b.durationMinutes || 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('Booking data loaded in StepLocation:', b);
  }

  ngOnInit() {
    this.generateTimeSlots();
    this.selectDefaultTime();
    this.setDefaultDate();
    if(this.returnDisplayTime){
      this.formatAmPm(this.returnDisplayTime);
      this.returnDisplayTime = this.formatAmPm(this.returnDisplayTime);
    }
    this.bookingData = JSON.parse(sessionStorage.getItem('selectedBooking') || '{}');
      this.pickupAutocomplete = new google.maps.places.AutocompleteService();
      this.dropAutocomplete = new google.maps.places.AutocompleteService();
      const dummyDiv = document.createElement('div');
      this.placesService = new google.maps.places.PlacesService(dummyDiv);

  }

  //---------------------------------------
  // FORM VALIDATION
  //---------------------------------------
  isFormValid(): boolean {
    console.log('Validating form with values:', {
      selectedPickup: this.selectedPickup,
      selectedDrop: this.selectedDrop,
      date: this.date,
      displayTime: this.displayTime,
      selectedTripType: this.selectedTripType,
      returnDate: this.returnDate,
      returnTime24: this.returnTime24
    });
  if (!this.selectedPickup || !this.selectedDrop) return false;
  if (!this.date || !this.displayTime) return false;

   if (this.selectedTripType !== 'pickup-drop') {
      return !!this.returnDate && !!this.returnTime24;
    }

  return true;
}

    selectTripType(type: TripType) {
    this.selectedTripType = type;
  }
toggleReturnTimeList() {
  this.showReturnTimes = !this.showReturnTimes;
}
to24(t: string): string {
  const [time, ampm] = t.split(' ');
  let [h, m] = time.split(':').map(Number);

  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;

  return `${h.toString().padStart(2, '0')}:${m}`;
}
selectReturnTime(t: string) {
  this.returnDisplayTime = t;

  const [time, ampm] = t.split(' ');
  let [hr, min] = time.split(':').map(Number);

  if (ampm === 'PM' && hr < 12) hr += 12;
  if (ampm === 'AM' && hr === 12) hr = 0;

  this.returnTime24 = `${hr.toString().padStart(2, '0')}:${min}`;
  this.showReturnTimes = false;
}
  //---------------------------------------
  // FORM SUBMIT
  //---------------------------------------
  saveAndNext() {
  if (!this.isFormValid()) return;

  this.bookingService.patchDeep({
    tripTypeValue: this.selectedTripType,

    pickup: this.selectedPickup!,
    dropoff: this.selectedDrop!,

    date: this.date,
    time: this.selected24hrTime,
    returnDate:
        this.selectedTripType !== 'pickup-drop' ? this.returnDate : undefined,

      returnTime:
        this.selectedTripType !== 'pickup-drop' ? this.returnTime24 : undefined,

    tripType: this.tripType,
    locality: this.locality,
    distanceKm: this.distanceKm,
    durationMinutes: this.durationMinutes
  });

  this.bookingService.nextStep();
}


onFieldInput(
  field:
    | 'pickup'
    | 'drop'
    | 'date'
    | 'time'
    | 'returnDate'
    | 'returnTime'
    | 'locality',
  value: string | null
): void {

  switch (field) {
    case 'pickup':
      if (value && value.trim()) this.pickupInvalid = false;
      this.selectedPickup = undefined;
      break;

    case 'drop':
      if (value && value.trim()) this.dropInvalid = false;
      this.selectedDrop = undefined;
      break;

    case 'date':
      if (value) this.dateInvalid = false;
      break;

    case 'time':
      if (value) this.timeInvalid = false;
      break;

    case 'returnDate':
      if (value) this.returnDateInvalid = false;
      break;

    case 'returnTime':
      if (value) this.returnTimeInvalid = false;
      break;

    case 'locality':
      if (value && value.trim()) this.localityInvalid = false;
      break;
  }

  // reset navigation pointer once valid
  if (this.isFormValid()) {
    this.lastInvalidIndex = -1;
  }
}



  // called for non-text fields (time click) to clear flag if time already chosen
  onFieldTouched(field: 'time') {
    if (field === 'time' && this.displayTime) this.timeInvalid = false;
  }

  // main handler for Next button clicks (robust cycle-through-empty-fields)
  onNextClick(ev: Event): void {
    this.validateDrop();
    this.validatePickup();
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
      this.generateTimeSlots();
    }
  }

  adjustTimeForToday() {
    const now = new Date();
    const currTime = now.toTimeString().slice(0, 5);

    let min = currTime < "07:00" ? "07:00" : currTime;
    this.generateTimeSlots();
  }
  selectPickupTime(t: string) {
    this.displayTime = t;
    this.pickupTime24 = this.to24(t);
    this.showTimes = false;
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
  calculateDistance() {
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [{ lat: this.selectedPickup!.latitude, lng: this.selectedPickup!.longitude }],
        destinations: [{ lat: this.selectedDrop!.latitude, lng: this.selectedDrop!.longitude }],
        travelMode: google.maps.TravelMode.DRIVING
      },
      (res, status) => {
       if (
          status !== google.maps.DistanceMatrixStatus.OK ||
          !res?.rows?.[0]?.elements?.[0] ||
          res.rows[0].elements[0].status !== 'OK'
        ) {
          console.error('Distance Matrix failed');
          return;
        }

        const el = res.rows[0].elements[0];
        this.distanceKm = +(el.distance.value / 1000).toFixed(2);
        this.durationMinutes = Math.ceil(el.duration.value / 60);

        this.bookingService.setCurrent({
          distanceKm: this.distanceKm,
          durationMinutes: this.durationMinutes
        });
      }
    );
  }

  /* ---------------- HELPERS ---------------- */


  private toAmPm(t: string): string {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
  }

 filterPickup(value: string) {
  if (!value || value.length < 4) {
    this.pickupSuggestions = [];
    this.selectedPickup = undefined;
    return;
  }

this.pickupAutocomplete.getPlacePredictions(
  {
    input: value,
    componentRestrictions: { country: 'in' }, // restrict to India
    types: ['geocode'] // all address locations
  },
  (
    predictions: google.maps.places.AutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (
      status !== google.maps.places.PlacesServiceStatus.OK ||
      !predictions
    ) {
      this.pickupSuggestions = [];
      return;
    }

    this.pickupSuggestions = predictions.map(p => ({
      place_id: p.place_id,
      name: p.description
    }));
  }
);

}




validatePickup() {
  if (!this.selectedPickup) {
    this.pickup = '';
    return;
  }

  const state = this.selectedPickup.service_address?.state?.toLowerCase();

  if (state !== 'maharashtra') {
    this.pickup = '';
    this.selectedPickup = undefined;
  }

  this.pickupSuggestions = [];
}

validateDrop() {
  if (!this.selectedDrop) {
    this.dropoff = '';
    return;
  }

  const state = this.selectedDrop.service_address?.state?.toLowerCase();

  if (state !== 'maharashtra') {
    this.dropoff = '';
    this.selectedDrop = undefined;
  }

  this.dropSuggestions = [];
}



selectPickupLocation(pred: any) {
  this.locationService
    .getPlaceDetails(pred.place_id)
    .subscribe(res => {
      if (!res) return;

      const loc: GeoLocation = {
        place_id: res.placeId,
        name:  pred.name,
        latitude: res.latitude,
        longitude: res.longitude,
        service_address: {
          city: res.serviceAddress?.city || null,
          state: res.serviceAddress?.state || 'Maharashtra',
          postcode: res.serviceAddress?.postcode || null,
          suburb: res.serviceAddress?.suburb || null,
          locality: res.serviceAddress?.locality || null,
          addressLine1: res.serviceAddress?.addressLine1 || null,
          addressLine2: res.serviceAddress?.addressLine2 || null,
          country: res.serviceAddress?.country || null
        }
      };

      this.selectedPickup = loc;
      this.pickup = loc.name;
      this.pickupSuggestions = [];

      this.bookingService.setCurrent({ pickup: loc });
      if (this.selectedPickup) {
        this.calculateDistance();
      }
    });
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

generateTimeSlots() {
    const slots: string[] = [];
    for (let h = 7; h <= 21; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hr12 = h % 12 || 12;
        const ampm = h >= 12 ? 'PM' : 'AM';
        slots.push(`${hr12}:${m.toString().padStart(2, '0')} ${ampm}`);
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
formatAmPm(time?: string): string {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${period}`;
}
filterDrop(value: string) {
  if (!value || value.length < 4) {
    this.dropSuggestions = [];
    this.selectedDrop = undefined;
    return;
  }

  this.dropAutocomplete.getPlacePredictions(
  {
    input: value,
    componentRestrictions: { country: 'in' },
    types: ['geocode']
  },
  (
    predictions: google.maps.places.AutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (
      status !== google.maps.places.PlacesServiceStatus.OK ||
      !predictions
    ) {
      this.dropSuggestions = [];
      return;
    }

    this.dropSuggestions = predictions.map(p => ({
      place_id: p.place_id,
      name: p.description,
      description: p.description
    }));
  }
);

}
selectDropLocation(pred: any) {
  this.locationService
    .getPlaceDetails(pred.place_id)
    .subscribe(res => {
      if (!res) return;

      const loc: GeoLocation = {
        place_id: res.placeId,
        name: pred.name,
        latitude: res.latitude,
        longitude: res.longitude,
        service_address: {
          city: res.serviceAddress?.city || null,
          state: res.serviceAddress?.state || 'Maharashtra',
          postcode: res.serviceAddress?.postcode || null,
          suburb: res.serviceAddress?.suburb || null,
          locality: res.serviceAddress?.locality || null,
          addressLine1: res.serviceAddress?.addressLine1 || null,
          addressLine2: res.serviceAddress?.addressLine2 || null,
          country: res.serviceAddress?.country || null
        }
      };

      this.selectedDrop = loc;
      this.dropoff = loc.name;
      this.dropSuggestions = [];

      this.bookingService.setCurrent({ dropoff: loc });
      if (this.selectedDrop) {
        this.calculateDistance();
      }
    });
}
  useCurrentLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (
            status !== google.maps.GeocoderStatus.OK ||
            !results ||
            !results.length
          ) {
            alert("Unable to fetch address for current location");
            return;
          }

          const place = results[0];

          const loc: GeoLocation = {
            place_id: place.place_id!,
            name: place.formatted_address!,
            latitude: lat,
            longitude: lng,
            service_address: {
              city:
                place.address_components.find(c => c.types.includes('locality'))
                  ?.long_name || null,
              state:
                place.address_components.find(c =>
                  c.types.includes('administrative_area_level_1')
                )?.long_name || 'Maharashtra',
              postcode:
                place.address_components.find(c =>
                  c.types.includes('postal_code')
                )?.long_name || null,
              suburb:
                place.address_components.find(c =>
                  c.types.includes('sublocality')
                )?.long_name || null,
              locality:
                place.address_components.find(c =>
                  c.types.includes('neighborhood')
                )?.long_name || null,
              addressLine1: place.formatted_address || null,
              addressLine2: null,
              country:
                place.address_components.find(c =>
                  c.types.includes('country')
                )?.long_name || null,
            },
          };

          this.selectedPickup = loc;
          this.pickup = loc.name;
          this.pickupSuggestions = [];

          this.bookingService.setCurrent({ pickup: loc });

          console.log('Selected Pickup (Current Location):', loc);
        }
      );
    },
    () => alert("Unable to retrieve your location. Please allow GPS permission.")
  );
}
  calculateDistanceAndDuration(pickup: GeoLocation, drop: GeoLocation) {
  const service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [{ lat: pickup.latitude, lng: pickup.longitude }],
      destinations: [{ lat: drop.latitude, lng: drop.longitude }],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    },
    (response, status) => {
      if (
        status !== google.maps.DistanceMatrixStatus.OK ||
        !response?.rows?.[0]?.elements?.[0] ||
        response.rows[0].elements[0].status !== 'OK'
      ) {
        console.error('Distance Matrix failed');
        return;
      }

      const element = response.rows[0].elements[0];

      const distanceKm = +(element.distance.value / 1000).toFixed(2); // meters → km
      const durationMinutes = Math.ceil(element.duration.value / 60); // seconds → minutes

      // ✅ Store in BookingService
      this.bookingService.setCurrent({
        distanceKm,
        durationMinutes
      });

      console.log('Distance KM:', distanceKm);
      console.log('Duration Minutes:', durationMinutes);
    }
  );
}
}
