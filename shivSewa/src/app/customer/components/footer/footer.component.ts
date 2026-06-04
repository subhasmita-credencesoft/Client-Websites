import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface NavLink {
  label: string;
  id?: string;   // for scroll-based links
  url?: string;  // for normal href links
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
  { label: 'About us', id: 'about' },
  { label: 'Our Fleet', id: 'fleet' },
  { label: 'Popular Trips', id: 'trips' }
];

  serviceLinks: NavLink[] = [
    // { label: 'CSMIA Bookings', url: '#csmia' },
    // { label: 'Group Travel', url: '#group' },
    // { label: 'Join Shiv Sewa', url: '#join' }
  ];

  contactInfo: ContactInfo[] = [
    { icon: 'location', label: 'C-6-10-4-1, Sector6, CBD Belapur, Navi Mumbai - 400614, Maharashtra', value: '' },
    { icon: 'phone', label: '9136399064', value: '' },
    { icon: 'email', label: 'rides@shivsewa.in', value: '' }
  ];

scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
}
