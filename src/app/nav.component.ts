import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './nav.component.html'
})
export class NavComponent { }
