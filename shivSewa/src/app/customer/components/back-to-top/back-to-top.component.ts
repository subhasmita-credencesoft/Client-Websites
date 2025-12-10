import { CommonModule } from '@angular/common';
import { Component, HostListener } from "@angular/core";

@Component({
    selector: 'app-back-to-top',
    standalone: true,
    templateUrl: './back-to-top.component.html',
    imports: [CommonModule],
    styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {
    isVisible = false;

    @HostListener('window:scroll')
    onScroll() {
        this.isVisible = window.scrollY > 300;
    }

    backToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
}
