import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MUMBAI_LOCATIONS } from '../../../data/mumbai-locations';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

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
  'https://www.itl.cat/pngfile/big/58-584849_city-pictures-city-wallpapers-gateway-of-india.jpg'
];
  pickupSuggestions: string[] = [];
  dropSuggestions: string[] = [];

  mumbaiLocations: string[] = MUMBAI_LOCATIONS;

  @ViewChild('pickupGroup') pickupGroup!: ElementRef;
  @ViewChild('dropGroup') dropGroup!: ElementRef;

  constructor(private router: Router,) {}

  ngOnInit(): void {}

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
  //---------------------------------------

  bookNow(event: Event): void {
    event.preventDefault();
      const booking = {
    pickup: this.pickupLocation,
    drop: this.dropLocation,
    dateTime: this.dateTime,
    passengers: this.passengers
  };
  sessionStorage.setItem("selectedBooking", JSON.stringify(booking));
    this.router.navigate(['/booking']);
  }

  //---------------------------------------
  // PICKUP INPUT AUTOCOMPLETE
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
    this.pickupLocation = location;
    this.pickupSuggestions = [];
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
    this.dropLocation = location;
    this.dropSuggestions = [];
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

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(res => res.json())
          .then(data => {
            this.pickupLocation = data.display_name || "Current Location";
            this.pickupSuggestions = [];
          });
      },
      () => alert("Unable to retrieve your location. Please allow GPS permission.")
    );
  }
}
