import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../pages/header/header.component';
import { HomeSliderComponent } from "../pages/home-slider/home-slider.component";
import { CollectionSectionComponent } from "../pages/collection-section/collection-section.component";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeaderComponent, HomeSliderComponent, CollectionSectionComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
