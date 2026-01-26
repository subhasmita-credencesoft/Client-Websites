import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent {
   @HostListener('window:scroll', [])
 
   onWindowScroll() {
    const header = document.getElementById('mainHeader');

    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
}
