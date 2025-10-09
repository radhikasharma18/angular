import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { constantUrl } from '../constantUrls';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule     
  ],
  templateUrl: './search-modal.html',
  styleUrls: ['./search-modal.css']
})
export class SearchModalComponent {
  customer: any;

  constructor(private http: HttpClient) {}

  loadCustomerSearch() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetSearchCustomer';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.get(url, { headers }).subscribe({
      next: (res: any) => {
        this.customer = res;
        console.log('Customer type API Response:', this.customer);
      },
      error: (err) => {
        console.error('Customer type API Error:', err);
      }
    });
  }
}
