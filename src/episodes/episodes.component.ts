import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from '../app/web.service';
import jsonData from '../assets/episodes.json';
import {AgGridAngular} from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';


@Component({
  selector: 'episodes',
  imports: [RouterModule, CommonModule, AgGridAngular],
  providers: [WebService],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  data: any;
  episodes_list: any;
  page: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;
  episodes_loaded: boolean = false;

  headings: ColDef[] = [
    { field: 'title',
          filter: true,
          floatingFilter: true,
          sortable: false,
          },
    { field: 'imdbRating',
          headerName: 'Rating' },
    { headerName: 'Episode',
          valueGetter: p => 'S' + p.data.seasonNumber + 'E' + p.data.episodeNumber,
          sortable: false }
  ]

  gridOptions: GridOptions = {
    rowStyle: {cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.5)'},
    autoSizeStrategy: {type: 'fitProvidedWidth', width: 700},
    getRowStyle: (params: any) => {
      // Get current page number
      const pageSize = 17;
      const pageIndex = params.api.paginationGetCurrentPage();  // Gets the current page index

      // Get the row index in the current page context
      const rowIndexOnPage = params.rowIndex - pageIndex * pageSize;

      // Check if the current row is one of the last 3 rows on the current page
      if (rowIndexOnPage >= pageSize - 6 && rowIndexOnPage < pageSize && rowIndexOnPage % 2 == 0) {
        return {backgroundColor: 'rgba(255,255,255,0.85)', color: 'black'};  // Apply custom class
      }
    }
  }

  protected readonly Math = Math;
  constructor(private webService: WebService,
              private router: Router) {}

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }

    this.webService.getEpisodes()
      .subscribe((response) => {
        this.data = response['data']
        this.episodes_loaded = true;

        let pageStart = (this.page - 1) * this.pageSize;
        let pageEnd = pageStart + this.pageSize;

        this.episodes_list = this.data.slice(pageStart, pageEnd)
        this.totalPages = Math.ceil( this.data.length / this.pageSize )
      })
  }

  onRowClicked(event: any) {
    this.router.navigate(['/episodes/' + event.data._id])
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
