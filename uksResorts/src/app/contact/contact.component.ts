import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';

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

  submit() {
    const apiUrl = 'https://api.bookonelocal.in/api-bookone/api/website/sendEmailFromWebSite';

    const emailObject = {
      fromEmail: 'info@bookonepms.com',
      toEmail: 'priyabrata@credencesoft.in',
      message: 'Hello, this is a test message',
      subject: 'New Website Inquiry',
      data: ' '
    };

    this.http.post<any>(apiUrl, emailObject).subscribe({
      next: (response) => {
        this.isSubmitted = true;
        console.log('Email sent successfully:', response);
      },
      error: (error) => {
        this.isSubmitted = false;
        console.error('Error sending email:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}
