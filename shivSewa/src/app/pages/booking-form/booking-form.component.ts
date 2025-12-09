import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { BookingService } from '../../services/booking.service';
import { StepLocationComponent } from "./step-location/step-location.component";
import { StepPassengerComponent } from "./step-passenger/step-passenger.component";
import { StepSummaryComponent } from "./step-summary/step-summary.component";
import { StepConfirmationComponent } from "./step-confirmation/step-confirmation.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, StepLocationComponent, StepPassengerComponent, StepSummaryComponent, StepConfirmationComponent, HeaderComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {
  step = 0;
  steps = ['LOCATION & TIME', 'PASSENGER & VEHICLE SELECTION', 'BOOKING SUMMARY'];
  stepAnchors = [30, 50, 100];
  constructor(public bookingService: BookingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.bookingService.step$.subscribe(s => this.step = s);
  }

  goTo(i: number) {
    this.bookingService.setStep(i);
  }

  navigatetoHome(){
    this.router.navigate(['/']);
  }

progressPct() {
  // const pct = (this.step / (this.steps.length - 1)) * 100;
  // return this.step === 0 ? 15 : pct;
  return this.stepAnchors[this.step];
}
ngAfterViewInit() {
  this.bookingService.setStep(0);
}
}
