import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'booking',
    component: BookingFormComponent,
  },
];
