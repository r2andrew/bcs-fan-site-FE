import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from '../app/web.service';
import {AgGridAngular} from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';

/**
 * All logic associated with the episodes page
 * Get episodes, define the ag-grid
 */
@Component({
  selector: 'episodes',
  imports: [RouterModule, CommonModule, AgGridAngular],
  providers: [WebService],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})

export class EpisodesComponent {
  /**
   * All episodes as returned by the API
   */
  data: any;
  /**
   * Boolean to check if the page is loading
   */
  episodes_loaded: boolean = false;
  /**
   * Ag-Grid headings definition
   */
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
  /**
   * Ag-Grid gridOptions definition
   */
  gridOptions: GridOptions = {
    rowStyle: {cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.5)'},
    autoSizeStrategy: {type: 'fitProvidedWidth', width: 700},
    getRowStyle: (params: any) => {
      const pageSize = 17;
      const pageIndex = params.api.paginationGetCurrentPage();
      const rowIndexOnPage = params.rowIndex - pageIndex * pageSize;
      // Find last 6 rows on current page, select odd
      if (rowIndexOnPage >= pageSize - 6 && rowIndexOnPage < pageSize && rowIndexOnPage % 2 == 0) {
        return {backgroundColor: 'rgba(255,255,255,0.85)', color: 'black'};
      }
    }
  }

  /**
   * Constructor for the Episodes component
   * @constructor
   * @param webService Connect to the Web Service
   * @param router Provide links to other pages
   */
  constructor(private webService: WebService,
              private router: Router) {}

  /**
   * On page load, get episodes
   */
  ngOnInit(): void {
    this.webService.getEpisodes()
      .subscribe((response) => {
        this.data = response['data']
        this.episodes_loaded = true;  })
  }

  /**
   * On user clicking a row, go to the associated episode page
   * @param event An event describing which row was clicked
   */
  onRowClicked(event: any): void {
    this.router.navigate(['/episodes/' + event.data._id])
  }
}
