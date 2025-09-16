import { Routes } from '@angular/router';
import { Customer } from './customer/customer';

export const routes: Routes = [
  { path: 'customer', component: Customer },
  { path: '', redirectTo: '/customer', pathMatch: 'full' }
];
