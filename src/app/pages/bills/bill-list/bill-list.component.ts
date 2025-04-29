import { Component } from '@angular/core';
import { BillService } from '../bill.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PrimengModule } from '../../../primeng/primeng.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-bill-list',
  imports: [CommonModule,PrimengModule],
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.scss',
  standalone: true,
  providers: [MessageService, CurrencyPipe, DatePipe, BillService],
})

export class BillListComponent {
  products = [
    {
      id: 1,
      name: 'John Traders',
      category: 'Garments',
      price: 2500,
      invoices: [
        { invoiceNo: 'INV001', date: new Date('2025-04-01'), amount: 4000 },
        { invoiceNo: 'INV002', date: new Date('2025-04-10'), amount: 3000 }
      ],
      payments: [
        { paymentNo: 'PAY001', date: new Date('2025-04-05'), amount: 2000 },
        { paymentNo: 'PAY002', date: new Date('2025-04-15'), amount: 5000 }
      ]
    },
    {
      id: 2,
      name: 'ACME Co.',
      category: 'Textiles',
      price: 0,
      invoices: [
        { invoiceNo: 'INV003', date: new Date('2025-04-11'), amount: 5000 }
      ],
      payments: [
        { paymentNo: 'PAY003', date: new Date('2025-04-20'), amount: 5000 }
      ]
    }
  ];

  expandedRows: { [key: string]: boolean } = {};

  onRowExpand(event: any) {
    this.expandedRows[event.data.id] = true;
  }

  onRowCollapse(event: any) {
    delete this.expandedRows[event.data.id];
  }

  expandAll() {
    this.products.forEach(product => {
      this.expandedRows[product.id] = true;
    });
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
