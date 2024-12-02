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

  onSubmit() {
    this.webService.postTrivia(
      this.route.snapshot.paramMap.get('id'),
      this.triviaForm.value)
      .subscribe( (response) => {
        this.triviaForm.reset();

        this.webService.getTrivias(
          this.route.snapshot.paramMap.get('id'))
          .subscribe( (response) => {
            this.trivia_list = response;
          });

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
}
