import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  pickupLocation: string = '';
  dropLocation: string = '';
  dateTime: string = '';
  passengers: number | null = null;

  constructor() {}
  ngOnInit(): void {

  }
  bookNow(event: Event): void {
    event.preventDefault();
    console.log('Booking:', {
      pickup: this.pickupLocation,
      drop: this.dropLocation,
      dateTime: this.dateTime,
      passengers: this.passengers
    });
  }

  useCurrentLocation(): void {
    console.log('Getting current location...');
    // Add geolocation logic here
  }
}
