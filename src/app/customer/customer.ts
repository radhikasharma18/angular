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
  tehsil: any[] = [];
  profile: any[] = [];
  catergory: any[] = [];
  subcatergory: any[] = [];
  natureofwork: any[] = [];
  caste: any[] = [];

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
    profileImage: '',   
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
    profile: '',
    catergory:'',
    subcategory:'',
    natureofwork:''
  };

  countries = ['India', 'USA', 'UK', 'Canada'];
  documentTypes = ['Aadhar Card', 'PAN Card', 'Passport'];
  genders = ['Male', 'Female', 'Other'];
  maritalStatuses = ['Single', 'Married', 'Divorced'];
  religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];
  customer_state: any = '';
  customer_district: any = '';

  ngOnInit() {
    this.loadStates();
    this.loadCustomerProfile();
  }

  calculateAge() {
    if (!this.customer.dob) return;

    const today = new Date();
    const birthDate = new Date(this.customer.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.customer.age = age;

    if (age < 18) {
      alert("Customer must be at least 18 years old.");
      this.customer.dob = '';
      this.customer.age = '';
    }
  }

  loadCustomerProfile() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCustomer_Profile_Master_For_Dropdown';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, {P_ID: 0,Type: "Profile"}, { headers }).subscribe({
      next: (res: any) => {
        this.profile = res;
        console.log('customer profile API Response:', this.profile);
      },
      error: (err) => {
        console.error('Error fetching customer profile:', err);
      }
    });
  }
   loadCustomercategory(profileId: any) {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCustomer_Profile_Master_For_Dropdown';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, {P_ID: 0,Type: "Category"}, { headers }).subscribe({
      next: (res: any) => {
        this.catergory = res;
        console.log('customer category API Response:', this.catergory);
      },
      error: (err) => {
        console.error('Error fetching customer category:', err);
      }
    });
  }
  loadCustomerSubcategory(CategoryId: any) {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCustomer_Profile_Master_For_Dropdown';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, {P_ID: 0,Type: "Sub-Category"}, { headers }).subscribe({
      next: (res: any) => {
        this.subcatergory = res;
        console.log('customer category API Response:', this.subcatergory);
      },
      error: (err) => {
        console.error('Error fetching customer category:', err);
      }
    });
  }
  loadCustomerNatureOfWork(subCategoryId: any) {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCustomer_Profile_Master_For_Dropdown';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, {P_ID: 0 ,Type: "Nature of work"}, { headers }).subscribe({
      next: (res: any) => {
        this.natureofwork = res;
        console.log('customer category API Response:', this.natureofwork);
      },
      error: (err) => {
        console.error('Error fetching customer category:', err);
      }
    });
  }
  loadCustomerCaste(casteId: any) {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCustomer_Profile_Master_For_Dropdown';
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
      },
      error: (err) => {
        console.error('Error fetching states:', err);
      }
    });
  }

  loadDistricts(stateId: any) {
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      this.customer.profileImage = file;   

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
