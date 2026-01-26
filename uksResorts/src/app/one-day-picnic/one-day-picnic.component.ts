import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-one-day-picnic',
  standalone: true,
  imports: [],
  templateUrl: './one-day-picnic.component.html',
  styleUrl: './one-day-picnic.component.scss'
})
export class OneDayPicnicComponent {

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
