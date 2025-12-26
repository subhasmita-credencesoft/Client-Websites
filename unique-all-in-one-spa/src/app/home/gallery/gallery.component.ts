import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

    images: string[] = [
    'assets/pic2.jpg',
    'assets/pic1.jpg',
    'assets/pic3.jpg',
    'assets/pic4.jpg',
    'assets/pic1.jpg',
    'assets/pic3.jpg'
  ];

  isOpen = false;
  currentIndex = 0;
  currentImage = '';
  isSliderOpen:  boolean = true;
  ngOnIt(){

  }

  openSlider(index: number) {
    this.currentIndex = index;
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  next(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(event: Event) {
    event.stopPropagation();
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
