import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'episode',
  standalone: true,
  imports: [CommonModule],
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

  protected readonly Math = Math;
}
