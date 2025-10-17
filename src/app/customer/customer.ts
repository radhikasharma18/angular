import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { constantUrl } from '../constantUrls';
import { SearchModalComponent } from '../search-modal/search-modal';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, HttpClientModule,MatDialogModule,MatFormFieldModule,MatInputModule],
  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})

export class Customer implements OnInit {
  SelectedCustomerFromModal: any ;
  documentPreviewUrl: any;
  previewUrl: string | null = null;
  states: any[] = [];
  district: any[] = [];
  tehsil: any[] = [];
  profile: any[] = [];
  catergory: any[] = [];
  subcatergory: any[] = [];
  Natureofwork: any[] = [];
  caste: any[] = [];
  BusinessCategory: any[] = [];
  firmTypes: any[] = [];

    

  constructor(library: FaIconLibrary, private http: HttpClient, private dialog: MatDialog) {
    library.addIcons(faArrowUpFromBracket);
  }

  customer: any = {
    type: 'Individual',
    documentType: '',
    KYC_DocNumber: '',
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
    Customer_Category: '',
    Customer_SubCategory: '',
    Customer_Natureofwork: '',
    Customer_Other_Email: '',
    Customer_Relation_FirstName: '',
    Customer_Relation_LastName: '',
    BusinessCategory: '',
    
  };
  
  Firm:any ={
    Type: 'company',
    Firm_Type:'',
    ApplicationNo: '',
    FirmId: '',
    Firm_Name: '',
    Firm_RegAddress: '',
    Firm_RegLandMark: '',
    Firm_Date_Of_Incorruptions : '',
    Firm_RegPinCode: '',
    Firm_RegState: '',
    Firm_RegDistrict: '',
    Firm_RegTehsil: '',
    Firm_CorpAddress: '',
    Firm_CorpLandMark: '',
    Firm_CorpPinCode: '',
    Firm_CorpState: '',
    Firm_CorpDistrict: '',
    Firm_CorpTehsil: '',
    Firm_PhoneNo: '',
    Firm_PhoneNoIsVerified:'' ,
    Firm_PhoneNo1: '',
    Firm_Email: '',
    Firm_Website: '',
    Firm_No_Of_Partner : '',
    Firm_No_Of_Employee: '',
    Firm_GrossValue: '',
    Firm_Nature_Of_Business: '',
    Firm_RegTotalYearsOnAddress: '',
    Firm_RegAddressRentBuy: '',
    Firm_RegNearstBranchDistance_KM: '',
    Firm_CorpTotalYearsOnAddress: '',
    Firm_CorpAddressRentBuy: '',
    Firm_CorpNearstBranchDistance_KM: '',
    Firm_CIN_No: '',
    BusinessCategory: '',
    BusinessType: '',
    Customer_Profile: '',
    Customer_Category: '',
    Customer_SubCategory: '',
    Customer_Natureofwork: '',
  };

  address: any = {
    StateIdS: '',
    DistrictIdS: '',
    TehsilIdS: '',
    NoOfLivingS: '',
    RentOwnS: '',
    AddressS: '',
    LandMarkS: '',
    PinCodeS: '',
    DistanceBranchS: '',
    IsCommunicationAddressS: '',
    AddressId: '',
    NoOfLivingpermanent: false
  };

