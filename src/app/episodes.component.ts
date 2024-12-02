import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'episodes',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {

  business_list = [
    {
      "name" : "Pizza Mountain",
      "town" : "Coleraine",
      "rating" : 5
    },
    {
      "name" : "Wine Lake",
      "town" : "Ballymoney",
      "rating" : 3
    },
    {
      "name" : "Sweet Desert",
      "town" : "Ballymena",
      "rating" : 4
    }
  ]

}
