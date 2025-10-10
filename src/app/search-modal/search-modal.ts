import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { constantUrl } from '../constantUrls';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    HttpClientModule, 
  ],
  templateUrl: './search-modal.html',
  styleUrls: ['./search-modal.css']
})
export class SearchModalComponent {
  customer: any;
  FilterBySearch: string = '';
  searchby: string = '';
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['CustomertName', 'Customer_Gender', 'GenderAge', 'PhoneNo','select'];
  showTable: boolean = false;

  constructor(private http: HttpClient) {}

  loadCustomerSearch() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetSearchCustomer';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, { ProductId: 0, SearchOn: this.FilterBySearch , SearchValue: this.searchby }, { headers }).subscribe({
      next: (res: any) => {
        this.dataSource = res;
        this.showTable = true;
        console.log('Customer type API Response:', this.customer);
      },
      error: (err) => {
        console.error('Customer type API Error:', err);
        this.showTable = false;
      }
    });
  }
}
