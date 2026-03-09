import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  expanded = false;

  toggleContent(): void {
    this.expanded = !this.expanded;
  }

  scrollingtoTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
