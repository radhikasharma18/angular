import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, HttpClientModule], 
  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})
export class Customer implements OnInit {
  previewUrl: string | null = null;
  states: any[] = [];

  constructor(library: FaIconLibrary, private http: HttpClient) {
    library.addIcons(faArrowUpFromBracket);
  }

  customer: any = {
    type: 'Individual',
    documentType: '',
    documentNumber: '',
    firstName: '',
    lastName: '',
    relation: '',
    gender: '',
    dob: '',
    age: '',
    email: '',
    whatsapp: '',
    contact: '',
    altContact: '',
    maritalStatus: '',
    religion: '',
    caste: '',
    work: '',
    businessType: '',
    profile: '',
    subCategory: '',
    address: '',
    landmark: '',
    district: '',
    tehsil: '',
    state: '',
    pincode: '',
    years: '',
    rentOwn: '',
    distance: ''
  };

  countries = ['India', 'USA', 'UK', 'Canada'];
  documentTypes = ['Aadhar Card', 'PAN Card', 'Passport'];
  genders = ['Male', 'Female', 'Other'];
  maritalStatuses = ['Single', 'Married', 'Divorced'];
  religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];

  ngOnInit() {
    this.loadStates();
  }

  
  loadStates() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetState';
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTgyMTk1NDksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIxNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIxNSJ9.cP8cRZ8vIAFIKJvbOLYyyOcEJv9j8ePdYCnzuKVDLD8';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, {}, { headers }).subscribe({
      next: (res: any) => {
        this.states = res;
        console.log('States API Response:', this.states);

      },
      error: (err) => {
        console.error('Error fetching states:', err);
      }
    });
  }

  onSave() {
    console.log("Customer Saved:", this.customer);
    alert("Customer data saved successfully!");
  }

  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      this.customer.profile = file;

      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
