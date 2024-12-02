import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EpisodesComponent } from './episodes.component';
import jsonData from '../assets/episodes.json'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EpisodesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bcsFanSiteFE';

  ngOnInit() {
    console.log(jsonData)
  }
}
