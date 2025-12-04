import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepLocationComponent } from "./step-location/step-location.component";
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { StepPassengersComponent } from "./step-passengers/step-passengers.component";
import { StepSummaryComponent } from "./step-summary/step-summary.component";
import { StepConfirmationComponent } from "./step-confirmation/step-confirmation.component";

interface SidebarIcon {
  icon: string;
  active: boolean;
}
@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {

  constructor(){}
  ngOnInit(){

  }

}
