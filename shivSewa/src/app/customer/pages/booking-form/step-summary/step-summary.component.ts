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
  vehicle: { id?: any; name?: string; seats?: number; carNumber?: string; bags?: number; price?: number; image?: string; } | undefined;
  vehicleOne: { id?: any; name?: string; seats?: number; carNumber?: string; bags?: number; price?: number; image?: string; } | undefined;

  constructor(private bookingService: BookingService) {
    this.bookingService.booking$.subscribe(b => {
      this.booking = b;
      this.estimated = b.vehicle?.price || 0;
      this.vehicleOne = b.vehicle;
      console.log("booking data", this.vehicle);
    });
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
  goBack() { this.bookingService.prevStep(); }
  validateTravellerForm(
  firstName: any,
  lastName: any,
  mobile: any,
  email: any
): string | null {

  // Touch all fields before checking
  firstName.control.markAsTouched();
  lastName.control.markAsTouched();
  mobile.control.markAsTouched();
  email.control.markAsTouched();

  const t = this.booking.traveller;

  if (!t.firstName || !/^[A-Za-z]+$/.test(t.firstName)) {
    return "firstNameField";
  }

  if (!t.lastName || !/^[A-Za-z]+$/.test(t.lastName)) {
    return "lastNameField";
  }

  if (!t.mobile || !/^[6-9][0-9]{9}$/.test(t.mobile)) {
    return "mobileField";
  }

  if (!t.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)) {
    return "emailField";
  }

  return null;
}

scrollToField(fieldId: string) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("shake-error");

    // Remove effect after animation
    setTimeout(() => el.classList.remove("shake-error"), 800);
  }
}
  confirm(firstName: any, lastName: any, mobile: any, email: any) {
       const invalidField = this.validateTravellerForm(
    firstName,
    lastName,
    mobile,
    email
  );

  if (invalidField) {
    this.scrollToField(invalidField);
    return;
  }
    this.bookingService.nextStep();
    this.bookingService.generateRef();
  }

}
