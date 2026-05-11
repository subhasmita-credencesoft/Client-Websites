import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
menuOpen = false;
constructor(private router: Router,) {}

ngOnInit(): void {

}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  navigatebooking(){
    this.router.navigate(['/']);
  }
scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  this.menuOpen = false; // close mobile menu after clicking
}

openWhatsApp() {
  const message = 
    'Hello Shiv Sewa! I am looking to book a ride from your website.' +
    '%0A%0AMy Trip Details:' +
    '%0A• Pickup:' +
    '%0A• Drop:' +
    '%0A• Date:' +
    '%0A• Time:' +
    '%0A• Car:' +
    '%0A%0APlease send me a quote. Thanks!';

  const url = `https://wa.me/919136399064?text=${message}`;
  window.open(url, '_blank');
}
}
