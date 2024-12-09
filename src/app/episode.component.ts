import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { WebService } from './web.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {ModalService} from './modal.service';
import {ModalComponent} from './modal.component';
import {subscribeOn} from 'rxjs';


@Component({
  selector: 'episode',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  providers: [DataService, WebService, ModalService],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {
  episode_list: any;
  trivia_list: any;
  triviaForm: any;
  editForm: any;
  episode_loaded: boolean = false;
  sortBy: string = 'new'

  constructor( public dataService: DataService,
               private webService: WebService,
               public modalService: ModalService,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.webService.getEpisode(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response: any) => {
        this.episode_list = [response];
        this.webService.getTrivias(
          this.route.snapshot.paramMap.get('id'))
          .subscribe( (response) => {
            this.trivia_list = response;
            this.sort()
            this.processIfEdited()
            this.episode_loaded = true;
          });
      })

    this.triviaForm = this.formBuilder.group( {
      trivia: ['', Validators.required]
    })
    this.editForm = this.formBuilder.group({
      editedTrivia: ['', Validators.required]
    })

  }

  updateEditFormValue(editedValue: any) {
    this.editForm = this.formBuilder.group({
      editedTrivia: [editedValue, Validators.required]
    })
  }

  onSortSelection (event: any ) {
    this.sortBy = event.target.value;
    this.sort();
  }

  sort() {
    if (this.sortBy == 'top') {
      this.trivia_list.sort((a: any, b: any) => b.score - a.score)
    } else {
      this.trivia_list.sort((a: any, b: any) => Date.parse(b.createdDtm) - Date.parse(a.createdDtm))
    }
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
          this.sort()
          this.processIfEdited()
        });
    },
      error => {
      alert('Session Expired, please log in again')
        this.logout();
        this.modalService.close();
      })
  }

  edit(tId:any) {
    this.webService.editTrivia(
      this.route.snapshot.paramMap.get('id'),
      tId,
      this.editForm.value,
      sessionStorage['x-access-token']
    ).subscribe((response) => {
      this.editForm.reset();
      this.modalService.close();

      this.webService.getTrivias(
        this.route.snapshot.paramMap.get('id'))
        .subscribe( (response) => {
          this.trivia_list = response;
          this.sort()
          this.processIfEdited()
        });
    },
      error => {
        alert('Session Expired, please log in again')
        this.logout()
        this.modalService.close()
      })
  }

  processIfEdited() {
    for (var trivia= 0; trivia < this.trivia_list.length; trivia++) {
      if (this.trivia_list[trivia]['createdDtm'] != this.trivia_list[trivia]['modifiedDtm']) {
        this.trivia_list[trivia] = Object.assign({}, this.trivia_list[trivia], {edited: true})
      } else {
        this.trivia_list[trivia] = Object.assign({}, this.trivia_list[trivia], {edited: false})
      }
    }
  }

  onSubmit() {
    this.webService.postTrivia(
      this.route.snapshot.paramMap.get('id'),
      this.triviaForm.value,
      sessionStorage['x-access-token'])
      .subscribe( (response) => {
        this.triviaForm.reset();
        this.modalService.close();

        this.webService.getTrivias(
        this.route.snapshot.paramMap.get('id'))
        .subscribe( (response) => {
          this.trivia_list = response;
          this.sort()
          this.processIfEdited()
        });

      },
        error => {
          alert('Session Expired, please log in again')
          this.logout()
          this.modalService.close();
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
              this.sort()
              this.processIfEdited()
            });
        },
        error => {
          alert('Session Expired, please log in again')
          this.logout()
        });
  }

  ban(uId: string) {
    this.webService.ban(
      uId,
      sessionStorage['x-access-token']
    ).subscribe((response) => {
      this.webService.getTrivias(
        this.route.snapshot.paramMap.get('id'))
        .subscribe( (response) => {
          this.trivia_list = response;
          this.sort()
          this.processIfEdited()
        })
    },
      error => {
        alert('Session Expired, please log in again')
        this.logout()
      })
  }

  isInvalid(form: keyof EpisodeComponent, control: string) {
    return this[form].controls[control].invalid
  }
  isUntouched(form: keyof EpisodeComponent, control: string) {
    return this[form].controls[control].pristine
  }
  isIncomplete(form: keyof EpisodeComponent, control: string) {
    return this.isInvalid(form, control) ||
      this.isUntouched(form, control);
  }

  protected readonly Math = Math;
  protected readonly sessionStorage = sessionStorage;
  protected readonly alert = alert;
}
