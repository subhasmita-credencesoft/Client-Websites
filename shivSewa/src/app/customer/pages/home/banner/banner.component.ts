import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MUMBAI_LOCATIONS } from '../../../data/mumbai-locations';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { GeoLocation } from '../../../models/geo-location';
import { BookingService } from '../../../services/booking.service';
import { LocationService } from '../../../services/location/location.service';

type TripType = 'pickup-drop' | 'outstation' | 'rental';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  // Trip Type Selection
  selectedTripType: TripType = 'pickup-drop';

  // Common fields
  pickupLocation: string = '';
  dropLocation: string = '';

  // Rental specific - Hours with automatic KM calculation
  rentalHours: number = 1; // Default 1 hour
  rentalDate: string = '';
  rentalTime: string = '';

  // Automatic KM calculation: 10 KM per hour
  get rentalKm(): number {
    return this.rentalHours * 10;
  }

  // Banner images
  bannerImages = [
    'assets/banner-img.png',
    'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/11/13162031/Satara.jpg',
    'https://img.nayatrip.com/images/state/big/MAHARASHTRA-GOA.jpg',
    'https://www.trawell.in/admin/images/upload/955980848Mumbai_Main.jpg'
  ];

  // Autocomplete
  pickupSuggestions: { place_id: string; name: string; description?: string }[] = [];
  dropSuggestions: { place_id: string; name: string; description?: string }[] = [];

  @ViewChild('mobileSlider') mobileSlider!: ElementRef<HTMLDivElement>;
  private mobileSlideIndex = 0;
  private mobileInterval: any;

  mumbaiLocations: string[] = MUMBAI_LOCATIONS;
  isMobileView = false;

  @ViewChild('pickupGroup') pickupGroup!: ElementRef;
  @ViewChild('dropGroup') dropGroup!: ElementRef;

  selectedPickup?: GeoLocation;
  selectedDrop?: GeoLocation;

  pickupAutocomplete!: google.maps.places.AutocompleteService;
  dropAutocomplete!: google.maps.places.AutocompleteService;
  pickupError: string = '';
dropError: string = '';
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.pickupAutocomplete = new google.maps.places.AutocompleteService();
    this.dropAutocomplete = new google.maps.places.AutocompleteService();
    this.checkViewport();
    window.addEventListener('resize', () => this.checkViewport());

    // Set minimum datetime to now
    this.setMinDateTime();
  }

  ngAfterViewInit() {
    if (this.isMobileView) {
      this.startMobileAutoSlide();
    }
  }

  ngOnDestroy() {
    if (this.mobileInterval) {
      clearInterval(this.mobileInterval);
    }
  }

  // Trip Type Selection
  selectTripType(type: TripType) {
    this.selectedTripType = type;
    this.resetForm();
  }

  resetForm() {
    // Keep pickup if already selected, only reset drop
    if (this.selectedTripType === 'rental') {
      // For rental, we only need pickup
      this.dropLocation = '';
      this.selectedDrop = undefined;
    } else {
      // For pickup-drop and outstation, reset both
      this.pickupLocation = '';
      this.dropLocation = '';
      this.selectedPickup = undefined;
      this.selectedDrop = undefined;
    }

    this.pickupSuggestions = [];
    this.dropSuggestions = [];
  }

  setMinDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const minDate = `${year}-${month}-${day}`;
    const minTime = `${hours}:${minutes}`;

    if (!this.rentalDate) this.rentalDate = minDate;
    if (!this.rentalTime) this.rentalTime = minTime;
  }

  // Rental Hours Controls (KM auto-calculates)
  incrementHours() {
    this.rentalHours++;
  }

  decrementHours() {
    if (this.rentalHours > 1) {
      this.rentalHours--;
    }
  }

  // Mobile slider
  startMobileAutoSlide() {
    this.mobileInterval = setInterval(() => {
      const slider = this.mobileSlider?.nativeElement;
      if (!slider) return;

      this.mobileSlideIndex = (this.mobileSlideIndex + 1) % this.bannerImages.length;
      slider.scrollTo({
        left: slider.clientWidth * this.mobileSlideIndex,
        behavior: 'smooth',
      });
    }, 5000);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInsidePickup = this.pickupGroup?.nativeElement.contains(event.target);
    const clickedInsideDrop = this.dropGroup?.nativeElement.contains(event.target);

    if (!clickedInsidePickup) this.pickupSuggestions = [];
    if (!clickedInsideDrop) this.dropSuggestions = [];
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
  }

  // Autocomplete methods
  filterPickup(value: string) {
    if (!value || value.length < 4) {
      this.pickupSuggestions = [];
      this.selectedPickup = undefined;
      return;
    }

    this.pickupAutocomplete.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: 'in' },
        types: ['geocode']
      },
      (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
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
      (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
          this.dropSuggestions = [];
          return;
        }
        this.dropSuggestions = predictions.map(p => ({
          place_id: p.place_id,
          name: p.description
        }));
      }
    );
  }

  selectPickupLocation(pred: any) {
    this.locationService.getPlaceDetails(pred.place_id).subscribe(res => {
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

      this.selectedPickup = loc;
      this.pickupLocation = loc.name;
      this.pickupSuggestions = [];
      this.bookingService.setCurrent({ pickup: loc });
    });
  }

  selectDropLocation(pred: any) {
    this.locationService.getPlaceDetails(pred.place_id).subscribe(res => {
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
      this.dropLocation = loc.name;
      this.dropSuggestions = [];
      this.bookingService.setCurrent({ dropoff: loc });
      if (this.selectedPickup && this.selectedDrop) {
        this.calculateDistanceAndDuration(this.selectedPickup, this.selectedDrop);
      }
    });
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

        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status !== google.maps.GeocoderStatus.OK || !results || !results.length) {
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
              city: place.address_components.find(c => c.types.includes('locality'))?.long_name || null,
              state: place.address_components.find(c => c.types.includes('administrative_area_level_1'))?.long_name || 'Maharashtra',
              postcode: place.address_components.find(c => c.types.includes('postal_code'))?.long_name || null,
              suburb: place.address_components.find(c => c.types.includes('sublocality'))?.long_name || null,
              locality: place.address_components.find(c => c.types.includes('neighborhood'))?.long_name || null,
              addressLine1: place.formatted_address || null,
              addressLine2: null,
              country: place.address_components.find(c => c.types.includes('country'))?.long_name || null,
            },
          };

          this.selectedPickup = loc;
          this.pickupLocation = loc.name;
          this.pickupSuggestions = [];
          this.bookingService.setCurrent({ pickup: loc });
        });
      },
      () => alert("Unable to retrieve your location. Please allow GPS permission.")
    );
  }
