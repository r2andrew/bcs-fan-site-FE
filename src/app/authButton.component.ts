import { Component } from '@angular/core';
import {WebService} from './web.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalService} from './modal.service';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal.component';
@Component({
  selector: 'auth-button',
  templateUrl: 'authbutton.component.html',
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  providers: [WebService, ModalService],
  standalone: true
})
export class AuthButtonComponent {
  loginForm: any;
  constructor(private webService: WebService,
              public modalService: ModalService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group( {
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    console.log(JSON.stringify(sessionStorage['loggedInUser']))
  }

  login() {
    this.webService.login(
      this.loginForm.value)
      .subscribe(response => {
        this.loginForm.reset();
        this.modalService.close()
        sessionStorage['x-access-token'] = response['token']
        sessionStorage['loggedInUsername'] = response['user']['username']
        sessionStorage['loggedInName'] = response['user']['name']
        sessionStorage['admin'] = response['user']['admin']

        },
      error => {
        console.log('error logging in')
      });
  }

  logout() {
    this.webService.logout(
      sessionStorage['x-access-token']
    )
      .subscribe(response => {
          sessionStorage.removeItem('x-access-token')
          sessionStorage.removeItem('loggedInUsername')
          sessionStorage.removeItem('loggedInName')
          sessionStorage.removeItem('admin')
        },
        error => {
          console.log('token expired')
          sessionStorage.removeItem('x-access-token')
          sessionStorage.removeItem('loggedInUsername')
          sessionStorage.removeItem('loggedInName')
          sessionStorage.removeItem('admin')
        });
  }


  isInvalid(control: any) {
    return this.loginForm.controls[control].invalid &&
      this.loginForm.controls[control].touched;
  }

  isUntouched() {
    return this.loginForm.controls.username.pristine ||
      this.loginForm.controls.password.pristine
  }
  isIncomplete() {
    return this.isInvalid('username') ||
    this.isInvalid('password') ||
      this.isUntouched();
  }

  protected readonly sessionStorage = sessionStorage;
}
