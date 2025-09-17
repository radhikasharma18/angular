import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})
export class Customer {
  previewUrl: string | null = null;  // For showing uploaded image preview

  constructor(library: FaIconLibrary) {
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

  onSave() {
    console.log("Customer Saved:", this.customer);
    alert("Customer data saved successfully!");
  }

  // File upload handler
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      this.customer.profile = file;

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
