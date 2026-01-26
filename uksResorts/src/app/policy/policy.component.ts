import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent {

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
