import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer } from './customer/customer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']

})
export class App {
  protected readonly title = signal('my-app');
}
