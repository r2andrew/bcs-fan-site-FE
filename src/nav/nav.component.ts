import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthButtonComponent} from '../authButton/authButton.component';

/**
 * Navigation bar header
 */
@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterModule, AuthButtonComponent],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  /**
   * A reference to the sessionStorage interface to be used in the HTML part of this component
   * @protected
   */
  protected readonly sessionStorage = sessionStorage;
}
