import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EpisodesComponent} from './episodes.component';

describe('EpisodesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesComponent, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should display a loading wheel on load', () => {
    const fixture = TestBed.createComponent(EpisodesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByClassName('cssload-speeding-wheel')).toBeTruthy()
  });
  it('should display ag-grid when finished loading', () => {
    const fixture = TestBed.createComponent(EpisodesComponent);
    fixture.componentInstance.episodes_loaded = true
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByClassName('ag-theme-material-dark')).toBeTruthy()
  });
});
