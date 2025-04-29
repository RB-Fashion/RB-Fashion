import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [TopbarComponent, SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarVisible = true;

  ngOnInit(): void {
    this.isSidebarVisible = window.innerWidth > 768; // adjust breakpoint as needed
  }

  toggleMenu() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
