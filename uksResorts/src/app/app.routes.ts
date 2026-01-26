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
import { BlogPage1Component } from './blog-page1/blog-page1.component';
import { BlogPage2Component } from './blog-page2/blog-page2.component';
import { BlogPage3Component } from './blog-page3/blog-page3.component';
import { BlogPage4Component } from './blog-page4/blog-page4.component';
import { BlogPage5Component } from './blog-page5/blog-page5.component';
import { OneDayPicnicComponent } from './one-day-picnic/one-day-picnic.component';
import { WeddingComponent } from './wedding/wedding.component';
import { SportsComponent } from './sports/sports.component';
import { ConferenceComponent } from './conference/conference.component';
import { DiningComponent } from './dining/dining.component';
import { TariffComponent } from './tariff/tariff.component';
import { ReservationComponent } from './reservation/reservation.component';
// import { TariffComponent } from './tariff/tariff.component';

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
    path: 'picnic',
    component: OneDayPicnicComponent
  },
  {
    path: 'wedding',
    component: WeddingComponent
  },
  {
    path: 'sports',
    component: SportsComponent
  },
   {
    path: 'conference',
    component: ConferenceComponent
  },
  {
    path: 'terms-condition',
    component: TermsConditionComponent
  },
  {
    path: 'blogs',
    component: BlogComponent
  },
   {
    path: 'blog-page1',
    component: BlogPage1Component
  },
  {
    path: 'blog-page2',
    component: BlogPage2Component
  },
  {
    path: 'blog-page3',
    component: BlogPage3Component
  },
  {
    path: 'blog-page4',
    component: BlogPage4Component
  },
   {
    path: 'create-reservation',
    component: ReservationComponent
  },
  {
    path: 'blog-page5',
    component: BlogPage5Component
  },
  {
    path: 'dining',
    component: DiningComponent
  },
  {
    path: 'tariff',
    component: TariffComponent
  },
   {
    path: 'reservation',
    component: ReservationComponent
  }
];
