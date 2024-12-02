import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EpisodesComponent } from './episodes.component';
import { EpisodeComponent } from './episode.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'episodes',
    component: EpisodesComponent
  },
  {
    path: 'episodes/:id',
    component: EpisodeComponent
  }

];
