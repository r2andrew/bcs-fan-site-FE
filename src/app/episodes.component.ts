import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { WebService } from './web.service';
import jsonData from '../assets/episodes.json';


@Component({
  selector: 'episodes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [DataService, WebService],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  data: any;
  episodes_list: any;
  page: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;


  protected readonly Math = Math;
  constructor(public dataService: DataService,
              private webService: WebService) {}

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }

    this.webService.getEpisodes()
      .subscribe((response) => {
        this.data = response['data']

        let pageStart = (this.page - 1) * this.pageSize;
        let pageEnd = pageStart + this.pageSize;

        this.episodes_list = this.data.slice(pageStart, pageEnd)
        this.totalPages = Math.ceil( this.data.length / this.pageSize )
      })
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1
      sessionStorage['page'] = this.page;

      let pageStart = (this.page - 1) * this.pageSize;
      let pageEnd = pageStart + this.pageSize;

      this.episodes_list = this.data.slice(pageStart, pageEnd)

    }
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page = this.page + 1
      sessionStorage['page'] = this.page;

      let pageStart = (this.page - 1) * this.pageSize;
      let pageEnd = pageStart + this.pageSize;

      this.episodes_list = this.data.slice(pageStart, pageEnd)
    }
  }
}
