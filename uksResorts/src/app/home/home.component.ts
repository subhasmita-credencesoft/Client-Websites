import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

@ViewChild('checkinInput') checkinInput!: ElementRef;
  @ViewChild('checkoutInput') checkoutInput!: ElementRef;
    @HostListener('window:scroll', [])
checkin: string = '';
  checkout: string = '';
  guests: number = 1;
  // component.ts
selectedRoom: string = 'superDeluxe';

rooms = [
  {
    id: 'superDeluxe',
    title: 'Super Deluxe AC',
    price: 4950,
    extra: 'EXTRA PERSON Above 05 Years ₹ 1400 + 5 % GST with Extra Mattress & Breakfast',
    description: 'Superior rooms can be set-up as either a queen bed or two single beds along with a study / workspace.',
    images: [
      'assets/home-imgs/room1.jpg',
      'assets/home-imgs/room1.jpg',
      'assets/home-imgs/room1.jpg'
    ],
    amenities: [
      { icon: 'assets/home-imgs/mingcute_wifi-line.svg', text: 'WiFi' },
      { icon: 'assets/home-imgs/material-symbols_water-pump-outline-rounded.svg', text: 'Hot Water' },
      { icon: 'assets/home-imgs/Vector (2).png', text: 'Room Service' },
      { icon: 'assets/home-imgs/material-symbols-light_tv-outline-rounded.svg', text: 'TV' }
    ]
  },
  {
    id: 'deluxe',
    title: 'Deluxe AC',
    price: 3950,
    extra: 'EXTRA PERSON Above 05 Years ₹ 1400 + 5 % GST with Extra Mattress & Breakfast',
    description: 'Deluxe room with cozy interiors and modern amenities.',
    images: [
      'assets/home-imgs/deluxe1.jpg',
      'assets/home-imgs/deluxe2.jpg',
      'assets/home-imgs/deluxe3.jpg'
    ],
    amenities: [
      { icon: 'assets/home-imgs/mingcute_wifi-line.svg', text: 'WiFi' },
      { icon: 'assets/home-imgs/material-symbols_water-pump-outline-rounded.svg', text: 'Hot Water' },
      { icon: 'assets/home-imgs/Vector (2).png', text: 'Room Service' },
      { icon: 'assets/home-imgs/material-symbols-light_tv-outline-rounded.svg', text: 'TV' }
    ]
  }
];

  constructor(private router: Router) {}

  onWindowScroll() {
    const header = document.getElementById('mainHeader');

    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
ngAfterViewInit() {
    const navbarCollapse = document.getElementById('nav'); // could be null

    if (!navbarCollapse) return; // safely exit if not found

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const isClickInside = navbarCollapse.contains(target);
      const isToggler = target.closest('.navbar-toggler');

      // only hide if menu is open and click is outside
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (!isClickInside && !isToggler && bsCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });

 const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const format = (d: Date) =>
      d.toISOString().split("T")[0];

    // Set values
    this.checkinInput.nativeElement.value = format(today);
    this.checkoutInput.nativeElement.value = format(tomorrow);

    // Set min values
    this.checkinInput.nativeElement.min = format(today);
    this.checkoutInput.nativeElement.min = format(tomorrow);


  }
  navigateToBooking(){
     window.location.href = 'https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true';
  }
  get selectedRoomObj() {
  return this.rooms.find(room => room.id === this.selectedRoom);
}

// Returns the currently selected room object
getSelectedRoom() {
  return this.rooms.find(room => room.id === this.selectedRoom);
}

// Sets the selected room when a card is clicked
selectRoom(roomId: string) {
  this.selectedRoom = roomId;

  // Reset carousel to first image whenever room changes
  const carousel = document.querySelector('#roomCarousel') as any;
  if (carousel && bootstrap?.Carousel) {
    const bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
    bsCarousel.to(0); // go to first slide
  }
}


  goToRooms(){
 this.router.navigate(['/rooms']);
  }
  goToBooking() {

    if (!this.checkin || !this.checkout) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const checkinDate = new Date(this.checkin);
    const checkoutDate = new Date(this.checkout);

    const checkinDay = checkinDate.getDate();
    const checkinMonth = checkinDate.getMonth() + 1; // months start from 0
    const checkinYear = checkinDate.getFullYear();

    const nights = (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24);

    const url =
      `https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true` +
      `&checkinDay=${checkinDay}` +
      `&checkinMonth=${checkinMonth}` +
      `&checkinYear=${checkinYear}` +
      `&nights=${nights}` +
      `&numGuests=${this.guests}` +
      `&numAdults=${this.guests}` +
      `&Children=0&rooms=1`;

    window.location.href = url;
  }

}
