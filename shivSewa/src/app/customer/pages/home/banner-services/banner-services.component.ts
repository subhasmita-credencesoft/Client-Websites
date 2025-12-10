import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner-services',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './banner-services.component.html',
  styleUrl: './banner-services.component.scss'
})
export class BannerServicesComponent {
    servicesList = [
    {
      icon: 'assets/airport-pickup.svg',
      title: 'Airport Pickup & Drop Off',
    },
    {
      icon: 'assets/intercity.svg',
      title: 'Inter-City/Local Trips',
    },
    {
      icon: 'assets/out-station.svg',
      title: 'Out Station Travel',
    }
  ];

  constructor() {}
  ngOnInit(): void {  }

}
