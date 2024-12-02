import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
@Component({
  selector: 'episode',
  standalone: true,
  imports: [RouterOutlet],
  providers: [DataService],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {
  episode_list: any;

  constructor( public dataService: DataService,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.episode_list =
      this.dataService.getEpisode(
        this.route.snapshot.paramMap.get('id'));
  }

}
