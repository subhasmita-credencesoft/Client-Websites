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
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isSubmitted: boolean = false;

  constructor(private http: HttpClient) {

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

  isFormInvalid(name: string, email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const isNameEmpty = !name || name.trim().length === 0;
    const isEmailInvalid = !email || !emailRegex.test(email);

    return isNameEmpty || isEmailInvalid;
  }

  submit(name: string, email: string, phone: string, userMsg: string) {
  const apiUrl = 'https://api.bookonelocal.in/api-bookone/api/website/sendEmailFromWebSite';

  const emailContent = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone || 'Not provided'}
    Message: ${userMsg}
  `;

  const emailObject: EmailPayload = {
    fromEmail: 'info@bookonepms.com',
    toEmail: 'priyabrata@credencesoft.in',
    subject: `New Website Inquiry from ${name}`,
    message: emailContent,
    data: '' // Keep as empty string if required by API
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
}
