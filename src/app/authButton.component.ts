import { Component } from '@angular/core';
import {WebService} from './web.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalService} from './modal.service';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal.component';
@Component({
  selector: 'auth-button',
  templateUrl: 'authbutton.component.html',
  styleUrl: 'authbutton.component.css',
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  providers: [WebService, ModalService],
  standalone: true
})
export class AuthButtonComponent {
  loginForm: any;
  registerForm: any;
  errorMessage: any;
  constructor(private webService: WebService,
              public modalService: ModalService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group( {
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.registerForm = this.formBuilder.group( {
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  isInvalidLogin(control: any) {
    return this.loginForm.controls[control].invalid &&
      this.loginForm.controls[control].touched;
  }
  isUntouchedLogin() {
    return this.loginForm.controls.username.pristine ||
      this.loginForm.controls.password.pristine
  }
  isIncompleteLogin() {
    return this.isInvalidLogin('username') ||
      this.isInvalidLogin('password') ||
      this.isUntouchedLogin();
  }

  isInvalidRegister(control: any) {
    return this.registerForm.controls[control].invalid &&
      this.registerForm.controls[control].touched;
  }
  isUntouchedRegister() {
    return this.registerForm.controls.username.pristine ||
      this.registerForm.controls.password.pristine
  }
  isIncompleteRegister() {
    return this.isInvalidRegister('name') ||
      this.isInvalidRegister('username') ||
      this.isInvalidRegister('password') ||
      this.isInvalidRegister('email') ||
      this.isUntouchedRegister();
  }

  register() {
    this.errorMessage = ''
    this.webService.register(
      this.registerForm.value
    ).subscribe(response => {
      this.registerForm.reset();
      this.modalService.close();
      alert('User successfully created, you may login')
    }, error => {
      this.errorMessage = error.error.error
      setTimeout(() => this.errorMessage = '', 3000)
    })
  }

  login() {
    this.errorMessage = ''
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
        this.errorMessage = error.error.error
        setTimeout(() => this.errorMessage = '', 3000)
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

  protected readonly sessionStorage = sessionStorage;
}
