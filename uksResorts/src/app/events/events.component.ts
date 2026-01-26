import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';

interface EmailPayload {
  fromEmail: string;
  toEmail: string;
  message: string;
  subject: string;
  data: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  isSubmitted: boolean = false;

   constructor(private http: HttpClient) {

    }
ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
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

  //  isFormInvalid(name: string, email: string, phone: string): boolean {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   const isNameEmpty = !name || name.trim().length === 0;
  //   const isEmailInvalid = !email || !emailRegex.test(email);
  //   const isPhoneEmpty = !phone || phone.trim().length === 0;


  //   return isNameEmpty || isEmailInvalid || isPhoneEmpty;
  // }
  isFormInvalid(name: string, email: string, phone: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // This regex checks for exactly 10 digits
  const phoneRegex = /^\d{10}$/;

  const isNameEmpty = !name || name.trim().length === 0;
  const isEmailInvalid = !email || !emailRegex.test(email);
  const isPhoneInvalid = !phone || !phoneRegex.test(phone.trim());

  return isNameEmpty || isEmailInvalid || isPhoneInvalid;
}
submit(name: string, email: string, phone: string, eventCat: string, venue: string, count: number) {
  const apiUrl = 'https://api.bookonelocal.in/api-bookone/api/website/sendEmailFromWebSite';

  // Construct a clean message body
  const emailContent = `
    New Inquiry Details:
    -------------------
    Name: ${name}
    Email: ${email}
    Phone: ${phone || 'Not provided'}
    Event Category: ${eventCat}
    Preferred Venue: ${venue}
    Guest Count: ${count}
  `;

  const emailObject: EmailPayload = {
    fromEmail: 'info@bookonepms.com',
    toEmail: 'priyabrata@credencesoft.in',
    subject: `New Website Inquiry from ${name}`,
    message: emailContent,
    data: ''
  };

  this.http.post<any>(apiUrl, emailObject).subscribe({
    next: (response) => {
      this.isSubmitted = true;
      console.log('Email sent successfully:', response);
    },
    error: (error) => {
      this.isSubmitted = false;
      alert('There was an error sending your message. Please try again.');
      console.error('Error sending email:', error);
    }
  });
}

// events.component.ts
navigateToPage() {
  const element = document.getElementById('inquiryForm');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

}
