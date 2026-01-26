import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dining',
  standalone: true,
  imports: [],
  templateUrl: './dining.component.html',
  styleUrl: './dining.component.scss'
})
export class DiningComponent {

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
