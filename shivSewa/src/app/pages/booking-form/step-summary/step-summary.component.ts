import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-summary.component.html',
  styleUrl: './step-summary.component.scss'
})
export class StepSummaryComponent {
  booking: any = {};
  estimated = 0;

  constructor(private bookingService: BookingService) {
    this.bookingService.booking$.subscribe(b => {
      this.booking = b;
      this.estimated = b.vehicle?.price || 0;
    });
  }
  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
  goBack() { this.bookingService.prevStep(); }

  confirm() {
    this.bookingService.nextStep();
    this.bookingService.generateRef();
  }

}
