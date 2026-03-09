import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from "./banner/banner.component";
import { BannerServicesComponent } from './banner-services/banner-services.component';
import { PopularTripsComponent } from "./popular-trips/popular-trips.component";
import { JourneyCardComponent } from './journey-card/journey-card.component';
import { CarsListingsDataComponent } from "./cars-listings-data/cars-listings-data.component";
import { ReviewsTestimonialsComponent } from './reviews-testimonials/reviews-testimonials.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BookingService } from '../../services/booking.service';
import { BackToTopComponent } from '../../components/back-to-top/back-to-top.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, BannerComponent, BannerServicesComponent, PopularTripsComponent, JourneyCardComponent, CarsListingsDataComponent, ReviewsTestimonialsComponent, AboutUsComponent, FooterComponent,ReactiveFormsModule,CommonModule,
  BackToTopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
selectedTripData: any;
  constructor(private bookingService: BookingService) {}
  ngOnInit(): void {
    this.bookingService.reset();
     sessionStorage.removeItem('selectedBooking');
  }

  onTripSelected(trip: any) {
  this.selectedTripData = { ...trip };
}
}
