import { FormsModule } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [NgbModule,FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  todayDate: NgbDateStruct;
  fromDate!: NgbDateStruct;
  toDate!: NgbDateStruct;

  constructor() {
    const today = new Date();
    this.todayDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

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
