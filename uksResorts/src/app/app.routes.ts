import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RoomsComponent } from './rooms/rooms.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';

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
  }
];
