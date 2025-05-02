import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
    private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getParties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/parties/list`);
  }

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/invoices/list`);
  }

  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/payments/list`);
  }



  getBillById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateBill(id: string, billData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, billData);
  }

  createParty(partyData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/parties/create`, partyData);
  }

  createInvoice(invoiceData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/invoices/create`, invoiceData);
  }

  createPayment(paymentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/payments/create`, paymentData);
  }
}
