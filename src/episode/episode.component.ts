import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../app/web.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {ModalService} from '../modal/modal.service';
import {ModalComponent} from '../modal/modal.component';

/**
 * All logic associated with the Episode page
 * Get details, submit, edit, vote etc.
 */
@Component({
  selector: 'episode',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  providers: [WebService, ModalService],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})

export class EpisodeComponent {
  /**
   * Store the data of the episode
   */
  episode_list: any;
  /**
   * Store all the trivias associated with the episode
   */
  trivia_list: any;
  /**
   * Form to store users newly submitted trivia
   */
  triviaForm: any;
  /**
   * Form to store users edited trivia details
   */
  editForm: any;
  /**
   * Boolean to determine if the page is loading
   */
  episode_loaded: boolean = false;
  /**
   * Enum to sort by new or top
   */
  sortBy: string = 'new'

  /**
   * Constructor for the Episode component
   * @constructor
   * @param webService Connect to the Web Service
   * @param modalService Integrate functionality for modal forms
   * @param route Get information about the current route (url)
   * @param formBuilder Integrate with the angular module FormBuilder for easy form management
   */
  constructor( private webService: WebService,
               public modalService: ModalService,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder) {}
  /**
   * On page load, get episode data and associated trivias
   * define requirements for the submit and edit forms
   */
  ngOnInit(): void {
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
      trivia: ['', Validators.required] })
    this.editForm = this.formBuilder.group({
      editedTrivia: ['', Validators.required] })
  }

  /**
   * Update the pre-filled value in the edit form with the text currently associated
   * with the selected trivia
   * @param editedValue The value to update the textarea with
   */
  updateEditFormValue(editedValue: any): void {
    this.editForm = this.formBuilder.group({
      editedTrivia: [editedValue, Validators.required]  })
  }

  /**
   * Upon user selecting a sort option, sort the trivias
   * @param event An event containing the users selection from the dropdown
   */
  onSortSelection (event: any ): void {
    this.sortBy = event.target.value;
    this.sort();
  }

  /**
   * Sort the trivias by the current sort selection
   */
  sort(): void {
    this.sortBy == 'top'? this.trivia_list.sort((a: any, b: any) => b.score - a.score) :
      this.trivia_list.sort((a: any, b: any) => Date.parse(b.createdDtm) - Date.parse(a.createdDtm))
  }

  /**
   * Logout by clearing sessionStorage
   */
  logout(): void{
    sessionStorage.removeItem('x-access-token')
    sessionStorage.removeItem('loggedInUsername')
    sessionStorage.removeItem('loggedInName')
    sessionStorage.removeItem('admin')
  }

  /**
   * Vote on trivia
   * @param voteDirection A vote can either be up or down
   * @param tId The id of the trivia to be updated
   */
  vote(voteDirection: string, tId:any): void{
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
          this.processIfEdited()  });
    },
      error => {
      alert('Session Expired, please log in again')
        this.logout();
        this.modalService.close();  })
  }

  /**
   * Edit a trivia
   * @param tId The id of the trivia to be edited
   */
  edit(tId:any): void {
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
          this.processIfEdited()  });
    },
      error => {
        alert('Session Expired, please log in again')
        this.logout()
        this.modalService.close() })
  }

  /**
   * Process the trivias list to determine if any are edited, applying a flag if so
   */
  processIfEdited(): void {
    for (var trivia= 0; trivia < this.trivia_list.length; trivia++) {
      this.trivia_list[trivia]['createdDtm'] != this.trivia_list[trivia]['modifiedDtm'] ?
        this.trivia_list[trivia] = Object.assign({}, this.trivia_list[trivia], {edited: true}) :
        this.trivia_list[trivia] = Object.assign({}, this.trivia_list[trivia], {edited: false})
    }
  }

  /**
   * Submit a new trivia
   */
  onSubmit(): void {
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
          this.processIfEdited()  });
      },
        error => {
          alert('Session Expired, please log in again')
          this.logout()
          this.modalService.close();  });
  }

  /**
   * Delete a trivia
   * @param tId The id of the trivia to be deleted
   */
  delete(tId: string): void{
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
              this.processIfEdited()  });
        },
        error => {
          alert('Session Expired, please log in again')
          this.logout() });
  }

  /**
   * Ban a user
   * @param username The username of the user to be banned
   */
  ban(username: string): void {
    this.webService.ban(
      username,
      sessionStorage['x-access-token']
    ).subscribe((response) => {
      this.webService.getTrivias(
        this.route.snapshot.paramMap.get('id'))
        .subscribe( (response) => {
          this.trivia_list = response;
          this.sort()
          this.processIfEdited()  })
    },
      error => {
        alert('Session Expired, please log in again')
        this.logout() })
  }

  /**
   * Check if form fields are invalid
   * @param form The reference to form the check against
   * @param control The field to check if invalid
   * @returns A boolean representing if the input field is invalid
   */
  isInvalid(form: keyof EpisodeComponent, control: string): boolean {
    return this[form].controls[control].invalid
  }
  /**
   * Check if form fields are untouched
   * @param form The reference to form the check against
   * @param control The field to check if untouched
   * @returns A boolean representing if the input field is untouched
   */
  isUntouched(form: keyof EpisodeComponent, control: string): boolean {
    return this[form].controls[control].pristine
  }
  /**
   * Check if form is incomplete
   * @param form The reference to form the check against
   * @param control The field to check if incomplete
   * @returns A boolean representing if the form is incomplete
   */
  isIncomplete(form: keyof EpisodeComponent, control: string): boolean {
    return this.isInvalid(form, control) ||
      this.isUntouched(form, control);
  }

  /**
   * A reference to the Math interface to be used in the HTML of this component
   * @protected
   */
  protected readonly Math = Math;
  /**
   * A reference to the sessionStorage interface to be used in the HTML of this component
   * @protected
   */
  protected readonly sessionStorage = sessionStorage;
  /**
   * A reference to the alert interface to be used in the HTML of this component
   * @protected
   */
  protected readonly alert = alert;
}
