import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { PrimengModule } from '../../primeng/primeng.module';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,PrimengModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: ['/']
    },
   
    {
      label: 'Invoices',
      icon: 'pi pi-receipt',
      routerLink: ['/bills/list']
    },
    
  ];
}
