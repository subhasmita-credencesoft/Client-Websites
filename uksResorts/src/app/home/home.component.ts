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
