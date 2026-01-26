import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-wedding',
  standalone: true,
  imports: [],
  templateUrl: './wedding.component.html',
  styleUrl: './wedding.component.scss'
})
export class WeddingComponent {

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
