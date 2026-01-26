import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-terms-condition',
  standalone: true,
  imports: [],
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.scss'
})
export class TermsConditionComponent {

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
