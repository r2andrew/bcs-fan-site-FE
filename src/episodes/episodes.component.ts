import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from '../app/web.service';
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
      const pageSize = 17;
      const pageIndex = params.api.paginationGetCurrentPage();
      const rowIndexOnPage = params.rowIndex - pageIndex * pageSize;
      // Find last 6 rows on current page, select odd
      if (rowIndexOnPage >= pageSize - 6 && rowIndexOnPage < pageSize && rowIndexOnPage % 2 == 0) {
        return {backgroundColor: 'rgba(255,255,255,0.85)', color: 'black'};
      }
    }
  }
  constructor(private webService: WebService,
              private router: Router) {}

  ngOnInit() {
    this.webService.getEpisodes()
      .subscribe((response) => {
        this.data = response['data']
        this.episodes_loaded = true;  })
  }

  onRowClicked(event: any) {
    this.router.navigate(['/episodes/' + event.data._id])
  }
}