  customerPermanent: any = {
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

  customerWork: any = {
    StateIdW :'',
    DistrictIdW: '',
    TehsilIdW: '',
    NoOfLivingW: '',
    RentOwnW: '',
    AddressW: '',
    LandMarkW: '',
    PinCodeW: '',
    DistanceBranchW: '',
    IsCommunicationAddressW: '',
    AddressIdW: ''
  };
    Partners:any ={
      PartnerName: '',
      PartnerGender: '',
      PartnerAge: '',
      PartnerDesignation: '',
      PartnerPhoneNo:'',
      PartnerShare: 100,
      PartnerDIN_No:'',
    }

  CustomerKYCDoc:any[] = [{
      KYC_CustomerId: '',
      KYC_DocId :'',
      KYC_DocNumber: '',
      KYC_DocFile: '',
      KYC_DocFile1: null,
      KYC_IssuedDate: '',
      KYC_ExpiredDate: '',
      LastVerfiedDate: '',
      KYC_IsVerified: 0,
      Verified_Button: true
    }]
 
  customer_district: any = '';

  ngOnInit() {
    this.loadStates();
    this.loadCustomerProfile();
    this.loadCustomerType();
    this.loadFirmType();
  }
openSearchModal() {
  const dialogRef = this.dialog.open(SearchModalComponent, {
    width: '800px',
    height: 'auto',
    panelClass: 'green-border-dialog',
    disableClose: false,
    data: {} // optional, you're not passing any initial data
  });

  dialogRef.afterClosed().subscribe(selected => {
    if (selected) {
      console.log('Selected customer:', selected);
      this.fillCustomerDetails(selected); 
    }
  });
}

    fillCustomerDetails(customer: any) {
    this.Partners.PartnerName = customer.CustomertName || '';
    this.Partners.PartnerAge = customer.GenderAge|| '';
    this.Partners.PartnerGender = customer.Customer_Gender === 'F' ? 'Female'
                                     : customer.Customer_Gender === 'M' ? 'Male'
                                     : 'Other';
    this.Partners.PartnerPhoneNo = customer.PhoneNo || '';
  }

  
 sameAsParmanent() {
  console.log("Checkbox value:", this.address.NoOfLivingpermanent);

  if (this.address.NoOfLivingpermanent) {
    
    this.customerPermanent = {
      StateId: this.address.StateIdS,
      DistrictId: this.address.DistrictIdS,
      TehsilId: this.address.TehsilIdS,
      NoOfLiving: this.address.NoOfLivingS,
      RentOwn: this.address.RentOwnS,
      Address: this.address.AddressS,
      LandMark: this.address.LandMarkS,
      PinCode: this.address.PinCodeS,
      DistanceBranch: this.address.DistanceBranchS,
      IsCommunicationAddress: this.address.IsCommunicationAddressS,
      AddressId: this.address.AddressId
    };
    console.log("copied:", this.customerPermanent);
  } else {

    this.customerPermanent = {
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
    console.log("cleared");
  }
}

isWorkAddressFilled() {
  return Object.values(this.customerWork).some(value => value && value.toString().trim() !== '');
}


calculateyears() {
  if (!this.Firm.Firm_Date_Of_Incorporations) {
    this.Firm.Firm_YearsSinceIncorporation = null;
    return;
  }

  const today = new Date();
  const incDate = new Date(this.Firm.Firm_Date_Of_Incorporations);


  if (incDate > today) {
    this.Firm.Firm_YearsSinceIncorporation = -1;
    return;
  }
  let years = today.getFullYear() - incDate.getFullYear();

  
  const monthDiff = today.getMonth() - incDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < incDate.getDate())) {
    years--;
  }

  this.Firm.Firm_YearsSinceIncorporation = years;
}





calculateAge() {
  if (!this.customer.Customer_DOB) {
    this.customer.age = null;
    return;
  }


  const today = new Date();
  const dob = new Date(this.customer.Customer_DOB);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  this.customer.age = age;
}

