import { Component,Inject } from '@angular/core';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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
  dataSource = new MatTableDataSource<any>(); // Ensure MatTableDataSource is properly typed
  displayedColumns: string[] = ['CustomertName', 'Customer_Gender', 'GenderAge', 'PhoneNo','select'];
  showTable: boolean = false;
  selectedCustomer: any = null;


 constructor(
  private http: HttpClient,
  private dialogRef: MatDialogRef<SearchModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

  get isSearchDisabled(): boolean {
    return !(this.FilterBySearch && this.searchby);
  }

  onSelectCustomer(customer: any) {
    this.selectedCustomer = customer;
  }

 loadCustomerSearch() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetSearchCustomer';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, { ProductId: 0, SearchOn: this.FilterBySearch , SearchValue: this.searchby }, { headers }).subscribe({
      next: (res: any) => {
        this.dataSource.data = res; // Ensure data is assigned correctly to dataSource.data
        this.showTable = true;
        console.log('Customer type API Response:', this.dataSource);
      },
      error: (err) => {
        console.error('Customer type API Error:', err);
        this.showTable = false;
      }
    });
  }

   loadSaveButton() {
    if (this.selectedCustomer) {
      this.dialogRef.close(this.selectedCustomer);
    } else {
      alert('Please select a customer before saving.');
    }
  }

}
