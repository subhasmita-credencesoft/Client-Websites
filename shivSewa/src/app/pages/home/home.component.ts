import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from "../banner/banner.component";
import { BannerServicesComponent } from '../banner-services/banner-services.component';
import { PopularTripsComponent } from "../popular-trips/popular-trips.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, BannerComponent, BannerServicesComponent, PopularTripsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor() {}
  ngOnInit(): void {

  }

}
