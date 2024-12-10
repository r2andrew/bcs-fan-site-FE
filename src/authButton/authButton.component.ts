import { Component } from '@angular/core';
import {WebService} from '../app/web.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalService} from '../modal/modal.service';
import {CommonModule} from '@angular/common';
import {ModalComponent} from '../modal/modal.component';

/**
 * A component to provide an interface to login,
 * logout and register
 */
@Component({
  selector: 'auth-button',
  templateUrl: 'authButton.component.html',
  styleUrl: 'authButton.component.css',
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  providers: [WebService, ModalService],
  standalone: true
})
export class AuthButtonComponent {
  /**
   * A form to store login info submitted by the user
   */
  loginForm: any;
  /**
   * A form to store new user info subbmited by the user
   */
  registerForm: any;
  /**
   * Store any error message returned by the api for display to the user
   */
  errorMessage: string = '';

  /**
   * Constructor for the AuthButton
   * @constructor
   * @param webService Connect to the Web Service
   * @param modalService Provide function for modal forms
   * @param formBuilder Integrate with the angular module FormBuilder for easy form management
   */
  constructor(private webService: WebService,
              public modalService: ModalService,
              private formBuilder: FormBuilder) {}

  /**
   * On page load, define requirements for the login and register forms
   */
  ngOnInit(): void {
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

  /**
   * Check if fields of the Login form are invalid
   * @param control The form field to validate
   * @returns A boolean representing if the input fields are invalid
   */
  isInvalidLogin(control: any): boolean {
    return this.loginForm.controls[control].invalid &&
      this.loginForm.controls[control].touched;
  }
  /**
   * Check if fields of the Login form are untouched
   * @returns A boolean representing if the input fields are untouched
   */
  isUntouchedLogin(): boolean {
    return this.loginForm.controls.username.pristine ||
      this.loginForm.controls.password.pristine
  }
  /**
   * Check if the Login form is incomplete
   * @returns A booleans representing if the form is incomplete
   */
  isIncompleteLogin(): boolean {
    return this.isInvalidLogin('username') ||
      this.isInvalidLogin('password') ||
      this.isUntouchedLogin();
  }
  /**
   * Check if fields of the Register form are invalid
   * @param control The form field to validate
   * @returns A boolean representing if the input fields are invalid
   */
  isInvalidRegister(control: any): boolean {
    return this.registerForm.controls[control].invalid &&
      this.registerForm.controls[control].touched;
  }
  /**
   * Check if fields of the Register form are untouched
   * @returns A boolean representing if the input fields are untouched
   */
  isUntouchedRegister(): boolean {
    return this.registerForm.controls.username.pristine ||
      this.registerForm.controls.password.pristine
  }
  /**
   * Check if the Register form is incomplete
   * @returns A boolean representing if the form is incomplete
   */
  isIncompleteRegister(): boolean {
    return this.isInvalidRegister('name') ||
      this.isInvalidRegister('username') ||
      this.isInvalidRegister('password') ||
      this.isInvalidRegister('email') ||
      this.isUntouchedRegister();
  }
  /**
   * Submit the details from the Register form to the API
   */
  register(): void {
    this.errorMessage = ''
    this.webService.register(
      this.registerForm.value)
      .subscribe(response => {
      this.registerForm.reset();
      this.modalService.close();
      alert('User successfully created, you may login')
    }, error => {
      this.errorMessage = error.error.error
      setTimeout(() => this.errorMessage = '', 3000)
    })
  }

  /**
   * Submit the details from the login form to the API
   * and store token, user data in session storage
   */
  login(): void {
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
        }, error => {
        this.errorMessage = error.error.error
        setTimeout(() => this.errorMessage = '', 3000)
      });
  }

  /**
   * Send a request to the API to invalidate the current token, and clear it from storage\
   */
  logout(): void {
    this.webService.logout(
      sessionStorage['x-access-token'])
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

  /**
   * A reference to the sessionStorage interface to be accessed within the HTML
   * part of this component
   * @protected
   */
  protected readonly sessionStorage = sessionStorage;
}
