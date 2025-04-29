import { Component, EventEmitter, Output } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../../primeng/primeng.module';

@Component({
  selector: 'app-topbar',
  imports: [ CommonModule, PrimengModule ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  profileItems: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => {
        console.log('Settings clicked');
      }
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        console.log('Logout clicked');
      }
    }
  ];

  @Output() menuToggle = new EventEmitter<void>();

toggleMenu() {
  this.menuToggle.emit();
}
}
