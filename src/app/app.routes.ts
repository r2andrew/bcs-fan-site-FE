import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { EpisodesComponent } from '../episodes/episodes.component';
import { EpisodeComponent } from '../episode/episode.component';
import {TestComponent} from '../test/test.component';

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
  },
  {
    path: 'test',
    component: TestComponent
  }
];
