import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import jsonData from '../assets/episodes.json'
import { NavComponent } from './nav.component'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bcsFanSiteFE';
}
