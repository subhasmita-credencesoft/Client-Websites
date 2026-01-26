import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tariff',
  standalone: true,
  imports: [],
  templateUrl: './tariff.component.html',
  styleUrl: './tariff.component.scss'
})
export class TariffComponent {

  
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
