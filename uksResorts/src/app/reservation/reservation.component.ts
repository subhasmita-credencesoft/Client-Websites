import { FormsModule, NgForm } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';

interface EmailPayload {
  fromEmail: string;
  toEmail: string;
  message: string;
  subject: string;
  data: string;
}

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
  isSubmitted: boolean = false;


  constructor(private http: HttpClient) {
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

onBookingSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      console.log('Form Data:', formData);

      const apiUrl = 'https://api.bookonelocal.in/api-bookone/api/website/sendEmailFromWebSite';

      this.http.post(apiUrl, formData).subscribe({
        next: (response) => {
          alert('Enquiry sent successfully!');
          form.reset(); 
        },
        error: (error) => {
          console.error('There was an error!', error);
          alert('Failed to send enquiry. Please try again.');
        }
      });
    }
  }
}
