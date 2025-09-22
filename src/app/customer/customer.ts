import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { constantUrl } from '../constantUrls';
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
  district: any[] = [];
  tehsil:any[]=[];

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
    distance: '',
  };

  countries = ['India', 'USA', 'UK', 'Canada'];
  documentTypes = ['Aadhar Card', 'PAN Card', 'Passport'];
  genders = ['Male', 'Female', 'Other'];
  maritalStatuses = ['Single', 'Married', 'Divorced'];
  religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];
customer_state:any = " ";
customer_district=" ";
  ngOnInit() {
    this.loadStates();
  }

  
  loadStates() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetState';
    const token = constantUrl.token;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, {}, { headers }).subscribe({
      next: (res: any) => {
        this.states = res;
        console.log('States API Response:', this.states);
        return this.states;

      },
      error: (err) => {
        console.error('Error fetching states:', err);
      }
    });
    
  }
 loadDistricts(stateId: any) {
  console.log('Selected State ID:', stateId); 

  if (!stateId) return;

  const url = 'https://demo.finnaux.com/api/api/Masters/GetDistricts';
  const token = constantUrl.token;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token
  });

  this.http.post(url, { StateID: stateId }, { headers }).subscribe({
    next: (res: any) => {
      this.district = res; 
      console.log('Districts API Response:', this.district);
    },
    error: (err) => {
      console.error('Error fetching districts:', err);
    }
  });
}
loadTehsils(districtId: any) {
  console.log('Selected District ID:', districtId); 

  if (!districtId) return;

  const url = 'https://demo.finnaux.com/api/api/Masters/GetTahsil';
  const token = constantUrl.token;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token
  });

  this.http.post(url, { DistrictID: districtId }, { headers }).subscribe({
    next: (res: any) => {
      this.tehsil = res; 
      console.log('Tehsils API Response:', this.tehsil);
    },
    error: (err) => {
      console.error('Error fetching Tehsils:', err);
    }
  });
}
saveCustomer() {
  const url = 'https://demo.finnaux.com/api/api/LMS/SaveCustomerOutside'; 
  const token = constantUrl.token;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token
  });

  
  this.http.post(url, this.customer, { headers }).subscribe({
    next: (res: any) => {
      console.log('Customer saved successfully:', res);
      alert('Customer data saved successfully!');
    },
    error: (err) => {
      console.error('Error saving customer:', err);
      alert('Failed to save customer. Please try again.');
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
