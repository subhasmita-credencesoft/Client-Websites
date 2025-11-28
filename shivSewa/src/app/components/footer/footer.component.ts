import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface NavLink {
  label: string;
  url: string;
}

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  companyLinks: NavLink[] = [
    { label: 'About us', url: '#about' },
    { label: 'Our Fleet', url: '#fleet' },
    { label: 'Popular Trips', url: '#trips' }
  ];

  serviceLinks: NavLink[] = [
    { label: 'CSMIA Bookings', url: '#csmia' },
    { label: 'Group Travel', url: '#group' },
    { label: 'Join Shiv Sewa', url: '#join' }
  ];

  contactInfo: ContactInfo[] = [
    { icon: 'location', label: 'Address', value: '' },
    { icon: 'phone', label: 'Phone Number', value: '' },
    { icon: 'email', label: 'Email Address', value: '' }
  ];


}
