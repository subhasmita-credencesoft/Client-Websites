import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FleetBookingService } from '../../services/fleet-booking.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SigninComponent {

  email = "";
  password = "";
  error = "";

  constructor(
    private fleetService: FleetBookingService,
    private router: Router
  ) {}

  signin() {
    const driver = this.fleetService.signIn(this.email, this.password);

    if (!driver) {
      this.error = "Invalid email or password.";
        setTimeout(() => {
        this.error = "";
      }, 3000);
      return;
    }

    this.router.navigate(['/fleet/trips']);
  }
}
