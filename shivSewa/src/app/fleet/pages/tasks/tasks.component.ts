import { Component } from '@angular/core';
import { FleetBookingService } from '../../services/fleet-booking.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  trips: any[] = [];

  stats = {
    pending: 0,
    accepted: 0,
    ontrip: 0,
    completed: 0
  };

  constructor(
    private fleetService: FleetBookingService,
    private router: Router
  ) {}

  ngOnInit() {
    const driver = this.fleetService.currentDriver;
      if (!driver || !driver.id) {
    this.fleetService.signOut();
    this.router.navigate(['/fleet/signin']);
    return;
  }
    this.trips = this.fleetService.getTrips(driver.id);

    this.calculateStats();
  }

  calculateStats() {
    this.stats.pending = this.trips.filter(t => t.status === 'Pending').length;
    this.stats.accepted = this.trips.filter(t => t.status === 'Accepted').length;
    this.stats.ontrip = this.trips.filter(t => t.status === 'On Trip').length;
    this.stats.completed = this.trips.filter(t => t.status === 'Completed').length;
  }

  call(num: string) { window.location.href = `tel:${num}`; }
  whatsapp(num: string) { window.open(`https://wa.me/${num}`, "_blank"); }
  email(mail: string) { window.location.href = `mailto:${mail}`; }

  updateStatus(id: number) {
    this.fleetService.updateTripStatus(id);
    const driver = this.fleetService.currentDriver;
    this.trips = this.fleetService.getTrips(driver.id);
    this.calculateStats();
  }

  viewDetails(id: number) {
    this.router.navigate(['/fleet/trip', id]);
  }
}
