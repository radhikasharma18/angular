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
    Customer_FirstName: '',
    Customer_LastName: '',
    Customer_Relation_Type: '',
    Customer_Gender: '',
    Customer_DOB: '',
    age: '',
    Customer_Email: '',
    Customer_WhatsAppNo: '',
    Customer_PhoneNo: '',
    Customer_PhoneNo1: '',
    Customer_MaritalStatus: '',
    Customer_Religion: '',
    Customer_Cast: '',
    Customer_Profile: '',
    Customer_Category:'',
    Customer_SubCategory:'',
    Customer_Natureofwork:'',
    Customer_Other_Email:'',
    Customer_Relation_FirstName:'',
    Customer_Relation_LastName:''
  };
  address: any={
    StateId: '',
    DistrictId: '',
    TehsilId: '',
    NoOfLiving: '',
    RentOwn: '',
    Address: '',
    LandMark: '',
    PinCode: '',
    DistanceBranch: '',
    IsCommunicationAddress: '',
    AddressId: ''
  };
 


  countries = ['India', 'USA', 'UK', 'Canada'];
  documentTypes = ['Aadhar Card', 'PAN Card', 'Passport'];
  Customer_Gender = ['Male', 'Female', 'Other'];
  maritalStatuses = ['Single', 'Married', 'Divorced'];
  religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];
  StateId: any = '';
  customer_district: any = '';
  customer_tehsil:any='';

  ngOnInit() {
    this.loadStates();
    this.loadCustomerProfile();
  }

  calculateAge() {
    if (!this.customer.Customer_DOB) return;

    const today = new Date();
    const birthDate = new Date(this.customer.Customer_DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.customer.age = age;

    if (age < 18) {
      alert("Customer must be at least 18 years old.");
      this.customer.Customer_DOB = '';
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

    const payload = this.buildPayload();
   
    const body = {
      CustomerId: 0,
      JSON: JSON.stringify(payload)
    };
    console.log('Wrapped body to send:', JSON.stringify(body));

    this.http.post(url, body, { headers }).subscribe({
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
    this.saveCustomer();
  }

  buildPayload() {
    const dobIso = this.customer.Customer_DOB ? new Date(this.customer.Customer_DOB).toISOString() : null;

    const sanitize = (v: any) => {
      if (v === undefined || v === null) return '';
      if (typeof v === 'string' && v.trim().toLowerCase() === 'undefined') return '';
      return v;
    };

    const applicationCustomer: any = {
      Type: sanitize(this.customer.type || this.customer.Type) || 'Individual',
      Customer_FirstName: sanitize(this.customer.Customer_FirstName || this.customer.firstName),
      Customer_LastName: sanitize(this.customer.Customer_LastName || this.customer.lastName),
      Customer_Relation_Type: sanitize(this.customer.Customer_Relation_Type || this.customer.relation),
      Customer_Relation_FirstName: sanitize(this.customer.Customer_Relation_FirstName || ''),
      Customer_Relation_LastName: sanitize(this.customer.Customer_Relation_LastName || ''),
      Customer_Gender: sanitize(this.customer.Customer_Gender || ''),
      Customer_DOB: dobIso,
      Customer_PhoneNo: sanitize(this.customer.Customer_PhoneNo || this.customer.contact),
      Customer_Email: sanitize(this.customer.Customer_Email || this.customer.email),
      Customer_Other_Email: sanitize(this.customer.Customer_Other_Email || ''),
      Customer_WhatsAppNo: sanitize(this.customer.Customer_WhatsAppNo || this.customer.whatsapp),
      Customer_MaritalStatus: sanitize(this.customer.Customer_MaritalStatus || this.customer.maritalStatus),
      Customer_Religion: sanitize(this.customer.Customer_Religion || this.customer.religion),
      Customer_Profile: sanitize(this.customer.Customer_Profile || this.customer.profileImage),
      Customer_Category: sanitize(this.customer.Customer_Category),
      Customer_SubCategory: sanitize(this.customer.Customer_SubCategory),
      Customer_Natureofwork: sanitize(this.customer.Customer_Natureofwork),
      Customer_Cast: sanitize(this.customer.Customer_Cast),
      BusinessCategory: sanitize(this.customer.BusinessCategory || ''),
      Customer_CreateBy: this.customer.Customer_CreateBy || 0,
      Customer_PhoneNo_IsVerified: this.customer.Customer_PhoneNo_IsVerified || 0,
      DocData: sanitize(this.customer.DocData || '')
    };

    const kycDoc = {
      KYC_DocId: sanitize(this.customer.KYC_DocId || ''),
      KYC_DocNumber: sanitize(this.customer.documentNumber || ''),
      KYC_DocFile: '',
      KYC_DocFile1: '',
      Verified_Button: false,
      LastVerfiedDate: '',
      KYC_IsVerified: 0
    };

    const address = {
      StateId: sanitize(this.StateId || this.customer.StateId || ''),
      DistrictId: sanitize(this.customer_district || this.customer.district || ''),
      TehsilId: sanitize(this.customer.tehsil || ''),
      NoOfLiving: this.customer.NoOfLiving || 0,
      RentOwn: sanitize(this.customer.rentOwn || this.customer.RentOwn || ''),
      Address: sanitize(this.customer.address || ''),
      LandMark: sanitize(this.customer.landmark || ''),
      PinCode: sanitize(this.customer.pincode || ''),
      DistanceBranch: sanitize(this.customer.distance || ''),
      IsCommunicationAddress: true
    };

    const customerPermanent = {
      StateId: address.StateId,
      DistrictId: address.DistrictId,
      TehsilId: address.TehsilId,
      NoOfLiving: address.NoOfLiving,
      RentOwn: address.RentOwn,
      IfIsPermanentAddressSamePresentAddress: true,
      Address: address.Address,
      LandMark: address.LandMark,
      PinCode: address.PinCode,
      DistanceBranch: address.DistanceBranch,
      District: null,
      Tehsil: null
    };

    const customerBankDetail = [
      {
        BeneficiaryName: '',
        AccountNo: '',
        BankName: '',
        BankBranch: '',
        BankAcType: '',
        BankIFSC: '',
        BankMICRCode: ''
      }
    ];

    const payload = {
      ApplicationCustomer: applicationCustomer,
      CustomerKYCDoc: [kycDoc],
      address: address,
      customerPermanent: customerPermanent,
      customerWork: [],
      CustomerBankDetail: customerBankDetail,
      Int_Id: 0
    };

    return payload;
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
