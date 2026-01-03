import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MUMBAI_LOCATIONS } from '../../../data/mumbai-locations';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { GeoLocation } from '../../../models/geo-location';
import { BookingService } from '../../../services/booking.service';
import { LocationService } from '../../../services/location/location.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  pickupLocation: string = '';
  dropLocation: string = '';
  dateTime: string = '';
  passengers: number | null = null;
  bannerImages = [
  'assets/banner-img.png',
  'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/11/13162031/Satara.jpg',
  'https://img.nayatrip.com/images/state/big/MAHARASHTRA-GOA.jpg',
  'https://www.trawell.in/admin/images/upload/955980848Mumbai_Main.jpg'
];
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
  constructor(private router: Router,
    private bookingService: BookingService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.pickupAutocomplete = new google.maps.places.AutocompleteService();
      this.dropAutocomplete = new google.maps.places.AutocompleteService();
      this.checkViewport();
  window.addEventListener('resize', () => this.checkViewport());
      const dummyDiv = document.createElement('div');}
ngAfterViewInit() {
  if (this.isMobileView) {
    this.startMobileAutoSlide();
  }
}

startMobileAutoSlide() {
  this.mobileInterval = setInterval(() => {
    const slider = this.mobileSlider?.nativeElement;
    if (!slider) return;

    this.mobileSlideIndex =
      (this.mobileSlideIndex + 1) % this.bannerImages.length;

    slider.scrollTo({
      left: slider.clientWidth * this.mobileSlideIndex,
      behavior: 'smooth',
    });
  }, 5000); // 5 sec
}

ngOnDestroy() {
  if (this.mobileInterval) {
    clearInterval(this.mobileInterval);
  }
}
  //---------------------------------------
  // ✅ CLOSE SUGGESTIONS WHEN CLICKING OUTSIDE
  //---------------------------------------
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
  //---------------------------------------
validatePickup() {
  const match = this.mumbaiLocations.some(c =>
    c.toLowerCase() === this.pickupLocation.toLowerCase()
  );

  if (!match) {
    this.pickupLocation = '';
  }

  this.pickupSuggestions = [];
}

validateDrop() {
  const match = this.mumbaiLocations.some(c =>
    c.toLowerCase() === this.dropLocation.toLowerCase()
  );

  if (!match) {
    this.dropLocation = '';
  }

  this.dropSuggestions = [];
}

  bookNow(event: Event): void {
this.validatePickup();
this.validateDrop();
    event.preventDefault();
      const booking = {
    pickup: this.pickupLocation,
    drop: this.dropLocation,
    dateTime: this.dateTime,
    passengers: this.passengers
  };
  sessionStorage.setItem("selectedBooking", JSON.stringify(booking));
  this.bookingService.patchDeep({
    pickup: this.selectedPickup!,
    dropoff: this.selectedDrop!,
    });
    this.router.navigate(['/booking']);

  }

  //---------------------------------------
  // PICKUP INPUT AUTOCOMPLETE
  //---------------------------------------
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
          state: res.serviceAddress?.state || null,
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
      console.log('Selected Pickup Location:', loc);
    });
}

  //---------------------------------------
  // DROPOFF INPUT AUTOCOMPLETE
  //---------------------------------------


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
          state: res.serviceAddress?.state || null,
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
    });
}

  //---------------------------------------
  // CURRENT LOCATION
  //---------------------------------------
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
          this.pickupLocation = loc.name;
          this.pickupSuggestions = [];

          this.bookingService.setCurrent({ pickup: loc });

          console.log('Selected Pickup (Current Location):', loc);
        }
      );
    },
    () => alert("Unable to retrieve your location. Please allow GPS permission.")
  );
}

}
