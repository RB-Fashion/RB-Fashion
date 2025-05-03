import { Component } from '@angular/core';
import { BillService } from '../bill.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PrimengModule } from '../../../primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bill-list',
  imports: [
    CommonModule,
    PrimengModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
  standalone: true,
  providers: [MessageService, CurrencyPipe, DatePipe, BillService],
})

export class BillListComponent {
  products: any[] = [];
  originalProducts: any[] = [];
  expandedRows: { [key: string]: boolean } = {};
  partyManageDialogVisible: boolean = false;
  productDialogVisible: boolean = false;
  invoiceDialogVisible: boolean = false;
  paymentDialogVisible: boolean = false;

  productForm!: FormGroup;
  invoiceForm!: FormGroup;
  paymentForm!: FormGroup;

  partiesCategory = [
    { name: 'General' },
    { name: 'Sewing Area' },
    { name: 'Accessories' }
  ];

  paymentTypes = [
    { name: 'Cash' },
    { name: 'Cheque' },
    { name: 'Account Transfer' }
  ];

  constructor(private billService: BillService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadData();
    this.initializeForms();
  }

  loadData() {
    Promise.allSettled([
      this.billService.getParties().toPromise(),
      this.billService.getInvoices().toPromise(),
      this.billService.getPayments().toPromise(),
    ]).then(results => {
      const [partiesResult, invoicesResult, paymentsResult] = results;
  
      const parties = partiesResult.status === 'fulfilled' && Array.isArray(partiesResult.value)
        ? partiesResult.value
        : [];
  
      const invoices = invoicesResult.status === 'fulfilled' && Array.isArray(invoicesResult.value)
        ? invoicesResult.value
        : [];
  
      const payments = paymentsResult.status === 'fulfilled' && Array.isArray(paymentsResult.value)
        ? paymentsResult.value
        : [];
  
      this.products = parties.map(party => {
        const partyInvoices = invoices.filter(inv => inv.partiesId === party.id);
        const partyPayments = payments.filter(pay => pay.partiesId === party.id);
  
        const balance =
          partyInvoices.reduce((sum, i) => sum + Number(i.amount), 0) -
          partyPayments.reduce((sum, p) => sum + Number(p.amount), 0);

        const invoiceAmount = partyInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
        const paymentAmount = partyPayments.reduce((sum, p) => sum + Number(p.amount), 0);  
  
        return {
          ...party,
          invoices: partyInvoices,
          payments: partyPayments,
          balance,
          invoiceAmount,
          paymentAmount,
        };
      });
      console.log('Products:', this.products);
      this.originalProducts = [...this.products];
    });
  }
  

  

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

  showPartyManageDialog() {
    this.partyManageDialogVisible = true;
  }

  initializeForms(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.invoiceForm = this.fb.group({
      invoiceNo: ['', Validators.required],
      date: ['', Validators.required],
      jobNo: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: [''],
      partiesId: ['']
    });

    this.paymentForm = this.fb.group({
      paymentNo: ['', Validators.required],
      date: ['', Validators.required],
      paymentMode: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: [''],
      partiesId: ['']
    });
  }

  addParties(): void {
    this.productForm.reset();
    this.productDialogVisible = true;
  }

  editParties(product: any): void {
    this.productForm.patchValue(product);
    this.productDialogVisible = true;
  }

  saveParties(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Product data to save:', productData);

      // Call the service to create a new party
      this.billService.createParty(productData).subscribe(
        (response) => {
          console.log('Party created successfully:', response);
          this.productDialogVisible = false;  // Close dialog
          this.loadData();
        },
        (error) => {
          console.error('Error creating party:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  addInvoice(partiesId:any): void {
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({ partiesId });
    this.invoiceDialogVisible = true;
    console.log('Parties ID:', partiesId);
  }

  editInvoice(invoice: any): void {
    this.invoiceForm.patchValue(invoice);
    this.invoiceDialogVisible = true;
  }

  saveInvoice(): void {
    if (this.invoiceForm.valid) {
      const invoiceData = this.invoiceForm.value;
      console.log('Invoice saved:', invoiceData);

      // Call the service to create a new party
      this.billService.createInvoice(invoiceData).subscribe(
        (response) => {
          console.log('Invoice created successfully:', response);
          this.invoiceDialogVisible = false;  // Close dialog
          this.loadData();
        },
        (error) => {
          console.error('Error creating party:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  addPayment(partiesId:any): void {
    this.paymentForm.reset();
    this.paymentForm.patchValue({ partiesId });
    this.paymentDialogVisible = true;
  }

  editPayment(payment: any): void {
    this.paymentForm.patchValue(payment);
    this.paymentDialogVisible = true;
  }

  savePayment(): void {

    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      this.paymentDialogVisible = false;

      // Call the service to create a new party
      this.billService.createPayment(paymentData).subscribe(
        (response) => {
          console.log('Invoice created successfully:', response);
          this.paymentDialogVisible = false;  // Close dialog
          this.loadData();
        },
        (error) => {
          console.error('Error creating payment:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onChangeOfPartiesInput(event: any) {
    const inputValue = event.target.value.toLowerCase();
  if (!inputValue) {
    this.products = [...this.originalProducts]; // Show all if input is empty
  } else {
    this.products = this.originalProducts.filter(product =>
      product.name.toLowerCase().includes(inputValue)
    );
  }
  }
}
