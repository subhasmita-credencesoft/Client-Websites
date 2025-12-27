import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  showSuperDeluxeRoom =true;
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

  constructor(private router: Router,private cdr: ChangeDetectorRef) {}

  onWindowScroll() {
    const header = document.getElementById('mainHeader');

    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
  ngOnInIt(){
    const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const format = (d: Date) => d.toISOString().split("T")[0];

  // Prefill Angular variables
  this.checkin = format(today);
  this.checkout = format(tomorrow);

  // Prefill input fields to match variables
  if (this.checkinInput) this.checkinInput.nativeElement.value = this.checkin;
  if (this.checkoutInput) this.checkoutInput.nativeElement.value = this.checkout;

  // Set min dates for the date picker
  if (this.checkinInput) this.checkinInput.nativeElement.min = this.checkin;
  if (this.checkoutInput) this.checkoutInput.nativeElement.min = this.checkout;

  // Detect changes to avoid NG0100 error
  this.cdr.detectChanges();
  }
ngAfterViewInit() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const format = (d: Date) => d.toISOString().split("T")[0];

  // Prefill Angular variables
  this.checkin = format(today);
  this.checkout = format(tomorrow);

  // Prefill input fields to match variables
  if (this.checkinInput) this.checkinInput.nativeElement.value = this.checkin;
  if (this.checkoutInput) this.checkoutInput.nativeElement.value = this.checkout;

  // Set min dates for the date picker
  if (this.checkinInput) this.checkinInput.nativeElement.min = this.checkin;
  if (this.checkoutInput) this.checkoutInput.nativeElement.min = this.checkout;

  // Detect changes to avoid NG0100 error
  this.cdr.detectChanges();
}

  navigateToBooking(){
     window.location.href = 'https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true';
  }
  get selectedRoomObj() {
  return this.rooms.find(room => room.id === this.selectedRoom);
}
showSuperDeluxe(){
this.showSuperDeluxeRoom = true;
}
showDeluxe(){
this.showSuperDeluxeRoom = false;
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
  console.log("this," , this.checkout)
  console.log("this," , this.checkin)

  // Trim whitespace and ensure strings are non-empty
  const checkinStr = (this.checkin || '').trim();
  const checkoutStr = (this.checkout || '').trim();

  if (!checkinStr || !checkoutStr) {
    alert("Please select check-in and check-out dates.");
    return;
  }

  const checkinDate = new Date(checkinStr);
  const checkoutDate = new Date(checkoutStr);

  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    alert("Invalid date selection. Please reselect dates.");
    return;
  }

  if (checkoutDate <= checkinDate) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  const checkinDay = checkinDate.getDate();
  const checkinMonth = checkinDate.getMonth() + 1;
  const checkinYear = checkinDate.getFullYear();

  const nights = Math.ceil(
    (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const url =
    `https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true` +
    `&checkinDay=${checkinDay}` +
    `&checkinMonth=${checkinMonth}` +
    `&checkinYear=${checkinYear}` +
    `&nights=${nights}` +
    `&numGuests=${this.guests || 1}` +
    `&numAdults=${this.guests || 1}` +
    `&Children=0&rooms=1`;

  window.location.href = url;
}




}
