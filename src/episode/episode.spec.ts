import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EpisodeComponent} from './episode.component';
import episode_list from '../testData/episodeData.json'
import trivia_list from '../testData/triviaData.json'

describe('EpisodeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeComponent, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should display a loading wheel on load', () => {
    const fixture = TestBed.createComponent(EpisodeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByClassName('cssload-speeding-wheel')).toBeTruthy()
  });

  it('should not display a loading wheel if loaded', () => {
    const fixture = TestBed.createComponent(EpisodeComponent);
    fixture.componentInstance.episode_loaded = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByClassName('cssload-speeding-wheel')).toBeTruthy()
  });

  it('should display 2 trivias if 2 trivias in data', () => {
    const fixture = TestBed.createComponent(EpisodeComponent);
    fixture.componentInstance.episode_list = episode_list
    fixture.componentInstance.trivia_list = trivia_list
    fixture.componentInstance.episode_loaded = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByClassName('card-body').length).toBe(2)
  });
});
