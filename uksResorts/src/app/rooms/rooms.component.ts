import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
declare var bootstrap: any;

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  isExpanded: boolean = false;
  expandedStates: boolean[] = [false, false];
 @HostListener('window:scroll', [])

 ngAfterViewInit() {
    const myCarousel = document.querySelector('#carouselCard1');
    const carousel = new bootstrap.Carousel(myCarousel, {
      interval: 3000,
      ride: 'carousel'
    });
  }

  onWindowScroll() {
    const header = document.getElementById('mainHeader');

    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  booking = {
    checkIn: '',
    checkOut: '',
    guests: '1'
  };
submitBooking() {

  console.log("Check-in:", this.booking.checkIn);
  console.log("Check-out:", this.booking.checkOut);

  // Ensure check-in and check-out are provided
  if (!this.booking.checkIn || !this.booking.checkOut) {
    alert("Please select check-in and check-out dates.");
    return;
  }

  const checkinDate = new Date(this.booking.checkIn);
  const checkoutDate = new Date(this.booking.checkOut);

  // Validate dates
  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    alert("Invalid date selection. Please reselect dates.");
    return;
  }

  if (checkoutDate <= checkinDate) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  // Calculate nights
  const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Extract day, month, year for URL
  const checkinDay = checkinDate.getDate();
  const checkinMonth = checkinDate.getMonth() + 1; // Month is 0-indexed
  const checkinYear = checkinDate.getFullYear();

  // Guests fallback to 1 if not set
  const numGuests = this.booking.guests || 1;

  // Construct booking URL
  const url = `https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true` +
              `&checkinDay=${checkinDay}` +
              `&checkinMonth=${checkinMonth}` +
              `&checkinYear=${checkinYear}` +
              `&nights=${nights}` +
              `&numGuests=${numGuests}` +
              `&numAdults=${numGuests}` +
              `&Children=0&rooms=1`;

  // Redirect
  window.location.href = url;
}
goToBooking() {
   window.location.href = 'https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true';
}

toggleExpand(index: number) {
this.expandedStates[index] = !this.expandedStates[index];
}
}


