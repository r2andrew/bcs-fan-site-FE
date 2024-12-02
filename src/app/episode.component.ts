import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'episode',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DataService],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {
  episode_list: any;
  triviaForm: any;

  constructor( public dataService: DataService,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.episode_list =
      this.dataService.getEpisode(
        this.route.snapshot.paramMap.get('id'));

    this.triviaForm = this.formBuilder.group( {
      trivia: ['', Validators.required]
    })

  }

  onSubmit() {
    this.dataService.postTrivia(
      this.route.snapshot.paramMap.get('id'),
      this.triviaForm.value);
    this.triviaForm.reset();
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
