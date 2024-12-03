import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { WebService } from './web.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'episode',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DataService, WebService],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {
  episode_list: any;
  trivia_list: any;
  triviaForm: any;

  constructor( public dataService: DataService,
               private webService: WebService,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.webService.getEpisode(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response: any) => {
        this.episode_list = [response];
      })

    this.webService.getTrivias(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response) => {
        this.trivia_list = response;
      });


    this.triviaForm = this.formBuilder.group( {
      trivia: ['', Validators.required]
    })

  }

  logout(){
    sessionStorage.removeItem('x-access-token')
    sessionStorage.removeItem('loggedInUsername')
    sessionStorage.removeItem('loggedInName')
    sessionStorage.removeItem('admin')
  }

  vote(voteDirection: string, tId:any){
    this.webService.voteTrivia(
      this.route.snapshot.paramMap.get('id'),
      tId,
      voteDirection,
      sessionStorage['x-access-token']
    ).subscribe((response) => {
      this.webService.getTrivias(
        this.route.snapshot.paramMap.get('id'))
        .subscribe( (response) => {
          this.trivia_list = response;
        });
    },
      error => {
      alert('Session Expired, please log in again')
        this.logout()
      })
  }

  onSubmit() {
    this.webService.postTrivia(
      this.route.snapshot.paramMap.get('id'),
      this.triviaForm.value,
      sessionStorage['x-access-token'])
      .subscribe( (response) => {
        this.triviaForm.reset();

        this.webService.getTrivias(
          this.route.snapshot.paramMap.get('id'))
          .subscribe( (response) => {
            this.trivia_list = response;
          });

      },
        error => {
          alert('Session Expired, please log in again')
          this.logout()
        });
  }

  delete(tId: string){
    this.webService.deleteTrivia(
      this.route.snapshot.paramMap.get('id'),
      tId,
      sessionStorage['x-access-token'])
      .subscribe( (response) => {

          this.webService.getTrivias(
            this.route.snapshot.paramMap.get('id'))
            .subscribe( (response) => {
              this.trivia_list = response;
            });

        },
        error => {
          alert('Session Expired, please log in again')
          this.logout()
        });
  }

  isInvalid(control: any) {
    return this.triviaForm.controls[control].invalid &&
      this.triviaForm.controls[control].touched;
  }

  isUntouched() {
    return this.triviaForm.controls.trivia.pristine
  }
  isIncomplete() {
    return this.isInvalid('trivia') ||
      this.isUntouched();
  }

  protected readonly Math = Math;
  protected readonly sessionStorage = sessionStorage;
}
