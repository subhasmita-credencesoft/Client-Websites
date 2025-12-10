import { Routes } from '@angular/router';
import { HomeComponent } from './customer/pages/home/home.component';
import { BookingFormComponent } from './customer/pages/booking-form/booking-form.component';
import { SigninComponent } from './fleet/pages/sign-in/sign-in.component';
import { TasksComponent } from './fleet/pages/tasks/tasks.component';
import { TaskDetailsComponent } from './fleet/pages/task-details/task-details.component';

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'booking',
    component: BookingFormComponent,
  },
  {
    path: 'fleet/signin',
    component: SigninComponent,
  },
   {
    path: 'fleet/trips',
    component: TasksComponent,
  },
  {
    path: 'fleet/trip/:id',
    component: TaskDetailsComponent,
  },
];
