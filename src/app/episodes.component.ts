import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'episodes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [DataService],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  episodes_list: any;
  page: number = 1;

  protected readonly Math = Math;
  constructor(public dataService: DataService) {}

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.episodes_list = this.dataService.getEpisodes(this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1
      sessionStorage['page'] = this.page;
      this.episodes_list =
        this.dataService.getEpisodes(this.page);
    }
  }
  nextPage() {
    if (this.page < this.dataService.getLastPageNumber()) {
      this.page = this.page + 1
      sessionStorage['page'] = this.page;
      this.episodes_list =
        this.dataService.getEpisodes(this.page);
    }
  }
}
