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
    this.router.navigate(['/booking']);
  }
scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  this.menuOpen = false; // close mobile menu after clicking
}
}
