import { Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponentComponent {
  menuOpen = false;
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    console.log('menuOpen is',this.menuOpen);
  }
}
