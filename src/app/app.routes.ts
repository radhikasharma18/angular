import { Routes } from '@angular/router';
import { Customer } from '../app/customer/customer';

export const routes: Routes = [
  { path: 'customer', component: Customer },
  { path: '', redirectTo: '/customer', pathMatch: 'full' }
];
