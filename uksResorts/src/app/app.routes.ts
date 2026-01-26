import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RoomsComponent } from './rooms/rooms.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { EventsComponent } from './events/events.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PolicyComponent } from './policy/policy.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
   {
    path: 'about-us',
    component: AboutUsComponent
  },
   {
    path: 'rooms',
    component: RoomsComponent
  },
    {
    path: 'gallery',
    component: GalleryComponent
  },    {
    path: 'contact',
    component: ContactComponent
  },
    {
    path: 'events',
    component: EventsComponent
  },
   {
    path: 'facilities',
    component: FacilitiesComponent
  },
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'terms-condition',
    component: TermsConditionComponent
  },
  {
    path: 'blogs',
    component: BlogComponent
  }
];