  loadCustomerType() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCommonMaster_FOR_DROPDOWN';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, { Type: "BusinessCategory" }, { headers }).subscribe({
      next: (res: any) => {
        this.BusinessCategory = res;
        console.log('customer type API Response:', this.BusinessCategory);
      },
      error: (err) => {
        console.log('customer type API Response:', err);
      }
    });
  }
  loadFirmType() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCommonMaster_FOR_DROPDOWN';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, { Type: "FirmType" }, { headers }).subscribe({
      next: (res: any) => {
        this.firmTypes = res;
        console.log('Firm types API Response:', this.firmTypes);
      },
      error: (err) => {
        console.error('Error fetching firm types:', err);
      }
    });
  }

  loadCustomerProfile() {
    const url = 'https://demo.finnaux.com/api/api/Masters/GetCustomer_Profile_Master_For_Dropdown';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    this.http.post(url, { P_ID: 0, Type: "Profile" }, { headers }).subscribe({
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

    this.http.post(url, { P_ID: 0, Type: "Category" }, { headers }).subscribe({
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

    this.http.post(url, { P_ID: 0, Type: "Sub-Category" }, { headers }).subscribe({
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

    this.http.post(url, { P_ID: 0, Type: "Nature of work" }, { headers }).subscribe({
      next: (res: any) => {
        this.Natureofwork = res;
        console.log('customer category API Response:', this.Natureofwork);
      },
      error: (err) => {
        console.error('Error fetching customer category:', err);
      }
    });
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


  saveCustomer(customerData?: any) {
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
  saveCustomerfirm(customerData?: any) {
    const url = 'https://demo.finnaux.com/api/api/LOS/Save_Customer_FirmOutSide';
    const token = constantUrl.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    const payload = this.buildPayloadFirm();

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
  if (this.customer.type === 'Individual') {
    this.saveCustomer();
  } else {
    this.saveCustomerfirm();
  }
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
      Customer_FirstName: sanitize(this.customer.Customer_FirstName),
      Customer_LastName: sanitize(this.customer.Customer_LastName),
      Customer_Relation_Type: sanitize(this.customer.Customer_Relation_Type),
      Customer_Relation_FirstName: sanitize(this.customer.Customer_Relation_FirstName),
      Customer_Relation_LastName: sanitize(this.customer.Customer_Relation_LastName),
      Customer_Gender: sanitize(this.customer.Customer_Gender),
      Customer_DOB: dobIso,
      Customer_PhoneNo: sanitize(this.customer.Customer_PhoneNo),
      Customer_Email: sanitize(this.customer.Customer_Email),
      Customer_Other_Email: sanitize(this.customer.Customer_Other_Email),
      Customer_WhatsAppNo: sanitize(this.customer.Customer_WhatsAppNo),
      Customer_MaritalStatus: sanitize(this.customer.Customer_MaritalStatus),
      Customer_Religion: sanitize(this.customer.Customer_Religion),
      Customer_Profile: sanitize(this.customer.Customer_Profile),
      Customer_Category: sanitize(this.customer.Customer_Category),
      Customer_SubCategory: sanitize(this.customer.Customer_SubCategory),
      Customer_Natureofwork: sanitize(this.customer.Customer_Natureofwork),
      Customer_Cast: sanitize(this.customer.Customer_Cast),
      BusinessCategory: sanitize(this.customer.BusinessCategory),
      Customer_CreateBy: this.customer.Customer_CreateBy || 0,
      Customer_PhoneNo_IsVerified: this.customer.Customer_PhoneNo_IsVerified || 0,
      DocData: sanitize(this.customer.DocData || '')
    };

    const kycDoc = {
      KYC_DocId: sanitize(this.CustomerKYCDoc[0].KYC_DocId || ''),
      KYC_DocNumber: sanitize(this.CustomerKYCDoc[0].KYC_DocNumber || ''),
      KYC_DocFile: sanitize(this.CustomerKYCDoc[0].KYC_DocFile || ''),
      KYC_DocFile1: sanitize(this.CustomerKYCDoc[0].KYC_DocFile1 || ''),
      Verified_Button: false,
      LastVerfiedDate: sanitize(this.CustomerKYCDoc[0].LastVerfiedDate || ''),
      KYC_IsVerified: 0
    };

    const address = {
      StateId: sanitize(this.address.StateIdS || ''),
      DistrictId: sanitize(this.address.DistrictIdS || ''),
      TehsilId: sanitize(this.address.TehsilIdS || ''),
      NoOfLiving: this.address.NoOfLivingS || 0,
      RentOwn: sanitize( this.address.RentOwnS || ''),
      Address: sanitize(this.address.AddressS || ''),
      LandMark: sanitize(this.address.LandMarkS || ''),
      PinCode: sanitize(this.address.PinCodeS || ''),
      DistanceBranch: sanitize(this.address.DistanceBranchS || ''),
      IsCommunicationAddress: true
    };

    const customerPermanent = this.address.NoOfLivingpermanent ? { ...address } : {};

    const customerWork = {
      StateId: sanitize(this.customerWork.StateIdW || ''),
      DistrictId: sanitize(this.customerWork.DistrictIdW|| ''),
      TehsilId: sanitize(this.customerWork.TehsilIdW || ''),
      NoOfLiving: this.customerWork.NoOfLivingW|| 0,
      RentOwn: sanitize( this.customerWork.RentOwnW || ''),
      Address: sanitize(this.customerWork.AddressW || ''),
      LandMark: sanitize(this.customerWork.LandMarkW || ''),
      PinCode: sanitize(this.customerWork.PinCodeW || ''),
      DistanceBranch: sanitize(this.customerWork.DistanceBranchW || ''),
      IsCommunicationAddress: true
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

    return {
      ApplicationCustomer: applicationCustomer,
      CustomerKYCDoc: [kycDoc],
      address,
      customerPermanent,
      customerWork: [],
      CustomerBankDetail: customerBankDetail,
      Int_Id: 0
    };
  }
  
  buildPayloadFirm() {
    const dobIso = this.customer.Customer_DOB ? new Date(this.customer.Customer_DOB).toISOString() : null;

    const sanitize = (v: any) => {
      if (v === undefined || v === null) return '';
      if (typeof v === 'string' && v.trim().toLowerCase() === 'undefined') return '';
      return v;
    };

  const applicationFirm: any={
     Type: 'company',
    Firm_Type:sanitize(this.Firm.Firm_Type),
    ApplicationNo: sanitize(this.Firm.Firm_Type),
    FirmId: sanitize(this.Firm.FirmId),
    Firm_Name: sanitize(this.Firm. Firm_Name),
    Firm_RegAddress: sanitize(this.Firm.Firm_RegAddress),
    Firm_RegLandMark: sanitize(this.Firm.Firm_RegLandMark),
    Firm_Date_Of_Incorruptions :sanitize(this.Firm.Firm_Date_Of_Incorruptions),
    Firm_RegPinCode: sanitize(this.Firm.Firm_RegPinCode),
    Firm_RegState: sanitize(this.Firm.Firm_RegState),
    Firm_RegDistrict:sanitize(this.Firm.Firm_RegDistrict),
    Firm_RegTehsil: sanitize(this.Firm. Firm_RegTehsil),
    Firm_CorpAddress: sanitize(this.Firm. Firm_CorpAddress),
    Firm_CorpLandMark: sanitize(this.Firm.Firm_CorpLandMark),
    Firm_CorpPinCode: sanitize(this.Firm.Firm_CorpPinCode),
    Firm_CorpState: sanitize(this.Firm.Firm_CorpState),
    Firm_CorpDistrict: sanitize(this.Firm.Firm_CorpDistrict),
    Firm_CorpTehsil: sanitize(this.Firm.Firm_CorpTehsil),
    Firm_PhoneNo: sanitize(this.Firm.Firm_PhoneNo),
    Firm_PhoneNoIsVerified:sanitize(this.Firm. Firm_PhoneNoIsVerified),
    Firm_PhoneNo1: sanitize(this.Firm. Firm_PhoneNo1),
    Firm_Email: sanitize(this.Firm.Firm_Email),
    Firm_Website:sanitize(this.Firm.Firm_Website),
    Firm_No_Of_Partner :sanitize(this.Firm.Firm_No_Of_Partner),
    Firm_No_Of_Employee: sanitize(this.Firm.Firm_No_Of_Employee),
    Firm_GrossValue:sanitize(this.Firm.Firm_GrossValue),
    Firm_Nature_Of_Business:sanitize(this.Firm.Firm_Nature_Of_Business),
    Firm_RegTotalYearsOnAddress: sanitize(this.Firm.Firm_RegTotalYearsOnAddress),
    Firm_RegAddressRentBuy: sanitize(this.Firm.Firm_RegAddressRentBuy),
    Firm_RegNearstBranchDistance_KM: sanitize(this.Firm.Firm_RegNearstBranchDistance_KM),
    Firm_CorpTotalYearsOnAddress: sanitize(this.Firm.Firm_CorpTotalYearsOnAddress),
    Firm_CorpAddressRentBuy:sanitize(this.Firm.Firm_CorpAddressRentBuy),
    Firm_CorpNearstBranchDistance_KM:sanitize(this.Firm.Firm_CorpNearstBranchDistance_KM),
    Firm_CIN_No: sanitize(this.Firm.Firm_CIN_No),
    BusinessCategory: sanitize(this.Firm.BusinessCategory),
    BusinessType: sanitize(this.Firm.BusinessType),
    Customer_Profile:sanitize(this.Firm.Customer_Profile),
    Customer_Category: sanitize(this.Firm.Customer_Category),
    Customer_SubCategory: sanitize(this.Firm.Customer_SubCategory),
    Customer_Natureofwork: sanitize(this.Firm.Customer_Natureofwork),
    }
    const kycDoc = {
      KYC_DocId: sanitize(this.CustomerKYCDoc[0].KYC_DocId || ''),
      KYC_DocNumber: sanitize(this.CustomerKYCDoc[0].KYC_DocNumber || ''),
      KYC_DocFile: sanitize(this.CustomerKYCDoc[0].KYC_DocFile || ''),
      KYC_DocFile1: sanitize(this.CustomerKYCDoc[0].KYC_DocFile1 || ''),
      Verified_Button: false,
      LastVerfiedDate: sanitize(this.CustomerKYCDoc[0].LastVerfiedDate || ''),
      KYC_IsVerified: 0
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

    return {
      ApplicationFirm: applicationFirm,
      CustomerKYCDoc: [kycDoc],
      CustomerBankDetail: customerBankDetail,
      Int_Id: 0
    };
  }



profilePreviewUrl: string | ArrayBuffer | null = null;
profilePreviewUrlProfile: string | ArrayBuffer | null = null;

openFilePicker() {
  const fileInput = document.getElementById('profileImage') as HTMLInputElement;
  if (fileInput) {
    fileInput.click();  
  }
}
openFilePickerDoc() {
  const fileInput = document.getElementById('kycDoc0File') as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreviewUrl = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
onFileSelectedProfile(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreviewUrlProfile = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
onFileSelectedDoc(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      this.CustomerKYCDoc[0].KYC_DocFile = reader.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
}




}
