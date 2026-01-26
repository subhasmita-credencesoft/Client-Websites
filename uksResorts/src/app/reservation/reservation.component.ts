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


  if (!form.valid) return;

  const {
    name,
    email,
    phone,
    eventCat,
    venue,
    count,
    fromDate,
    toDate
  } = form.value;

  const formatDate = (date: any): string => {
    if (!date) return 'Not provided';
    const { year, month, day } = date;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const emailContent = `
New Booking Inquiry Details:
---------------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Event Category: ${eventCat}
Preferred Venue: ${venue}
Guest Count: ${count}
From Date: ${formatDate(fromDate)}
To Date: ${formatDate(toDate)}
`;

  const emailObject: EmailPayload = {
    fromEmail: 'info@bookonepms.com',
    toEmail: 'subhasmitatripathy07@gmail.com',
    subject: `New Booking Inquiry from ${name}`,
    message: emailContent,
    data: ''
  };

  const apiUrl =
    'https://api.bookonelocal.in/api-bookone/api/website/sendEmailFromWebSite';

  this.http.post<any>(apiUrl, emailObject).subscribe({
    next: (response) => {
      this.isSubmitted = true;
      console.log('Email sent successfully:', response);
      form.reset();
    },
    error: (error) => {
      this.isSubmitted = false;
      alert('There was an error sending your message. Please try again.');
      console.error('Error sending email:', error);
    }
  });
}


}
