import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer } from './customer/customer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Customer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('my-app');
}
