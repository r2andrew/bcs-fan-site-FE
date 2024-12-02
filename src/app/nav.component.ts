import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthButtonComponent} from './authButton.component';
@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterModule, AuthButtonComponent],
  templateUrl: './nav.component.html'
})
export class NavComponent { }
