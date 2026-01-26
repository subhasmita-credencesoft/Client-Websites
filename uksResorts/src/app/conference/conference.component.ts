import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-conference',
  standalone: true,
  imports: [],
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.scss'
})
export class ConferenceComponent {
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
