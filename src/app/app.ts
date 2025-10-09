import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SearchModalComponent } from '../app/search-modal/search-modal';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('my-app');

   
}
