import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.scss'
})
export class SportsComponent {

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