validatePickup() {
  this.pickupError = '';

  if (!this.selectedPickup) {
    this.pickupLocation = '';
    this.pickupError = 'Please select a pickup location';
    this.clearErrorAfterDelay('pickup');
    return;
  }

  const state = this.selectedPickup.service_address?.state?.toLowerCase();

  if (state !== 'maharashtra') {
    this.pickupLocation = '';
    this.selectedPickup = undefined;
    this.pickupError = 'Please select pickup location in Maharashtra';
    this.clearErrorAfterDelay('pickup');
  }

  this.pickupSuggestions = [];
}

validateDrop() {
  this.dropError = '';

  if (!this.selectedDrop) {
    this.dropLocation = '';
    this.dropError = 'Please select a drop location';
    this.clearErrorAfterDelay('drop');
    return;
  }

  const state = this.selectedDrop.service_address?.state?.toLowerCase();

  if (state !== 'maharashtra') {
    this.dropLocation = '';
    this.selectedDrop = undefined;
    this.dropError = 'Please select drop location in Maharashtra';
    this.clearErrorAfterDelay('drop');
  }
  this.dropSuggestions = [];
}

private clearErrorAfterDelay(type: 'pickup' | 'drop', delay = 4000) {
  setTimeout(() => {
    if (type === 'pickup') {
      this.pickupError = '';
    } else {
      this.dropError = '';
    }
  }, delay);
}
  // Validation
  isFormValid(): boolean {
    if (!this.selectedPickup) return false;

    switch (this.selectedTripType) {
      case 'pickup-drop':
        // Pickup & Drop: Need both pickup and drop
        return !!this.selectedDrop;

      case 'outstation':
        // Outstation: Need only pickup and drop (no date/time)
        return !!this.selectedDrop;

      case 'rental':
        // Rental: Need pickup, drop, hours, date, and time
        // return !!this.selectedDrop && this.rentalHours > 0 && !!this.rentalDate && !!this.rentalTime;
      return !!this.selectedDrop;
      default:
        return false;
    }
  }

  // Book Now
  bookNow(event: Event): void {
    event.preventDefault();
  this.validatePickup();
  this.validateDrop();

  if (this.pickupError || this.dropError) {
    return;
  }
    if (!this.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    // Prepare booking data based on trip type
    let bookingData: any = {
      pickup: this.selectedPickup,
      tripTypeValue: this.selectedTripType,
      tripType: 'one-way', // Default
      passengers: {
        type: 'personal',
        adults: 1,
        children: 0,
        luggage: 0
      }
    };

    switch (this.selectedTripType) {
      case 'pickup-drop':
        // Pickup & Drop: Works as current implementation
        bookingData = {
          ...bookingData,
          dropoff: this.selectedDrop
        };
        break;

      case 'outstation':
        // Outstation: Pickup and Drop only (no date/time)
        bookingData = {
          ...bookingData,
          dropoff: this.selectedDrop
        };
        break;

      case 'rental':
        // Rental: Pickup, Drop, Hours (KM auto-calculated), Date, Time
        bookingData = {
          ...bookingData,
          dropoff: this.selectedDrop,
          date: this.rentalDate,
          time: this.rentalTime,
          rentalHours: this.rentalHours,
          rentalKm: this.rentalKm // Auto-calculated (hours * 10)
        };
        break;
    }

    // Save to session storage
    sessionStorage.setItem("selectedBooking", JSON.stringify(bookingData));

    // Update booking service
    this.bookingService.patchDeep(bookingData);

    console.log('Booking Data:', bookingData);

    // Navigate to booking page
    this.router.navigate(['/booking']);
  }
}
