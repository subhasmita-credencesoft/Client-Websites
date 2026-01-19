import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MUMBAI_LOCATIONS } from '../../../data/mumbai-locations';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { GeoLocation } from '../../../models/geo-location';
import { BookingService } from '../../../services/booking.service';
import { LocationService } from '../../../services/location/location.service';
import { Booking, TripServiceType, TripTypeValue } from '../../../models/booking.model';

type TripType = 'pickup-drop' | 'outstation' | 'rental';
type VehicleCategory = 'sedan' | 'suv' | 'suvPlus';

interface Car {
  id: number;
  name: string;
  seats: number;
  bags: number;
  fuel: string;
  description: string;
  carNumber: string;
  image: string;
}

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
  selectedVehicleCategory: VehicleCategory | null = null;

  // Vehicle categories array with proper typing
  vehicleCategories: VehicleCategory[] = ['sedan', 'suv', 'suvPlus'];
  // Common fields
  pickupLocation: string = '';
  dropLocation: string = '';

  // Rental specific - Hours with automatic KM calculation
  rentalHours: number = 1;
  rentalDate: string = '';
  rentalTime: string = '';

  // Car data
  carData: Record<VehicleCategory, Car[]> = {
    sedan: [
      {
        id: 1,
        name: 'Hyundai Aura',
        seats: 4,
        bags: 2,
        fuel: 'Petrol',
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 01 AU 1234',
        image: 'assets/Hyundai-Aura.png'
      },
      {
        id: 2,
        name: 'Maruti Dzire',
        seats: 4,
        bags: 2,
        fuel: 'Petrol',
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 02 DZ 5678',
        image: 'assets/Maruti-Dzire.png'
      }
    ],
    suv: [
      {
        id: 3,
        name: 'Maruti XL6',
        seats: 6,
        bags: 3,
        fuel: 'Petrol',
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 03 XL 1122',
        image: 'assets/Maruti-XL6.png'
      },
      {
        id: 4,
        name: 'Toyota Rumion',
        seats: 6,
        bags: 3,
        fuel: 'Petrol',
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 04 RU 3344',
        image: 'assets/Toyota-Rumion.png'
      },
      {
        id: 5,
        name: 'Maruti Ertiga',
        seats: 6,
        bags: 3,
        fuel: 'Petrol',
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 05 ER 5566',
        image: 'assets/Maruti- Ertiga.png'
      }
    ],
    suvPlus: [
      {
        id: 6,
        name: 'Toyota Innova Crysta',
        seats: 6,
        bags: 4,
        fuel: 'Diesel',
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 06 IC 7788',
        image: 'assets/Toyota-Innova-Crysta.png'
      }
    ]
  };

  // Automatic KM calculation: 10 KM per hour
  get rentalKm(): number {
    return this.rentalHours * 10;
  }

  // Banner images
  bannerImages = [
    'assets/banner-img.png',
    'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/11/13162031/Satara.jpg',
    'https://img.nayatrip.com/images/state/big/MAHARASHTRA-GOA.jpg',
    'assets/mumbai-st.jpg'
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
    this.useCurrentLocation();
    this.checkViewport();
    window.addEventListener('resize', () => this.checkViewport());
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

  // Vehicle Category Selection
   selectVehicleCategory(category: VehicleCategory) {
    this.selectedVehicleCategory = category;

    // ✅ store early
    this.bookingService.setCurrent({
      vehicleCategory: category
    });
  }

  // Get vehicle category display name
   getVehicleCategoryName(category: VehicleCategory): string {
    return {
      sedan: 'Sedan',
      suv: 'SUV',
      suvPlus: 'Suv Plus'
    }[category];
  }

  resetForm() {
    if (this.selectedTripType === 'rental') {
      this.dropLocation = '';
      this.selectedDrop = undefined;
    } else {
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

  incrementHours() {
    this.rentalHours++;
  }

  decrementHours() {
    if (this.rentalHours > 1) {
      this.rentalHours--;
    }
  }

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

        const distanceKm = +(element.distance.value / 1000).toFixed(2);
        const durationMinutes = Math.ceil(element.duration.value / 60);

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

  isFormValid(): boolean {
     if (!this.selectedPickup) return false;
    if (!this.selectedVehicleCategory) return false;
    if (!this.selectedDrop) return false;
    return true;
  }

bookNow(event: Event): void {
  event.preventDefault();

  this.validatePickup();
  this.validateDrop();
  if (!this.isFormValid()) return;

  const tripServiceType: TripServiceType =
  this.selectedTripType === 'pickup-drop'
    ? 'pickup_drop'
    : this.selectedTripType;
const tripTypeValue: TripTypeValue = this.selectedTripType;
  const bookingData: Partial<Booking> = {
  // direction
  tripType: 'one-way',

  // UI layer value
  tripTypeValue: tripTypeValue,

  // pricing engine value
  tripServiceType: tripServiceType,

  vehicleCategory: this.selectedVehicleCategory,

  pickup: this.selectedPickup,
  dropoff: this.selectedDrop,

  distanceKm: this.bookingService.getCurrent()?.distanceKm ?? 0,
  durationMinutes: this.bookingService.getCurrent()?.durationMinutes ?? 0,

  passengers: {
    type: 'personal',
    adults: 1,
    children: 0,
    luggage: 0
  }
};

  this.bookingService.patchDeep(bookingData);
  sessionStorage.setItem('selectedBooking', JSON.stringify(bookingData));

  this.router.navigate(['/booking']);
}



}

