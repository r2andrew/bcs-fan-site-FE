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
  }

  login() {
    console.log(this.loginForm.value)
    this.webService.login(
      this.loginForm.value)
      .subscribe(response => {
        this.loginForm.reset();

        sessionStorage['x-access-token'] = response['token']
        console.log('logged in and stored token')
      },
      error => {
        console.log('error logging in')
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

}
