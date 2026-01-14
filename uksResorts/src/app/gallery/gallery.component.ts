import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
declare var bootstrap: any; // for Bootstrap 5 JS API
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
     selectedImage: string = '';
  selectedIndex = 0;
  carouselInstance: any;
  modalInstance: any;
ngAfterViewInit() {
  const carouselEl = document.getElementById('carouselExample');
  if (carouselEl) {
    this.carouselInstance = new bootstrap.Carousel(carouselEl, {
      interval: false,
      wrap: true
    });
  }

  const modalEl = document.getElementById('galleryModal');
  if (modalEl) {
    this.modalInstance = new bootstrap.Modal(modalEl, {
      backdrop: true,
      keyboard: true
    });

    modalEl.addEventListener('hidden.bs.modal', () => {
      document.body.classList.remove('modal-open');
      const backdrops = document.getElementsByClassName('modal-backdrop');
      while (backdrops.length > 0) {
        backdrops[0].parentNode?.removeChild(backdrops[0]);
      }
    });
  }
}

 @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('mainHeader');

    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  galleryImages = [
    'assets/home-imgs/entrance1.jpg',
    'assets/home-imgs/uks-exterior-1.jpg',
    'assets/home-imgs/uks-exterior1-1.jpg',
    'assets/home-imgs/Water-Park-1.jpg',
    'assets/home-imgs/Water-Park-7.jpg',
    'assets/home-imgs/Water-Park-13.jpg',
    'assets/home-imgs/wedding1-1.jpg',
    'assets/home-imgs/sport3.jpg',
    'assets/home-imgs/reception.jpg',
    'assets/home-imgs/wedding4-1.jpg',
    'assets/home-imgs/conference3-1.jpg',
    'assets/home-imgs/slider3.jpg',
    'assets/home-imgs/slider2.jpg',
    'assets/home-imgs/sport2-1.jpg',
    'assets/home-imgs/room-img1.jpg',
    'assets/home-imgs/image1.png'
  ];

 openModal(index: number) {
    this.selectedIndex = index;

    // Move to the selected slide
    this.carouselInstance.to(this.selectedIndex);

    // Show the modal manually (if needed)
    const modalEl = document.getElementById('galleryModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  ngOnDestroy() {
    // Force remove the 'modal-open' class and any leftover backdrops
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}
