import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  apiUrl = 'http://localhost:5000';  // Add the apiUrl property

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.http.get(`${this.apiUrl}/users/list`)
      .subscribe(
        response => {
          console.log('Users list:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
}
